import type { Evidence } from '@portfolio/data';

import type { Capture } from './cdx.ts';

/** The Wayback member of the `@portfolio/data` evidence union. */
type WaybackEvidence = Extract<Evidence, { kind: 'wayback' }>;

/** The date portion of a Wayback timestamp (`YYYYMMDD…`) as an ISO date
 *  (`YYYY-MM-DD`). Only the leading 8 digits are read; anything after them
 *  (the `hhmmss`) is ignored. */
export function timestampToIsoDate(timestamp: string): string {
  if (!/^\d{8}/u.test(timestamp)) {
    throw new Error(`not a Wayback timestamp: ${timestamp}`);
  }
  return `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}`;
}

/** Playback URL — the capture with the Wayback toolbar and rewritten links. */
export function playbackUrl(timestamp: string, originalUrl: string): string {
  return `https://web.archive.org/web/${timestamp}/${originalUrl}`;
}

/** Raw content URL — the `id_` suffix returns the original response, with no
 *  toolbar and no link rewriting. This is what you want for offline analysis. */
export function rawCaptureUrl(timestamp: string, originalUrl: string): string {
  return `https://web.archive.org/web/${timestamp}id_/${originalUrl}`;
}

export interface FetchCaptureOptions {
  /** Retries after the first attempt. Default `3`. */
  retries?: number;
  /** Base delay between attempts, multiplied by the attempt number. Default `2000`. */
  retryDelayMs?: number;
  /** Injected for tests. */
  fetchImpl?: typeof fetch;
  /** Injected for tests. */
  sleepImpl?: (ms: number) => Promise<void>;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Whether an archive HTTP status is worth retrying (server-side / throttling). */
function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

function assertRetryOptions(retries: number, retryDelayMs: number): void {
  if (!Number.isInteger(retries) || retries < 0) {
    throw new Error(`retries must be a non-negative integer: ${retries}`);
  }
  if (!Number.isFinite(retryDelayMs) || retryDelayMs < 0) {
    throw new Error(`retryDelayMs must be a non-negative number: ${retryDelayMs}`);
  }
}

/** Download the content of a single capture as text, retrying on network errors
 *  and 429/5xx (the archive is frequently overloaded). A 4xx other than 429
 *  fails immediately — retrying a 404 or 403 is pointless. */
export async function fetchCapture(
  timestamp: string,
  originalUrl: string,
  options: FetchCaptureOptions = {},
): Promise<string> {
  const { retries = 3, retryDelayMs = 2000, fetchImpl = fetch, sleepImpl = sleep } = options;
  assertRetryOptions(retries, retryDelayMs);
  const url = rawCaptureUrl(timestamp, originalUrl);

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (attempt > 0) await sleepImpl(retryDelayMs * attempt);

    let response: Response;
    try {
      response = await fetchImpl(url, { redirect: 'follow' });
    } catch (error) {
      lastError = error; // network failure — retry
      continue;
    }

    if (response.ok) return await response.text();

    if (!isRetryableStatus(response.status)) {
      throw new Error(`archive responded ${response.status} ${response.statusText}`);
    }
    lastError = new Error(`archive responded ${response.status}`); // retry
  }

  throw new Error(
    `failed to fetch capture ${timestamp} ${originalUrl} after ${retries + 1} attempts: ${String(lastError)}`,
  );
}

/** A `WaybackEvidence` item (the `@portfolio/data` shape) built from a capture.
 *  `id` and `label` get placeholder values and `confidence` defaults to
 *  `inferred` — all three are the researcher's call, to edit before the item
 *  lands in content. `role` is left unset. */
export function toEvidenceDraft(capture: Capture): WaybackEvidence {
  const capturedAt = timestampToIsoDate(capture.timestamp);
  return {
    kind: 'wayback',
    // Placeholder id — unique enough to distinguish drafts; replace with a
    // meaningful one (e.g. `before`, `context-2014`) when it lands in content.
    id: `wb-${capture.timestamp}`,
    label: `${capture.originalUrl} — ${capturedAt}`,
    confidence: 'inferred',
    originalUrl: capture.originalUrl,
    archiveUrl: playbackUrl(capture.timestamp, capture.originalUrl),
    capturedAt,
  };
}
