import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { EvidenceSchema } from './evidence.js';

describe('EvidenceSchema', () => {
  it('accepts a Wayback capture with an ISO capture date', () => {
    const capture = {
      id: 'wb-1',
      kind: 'wayback',
      label: 'Homepage as it stood in 2014',
      confidence: 'inferred',
      originalUrl: 'http://old-client.example/',
      archiveUrl: 'https://web.archive.org/web/20140601000000/http://old-client.example/',
      capturedAt: '2014-06-01',
    };
    expect(() => v.parse(EvidenceSchema, capture)).not.toThrow();
  });

  it('rejects a Wayback capture whose capturedAt is only a year', () => {
    const capture = {
      id: 'wb-1',
      kind: 'wayback',
      label: 'x',
      confidence: 'inferred',
      originalUrl: 'http://x.example/',
      archiveUrl: 'https://web.archive.org/web/x',
      capturedAt: '2014',
    };
    expect(() => v.parse(EvidenceSchema, capture)).toThrow();
  });

  it('accepts a personal-account record', () => {
    const account = {
      id: 'acc-1',
      kind: 'account',
      label: 'Recollection',
      confidence: 'recollection',
      detail: 'Built the booking flow; no source or captures survive.',
    };
    expect(() => v.parse(EvidenceSchema, account)).not.toThrow();
  });
});
