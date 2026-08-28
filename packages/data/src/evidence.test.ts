import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { EvidenceSchema } from './evidence.js';

describe('EvidenceSchema', () => {
  it('accepts a Wayback capture with a role and an ISO capture date', () => {
    const capture = {
      id: 'wb-before',
      kind: 'wayback',
      label: 'Homepage as it stood in 2016',
      confidence: 'inferred',
      role: 'before',
      originalUrl: 'http://old-client.example/',
      archiveUrl: 'https://web.archive.org/web/20160101000000/http://old-client.example/',
      capturedAt: '2016-01-01',
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
      capturedAt: '2016',
    };
    expect(() => v.parse(EvidenceSchema, capture)).toThrow();
  });

  it('rejects an unknown role', () => {
    const capture = {
      id: 'wb-1',
      kind: 'wayback',
      label: 'x',
      confidence: 'inferred',
      role: 'sideways',
      originalUrl: 'http://x.example/',
      archiveUrl: 'https://web.archive.org/web/2016/http://x.example/',
      capturedAt: '2016-01-01',
    };
    expect(() => v.parse(EvidenceSchema, capture)).toThrow();
  });

  it('accepts a published-package evidence item', () => {
    const pkg = {
      id: 'npm',
      kind: 'package',
      label: 'praxis-kit on npm',
      confidence: 'confirmed',
      role: 'supporting',
      url: 'https://www.npmjs.com/package/praxis-kit',
      registry: 'npm',
    };
    expect(() => v.parse(EvidenceSchema, pkg)).not.toThrow();
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
