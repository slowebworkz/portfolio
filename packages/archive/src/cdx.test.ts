import { describe, expect, it, vi } from 'vitest';

import { cdxRequestUrl, discover, parseCdxRows } from './cdx.ts';

const HEADER = ['urlkey', 'timestamp', 'original', 'mimetype', 'statuscode', 'digest', 'length'];
const ROW = (ts: string, original: string, status = '200', digest = 'AAA') => [
  'com,example)/',
  ts,
  original,
  'text/html',
  status,
  digest,
  '1234',
];

describe('cdxRequestUrl', () => {
  it('defaults to prefix match, 200-only, digest-collapsed, explicit field list', () => {
    const url = new URL(cdxRequestUrl('example.com'));
    expect(url.pathname).toBe('/cdx/search/cdx');
    expect(url.searchParams.get('url')).toBe('example.com');
    expect(url.searchParams.get('matchType')).toBe('prefix');
    expect(url.searchParams.get('output')).toBe('json');
    expect(url.searchParams.get('fl')).toBe('timestamp,original,mimetype,statuscode,digest,length');
    expect(url.searchParams.getAll('filter')).toContain('statuscode:200');
    expect(url.searchParams.get('collapse')).toBe('digest');
  });

  it('passes date range, limit, and mimetype through', () => {
    const url = new URL(
      cdxRequestUrl('example.com', {
        from: '2013',
        to: '201412',
        limit: 50,
        mimeType: 'text/html',
      }),
    );
    expect(url.searchParams.get('from')).toBe('2013');
    expect(url.searchParams.get('to')).toBe('201412');
    expect(url.searchParams.get('limit')).toBe('50');
    expect(url.searchParams.getAll('filter')).toContain('mimetype:text/html');
  });

  it('can opt out of the status filter and digest collapse', () => {
    const url = new URL(cdxRequestUrl('example.com', { onlyOk: false, collapseByDigest: false }));
    expect(url.searchParams.getAll('filter')).not.toContain('statuscode:200');
    expect(url.searchParams.has('collapse')).toBe(false);
  });

  it('rejects malformed dates, a reversed range, and a non-positive limit', () => {
    expect(() => cdxRequestUrl('example.com', { from: '13' })).toThrow(/YYYY/);
    expect(() => cdxRequestUrl('example.com', { to: '2014-01' })).toThrow(/YYYY/);
    expect(() => cdxRequestUrl('example.com', { from: '2015', to: '2013' })).toThrow(/after/);
    expect(() => cdxRequestUrl('example.com', { limit: 0 })).toThrow(/positive integer/);
    expect(() => cdxRequestUrl('example.com', { limit: 2.5 })).toThrow(/positive integer/);
  });

  it('accepts a bare domain, a host+path, or a full URL, and rejects junk', () => {
    expect(() => cdxRequestUrl('mcmguides.com')).not.toThrow();
    expect(() => cdxRequestUrl('www.ap-logic.com/contact')).not.toThrow();
    expect(() => cdxRequestUrl('https://example.com/')).not.toThrow();
    expect(() => cdxRequestUrl('not a url')).toThrow(/domain or http/);
    expect(() => cdxRequestUrl('banana')).toThrow(/domain or http/);
  });
});

describe('parseCdxRows', () => {
  it('maps rows by header position and drops the header', () => {
    const captures = parseCdxRows([
      HEADER,
      ROW('20130516030421', 'http://www.ap-logic.com/'),
      ROW('20131028060152', 'http://www.ap-logic.com/contact'),
    ]);
    expect(captures).toHaveLength(2);
    expect(captures[0]).toMatchObject({
      timestamp: '20130516030421',
      originalUrl: 'http://www.ap-logic.com/',
      mimeType: 'text/html',
      statusCode: '200',
      digest: 'AAA',
    });
  });

  it('returns nothing for an empty or header-only response', () => {
    expect(parseCdxRows([])).toEqual([]);
    expect(parseCdxRows([HEADER])).toEqual([]);
  });
});

describe('discover', () => {
  it('requests the CDX URL and returns parsed captures', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [HEADER, ROW('20130516030421', 'http://www.ap-logic.com/')],
    });

    const captures = await discover('ap-logic.com', {
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(String(fetchImpl.mock.calls[0]?.[0])).toContain('cdx/search/cdx');
    expect(captures).toHaveLength(1);
  });

  it('throws with the status on a failed request', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 503, statusText: 'Service Unavailable' });
    await expect(
      discover('ap-logic.com', { fetchImpl: fetchImpl as unknown as typeof fetch }),
    ).rejects.toThrow(/503/);
  });
});
