/**
 * Client for the Internet Archive CDX API — the index of every capture the
 * Wayback Machine holds for a URL or prefix.
 *
 * https://archive.org/developers/wayback-cdx-server.html
 */

const CDX_ENDPOINT = 'https://web.archive.org/cdx/search/cdx';

/** The fields requested from CDX, in order — pins the response schema instead of
 *  relying on the server default. `parseCdxRows` still reads them by name. */
const CDX_FIELDS = ['timestamp', 'original', 'mimetype', 'statuscode', 'digest', 'length'] as const;

const CDX_DATE = /^\d{4}(?:\d{2}){0,2}$/u;

function assertCdxDate(value: string, name: string): void {
  if (!CDX_DATE.test(value)) {
    throw new Error(`${name} must be YYYY, YYYYMM, or YYYYMMDD: ${value}`);
  }
}

/** CDX accepts a bare host, a host + path, or a full http(s) URL. Reject
 *  anything that isn't shaped like one of those before building a request. */
function assertCdxTarget(value: string): void {
  const host = value.replace(/^https?:\/\//iu, '');
  if (!/^[^\s/?#]+\.[^\s/?#]+(\/\S*)?$/u.test(host)) {
    throw new Error(`target must be a domain or http(s) URL: ${value}`);
  }
}

/** One row of the CDX index: a single capture. */
export interface Capture {
  /** 14-digit `YYYYMMDDhhmmss`. */
  timestamp: string;
  /** The URL as it was captured. */
  originalUrl: string;
  mimeType: string;
  /** HTTP status at capture time. `"-"` for some redirect rows. */
  statusCode: string;
  /** Content hash — identical across captures means the page did not change. */
  digest: string;
  /** Stored length in bytes, as a string (`"-"` when unknown). */
  length: string;
}

/** How the CDX `url` parameter is interpreted. */
export type CdxMatchType = 'exact' | 'prefix' | 'host' | 'domain';

export interface DiscoverOptions {
  /** `YYYY`, `YYYYMM`, or `YYYYMMDD`. */
  from?: string;
  to?: string;
  /** Cap the number of rows returned. */
  limit?: number;
  /** How `url` is interpreted. `prefix` (default) matches the path tree. */
  matchType?: CdxMatchType;
  /** Keep only `statuscode:200` rows. Default `true`. */
  onlyOk?: boolean;
  /** `collapse=digest` — one row per distinct content hash. Default `true`. */
  collapseByDigest?: boolean;
  /** e.g. `"text/html"`. */
  mimeType?: string;
  /** Injected for tests. */
  fetchImpl?: typeof fetch;
}

/** Build the CDX request URL. Validates `from` / `to` / `limit` here so the
 *  library's contract holds regardless of caller (not just via the CLI). */
export function cdxRequestUrl(url: string, options: DiscoverOptions = {}): string {
  assertCdxTarget(url);
  const { onlyOk = true, collapseByDigest = true, matchType = 'prefix' } = options;
  const params = new URLSearchParams({
    url,
    output: 'json',
    fl: CDX_FIELDS.join(','),
    matchType,
  });

  if (options.from !== undefined) assertCdxDate(options.from, 'from');
  if (options.to !== undefined) assertCdxDate(options.to, 'to');
  if (options.from !== undefined && options.to !== undefined && options.from > options.to) {
    throw new Error(`from (${options.from}) is after to (${options.to})`);
  }
  if (options.from !== undefined) params.set('from', options.from);
  if (options.to !== undefined) params.set('to', options.to);

  if (options.limit !== undefined) {
    if (!Number.isInteger(options.limit) || options.limit < 1) {
      throw new Error(`limit must be a positive integer: ${options.limit}`);
    }
    params.set('limit', String(options.limit));
  }

  if (onlyOk) params.append('filter', 'statuscode:200');
  if (options.mimeType) params.append('filter', `mimetype:${options.mimeType}`);
  if (collapseByDigest) params.set('collapse', 'digest');

  return `${CDX_ENDPOINT}?${params.toString()}`;
}

/** Parse the CDX array-of-arrays response. The first row is the field header;
 *  a data row whose width doesn't match it is rejected rather than
 *  partially filled. */
export function parseCdxRows(rows: string[][]): Capture[] {
  const [header, ...body] = rows;
  if (!header) return [];

  // Same field list the request pins with `fl` — the two agree by construction.
  const column = (name: (typeof CDX_FIELDS)[number]): number => {
    const index = header.indexOf(name);
    if (index === -1) throw new Error(`CDX response has no "${name}" column`);
    return index;
  };
  const ts = column('timestamp');
  const original = column('original');
  const mimetype = column('mimetype');
  const statuscode = column('statuscode');
  const digest = column('digest');
  const length = column('length');

  return body.map((row, index) => {
    if (row.length !== header.length) {
      throw new Error(`CDX row ${index} has ${row.length} columns, expected ${header.length}`);
    }
    // Widths match and the column indices are valid, so these are all present.
    return {
      timestamp: row[ts] as string,
      originalUrl: row[original] as string,
      mimeType: row[mimetype] as string,
      statusCode: row[statuscode] as string,
      digest: row[digest] as string,
      length: row[length] as string,
    };
  });
}

/** Query the CDX API for captures of `url`. */
export async function discover(url: string, options: DiscoverOptions = {}): Promise<Capture[]> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const requestUrl = cdxRequestUrl(url, options);

  const response = await fetchImpl(requestUrl);
  if (!response.ok) {
    throw new Error(`CDX request failed: ${response.status} ${response.statusText}`);
  }

  const rows = (await response.json()) as string[][];
  return parseCdxRows(rows);
}
