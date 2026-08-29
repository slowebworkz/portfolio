#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { discover, type Capture, type CdxMatchType, type DiscoverOptions } from './cdx.ts';
import { fetchCapture, toEvidenceDraft } from './wayback.ts';

const OUT_ROOT = '.archive';

/** A filesystem-safe directory name for a target URL. */
function slugForTarget(target: string): string {
  return target
    .replace(/^https?:\/\//u, '')
    .replace(/[^a-z0-9.]+/giu, '-')
    .replace(/^-+|-+$/gu, '')
    .toLowerCase();
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Parse a numeric CLI flag, rejecting NaN, non-integers, and values below `min`. */
function intArg(value: string | undefined, name: string, min = 1): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min) {
    throw new Error(`${name} must be an integer >= ${min}: ${value}`);
  }
  return parsed;
}

const MATCH_TYPES: readonly CdxMatchType[] = ['exact', 'prefix', 'host', 'domain'];

/** Validate `--match-type` at the CLI boundary — the value came from argv. */
function matchTypeArg(value: string): CdxMatchType {
  if (!MATCH_TYPES.includes(value as CdxMatchType)) {
    throw new Error(`--match-type must be one of: ${MATCH_TYPES.join(', ')}`);
  }
  return value as CdxMatchType;
}

async function runDiscover(argv: string[]): Promise<void> {
  const { positionals, values } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      from: { type: 'string' },
      to: { type: 'string' },
      limit: { type: 'string' },
      'match-type': { type: 'string' },
      mime: { type: 'string' },
      'all-status': { type: 'boolean' },
      'no-collapse': { type: 'boolean' },
    },
  });

  const target = positionals[0];
  if (!target)
    throw new Error('usage: archive discover <url> [--from YYYY] [--to YYYY] [--limit N]');

  const options: DiscoverOptions = {
    onlyOk: !values['all-status'],
    collapseByDigest: !values['no-collapse'],
  };
  if (values.from) options.from = values.from;
  if (values.to) options.to = values.to;
  const limit = intArg(values.limit, '--limit');
  if (limit) options.limit = limit;
  const matchType = values['match-type'];
  if (matchType) options.matchType = matchTypeArg(matchType);
  if (values.mime) options.mimeType = values.mime;

  const captures = await discover(target, options);
  const dir = join(OUT_ROOT, slugForTarget(target));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'captures.json'), `${JSON.stringify(captures, null, 2)}\n`);
  await writeFile(
    join(dir, 'evidence-drafts.json'),
    `${JSON.stringify(captures.map(toEvidenceDraft), null, 2)}\n`,
  );

  console.log(`${captures.length} capture(s) for ${target}`);
  for (const capture of captures.slice(0, 40)) {
    console.log(
      `  ${capture.timestamp}  ${capture.statusCode.padEnd(3)}  ${capture.mimeType.padEnd(24)}  ${capture.originalUrl}`,
    );
  }
  if (captures.length > 40) console.log(`  … ${captures.length - 40} more in ${dir}/captures.json`);
  console.log(`\nwrote ${dir}/captures.json and ${dir}/evidence-drafts.json`);
}

async function runFetch(argv: string[]): Promise<void> {
  const { positionals, values } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      limit: { type: 'string' },
      'delay-ms': { type: 'string' },
      force: { type: 'boolean' },
    },
  });

  const target = positionals[0];
  if (!target) throw new Error('usage: archive fetch <url> [--limit N] [--delay-ms 1500]');

  const dir = join(OUT_ROOT, slugForTarget(target));
  const capturesFile = join(dir, 'captures.json');
  if (!existsSync(capturesFile)) {
    throw new Error(`no ${capturesFile} — run "archive discover ${target}" first`);
  }

  const captures = JSON.parse(await readFile(capturesFile, 'utf8')) as Capture[];
  const delayMs = intArg(values['delay-ms'], '--delay-ms', 0) ?? 1500;
  const limit = intArg(values.limit, '--limit') ?? captures.length;

  const capturesDir = join(dir, 'captures');
  await mkdir(capturesDir, { recursive: true });

  let requested = 0;
  let downloaded = 0;
  let skipped = 0;
  for (const capture of captures.slice(0, limit)) {
    const outFile = join(capturesDir, `${capture.timestamp}.html`);
    if (existsSync(outFile) && !values.force) {
      skipped += 1;
      continue;
    }
    // Space out requests to the archive, whether or not the last one succeeded.
    if (requested > 0) await sleep(delayMs);
    requested += 1;
    process.stdout.write(`  ${capture.timestamp} ${capture.originalUrl} … `);
    try {
      const html = await fetchCapture(capture.timestamp, capture.originalUrl);
      await writeFile(outFile, html);
      downloaded += 1;
      console.log(`${html.length} bytes`);
    } catch (error) {
      console.log(`FAILED (${String(error)})`);
    }
  }
  console.log(`\n${downloaded} downloaded, ${skipped} already present, in ${capturesDir}/`);
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  switch (command) {
    case 'discover':
      await runDiscover(rest);
      break;
    case 'fetch':
      await runFetch(rest);
      break;
    default:
      console.error('usage: archive <discover|fetch> <url> [options]');
      process.exitCode = 1;
  }
}

try {
  await main();
} catch (error) {
  console.error(`error: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
