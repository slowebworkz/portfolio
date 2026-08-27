import { checkReferentialIntegrity } from '@portfolio/data';
import { describe, expect, it } from 'vitest';

import { getFeaturedProjects, getProject, projects } from './index.js';

describe('authored projects', () => {
  it('has at least the three inventory entries', () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it('all pass referential integrity (parseProject already ran at module load)', () => {
    for (const project of projects) {
      expect(() => checkReferentialIntegrity(project)).not.toThrow();
    }
  });

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('nothing private is featured', () => {
    for (const project of getFeaturedProjects()) {
      expect(project.publishability.status).not.toBe('private');
    }
  });

  it('getProject resolves a known slug and misses an unknown one', () => {
    expect(getProject('praxis-kit')?.title).toBe('Praxis Kit');
    expect(getProject('nope')).toBeUndefined();
  });

  it('every lineage stage with an evidenceId points at real evidence', () => {
    for (const project of projects) {
      const ids = new Set(project.evidence.map((e) => e.id));
      for (const stage of project.lineage ?? []) {
        if (stage.evidenceId !== undefined) {
          expect(ids.has(stage.evidenceId)).toBe(true);
        }
      }
    }
  });
});
