import { describe, expect, it } from 'vitest';

import { parseProject, safeParseProject } from './parse.js';

const valid = {
  slug: 'example-redesign',
  title: 'Example Redesign',
  summary: 'A modernization of an existing marketing site.',
  category: 'contract',
  status: 'gone',
  period: { start: '2013', end: '2013', approximate: true, note: '3-month contract' },
  role: 'Sole developer, direct contract',
  organization: { name: 'Example Co', kind: 'client', location: 'Somewhere, CA' },
  motivation: 'The client wanted a fresher look.',
  technologies: [
    { name: 'WordPress', confidence: 'inferred' },
    { name: 'jQuery', confidence: 'inferred' },
  ],
  contributions: {
    did: ['Built the theme from client comps'],
    didNot: ['Own the visual design'],
  },
  lineage: [
    {
      period: '≤ 2012',
      label: 'Table-based static site',
      description: 'Old hand-built HTML.',
      mine: false,
      confidence: 'inferred',
    },
    {
      period: '2013-10',
      label: 'The redesign',
      description: 'Custom theme, ~9x lighter.',
      mine: true,
      confidence: 'confirmed',
      evidenceId: 'after',
    },
  ],
  links: [
    {
      label: 'Archived',
      url: 'https://web.archive.org/web/2013/http://example.com/',
      kind: 'archive',
    },
  ],
  evidence: [
    {
      id: 'after',
      kind: 'wayback',
      label: 'The redesign, 2013-10',
      confidence: 'inferred',
      role: 'after',
      originalUrl: 'http://example.com/',
      archiveUrl: 'https://web.archive.org/web/20131028/http://example.com/',
      capturedAt: '2013-10-28',
    },
  ],
  retainedArtifacts: 'none',
  caveats: ['Exact finish date not pinned — a 2-year archive gap.'],
  publishability: { status: 'likely', notes: 'No known NDA.' },
  caseStudy: null,
  featured: false,
};

describe('parseProject', () => {
  it('accepts a well-formed redesign project', () => {
    expect(() => parseProject(valid)).not.toThrow();
  });

  it('rejects a non-kebab slug', () => {
    expect(() => parseProject({ ...valid, slug: 'Example Redesign' })).toThrow();
  });

  it('rejects an unknown category', () => {
    expect(() => parseProject({ ...valid, category: 'freelance' })).toThrow();
  });

  it('rejects a malformed period start', () => {
    expect(() => parseProject({ ...valid, period: { start: 'spring 2013', end: null } })).toThrow();
  });

  it('rejects a lineage stage that references an unknown evidence id', () => {
    const bad = {
      ...valid,
      lineage: [{ ...valid.lineage[1], evidenceId: 'does-not-exist' }],
    };
    expect(() => parseProject(bad)).toThrow(/unknown evidence id/u);
  });

  it('rejects duplicate evidence ids', () => {
    const bad = { ...valid, evidence: [valid.evidence[0], valid.evidence[0]] };
    expect(() => parseProject(bad)).toThrow(/duplicate evidence id/u);
  });

  it('safeParseProject reports success without throwing', () => {
    expect(safeParseProject(valid).success).toBe(true);
    expect(safeParseProject({ ...valid, slug: 'Bad Slug' }).success).toBe(false);
  });
});
