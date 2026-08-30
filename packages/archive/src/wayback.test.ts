import { parseEvidence } from '@portfolio/data';
import { describe, expect, it, vi } from 'vitest';

import type { Capture } from './cdx.ts';
import {
  fetchCapture,
  playbackUrl,
  rawCaptureUrl,
  timestampToIsoDate,
  toEvidenceDraft,
} from './wayback.ts';

const capture: Capture = {
  timestamp: '20161007132557',
  originalUrl: 'http://mcmguides.com/',
  mimeType: 'text/html',
  statusCode: '200',
  digest: 'ABC',
  length: '9000',
};

describe('timestampToIsoDate', () => {
  it('takes the date part of a Wayback timestamp', () => {
    expect(timestampToIsoDate('20161007132557')).toBe('2016-10-07');
  });

  it('rejects a value that is not a timestamp', () => {
    expect(() => timestampToIsoDate('2016')).toThrow();
  });
});

describe('capture URLs', () => {
  it('builds playback and raw URLs', () => {
    expect(playbackUrl('20161007132557', 'http://mcmguides.com/')).toBe(
      'https://web.archive.org/web/20161007132557/http://mcmguides.com/',
    );
    expect(rawCaptureUrl('20161007132557', 'http://mcmguides.com/')).toBe(
      'https://web.archive.org/web/20161007132557id_/http://mcmguides.com/',
    );
  });
});

describe('toEvidenceDraft', () => {
  it('produces a value that satisfies the data package WaybackEvidence schema', () => {
    const draft = toEvidenceDraft(capture);
    expect(draft).toMatchObject({
      kind: 'wayback',
      confidence: 'inferred',
      originalUrl: 'http://mcmguides.com/',
      capturedAt: '2016-10-07',
    });
    expect(() => parseEvidence(draft)).not.toThrow();
  });
});

describe('fetchCapture', () => {
  it('requests the raw capture URL and returns the body', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200, text: async () => '<html>ok</html>' });
    const body = await fetchCapture('20161007132557', 'http://mcmguides.com/', {
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(body).toBe('<html>ok</html>');
    expect(String(fetchImpl.mock.calls[0]?.[0])).toContain('20161007132557id_/');
  });

  it('retries on 5xx then succeeds, without real waiting', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503, statusText: 'busy' })
      .mockResolvedValueOnce({ ok: true, status: 200, text: async () => 'second try' });
    const sleepImpl = vi.fn().mockResolvedValue(undefined);

    const body = await fetchCapture('20161007132557', 'http://mcmguides.com/', {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      sleepImpl,
    });

    expect(body).toBe('second try');
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(sleepImpl).toHaveBeenCalledOnce();
  });

  it('does not retry a non-retryable status (404)', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' });
    const sleepImpl = vi.fn().mockResolvedValue(undefined);

    await expect(
      fetchCapture('20161007132557', 'http://mcmguides.com/gone', {
        fetchImpl: fetchImpl as unknown as typeof fetch,
        sleepImpl,
      }),
    ).rejects.toThrow(/404/);
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(sleepImpl).not.toHaveBeenCalled();
  });

  it('rejects nonsensical retry options', async () => {
    await expect(
      fetchCapture('20161007132557', 'http://mcmguides.com/', { retries: -1 }),
    ).rejects.toThrow(/non-negative integer/);
  });

  it('gives up after the retry budget', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'err' });
    const sleepImpl = vi.fn().mockResolvedValue(undefined);

    await expect(
      fetchCapture('20161007132557', 'http://mcmguides.com/', {
        retries: 2,
        fetchImpl: fetchImpl as unknown as typeof fetch,
        sleepImpl,
      }),
    ).rejects.toThrow(/after 3 attempts/);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });
});
