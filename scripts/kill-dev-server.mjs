#!/usr/bin/env node
// Kill whatever is listening on the Vite dev-server port (default 5173).
// Usage: node scripts/kill-dev-server.mjs [port]
import { execFileSync } from 'node:child_process';

const port = Number(process.argv[2] ?? process.env.VITE_PORT ?? 5173);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  console.error(`kill-dev-server: invalid port ${JSON.stringify(process.argv[2])}`);
  process.exit(2);
}

/** PIDs listening on the TCP port, via lsof (macOS / Linux). */
function listeningPids() {
  try {
    const out = execFileSync('lsof', ['-ti', `tcp:${port}`, '-sTCP:LISTEN'], {
      encoding: 'utf8',
    });
    return [...new Set(out.split(/\s+/u).filter(Boolean))];
  } catch {
    // lsof exits non-zero when nothing matches.
    return [];
  }
}

const pids = listeningPids();

if (pids.length === 0) {
  console.log(`kill-dev-server: nothing listening on :${port}`);
  process.exit(0);
}

for (const pid of pids) {
  try {
    process.kill(Number(pid), 'SIGTERM');
    console.log(`kill-dev-server: stopped pid ${pid} on :${port}`);
  } catch (error) {
    console.error(`kill-dev-server: could not kill pid ${pid}: ${error.message}`);
  }
}
