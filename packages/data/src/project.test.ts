import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { ProjectSchema } from './project.js';

const valid = {
  slug: 'component-library',
  title: 'Component Library',
  summary: 'A typed, tree-shakeable React component library.',
  category: 'open-source',
  timeline: { start: '2023', end: null },
  role: 'Author and maintainer',
  organization: null,
  technologies: [{ name: 'TypeScript', confidence: 'confirmed' }],
  links: [{ label: 'Source', url: 'https://github.com/example/lib', kind: 'repo' }],
  media: [],
  evidence: [
    {
      id: 'src',
      kind: 'source',
      label: 'Repository',
      confidence: 'confirmed',
      url: 'https://github.com/example/lib',
    },
  ],
  publishability: 'public',
  caseStudy: null,
  featured: true,
};

describe('ProjectSchema', () => {
  it('accepts a well-formed project', () => {
    expect(() => v.parse(ProjectSchema, valid)).not.toThrow();
  });

  it('rejects a slug that is not kebab-case', () => {
    expect(() => v.parse(ProjectSchema, { ...valid, slug: 'Component Library' })).toThrow();
  });

  it('rejects an unknown evidence kind', () => {
    const bad = {
      ...valid,
      evidence: [{ id: 'x', kind: 'telepathy', label: 'n/a', confidence: 'inferred' }],
    };
    expect(() => v.parse(ProjectSchema, bad)).toThrow();
  });

  it('rejects a start date that is not ISO year / year-month', () => {
    const bad = { ...valid, timeline: { start: 'June 2023', end: null } };
    expect(() => v.parse(ProjectSchema, bad)).toThrow();
  });

  it('accepts an ongoing project (end: null) and a year-month end', () => {
    expect(() =>
      v.parse(ProjectSchema, { ...valid, timeline: { start: '2012-03', end: '2015-08' } }),
    ).not.toThrow();
  });
});
