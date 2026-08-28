import { describe, expect, it } from 'vitest';

import { experience } from './experience.ts';
import { profile } from './profile.ts';
import { getProject } from './projects/index.ts';

describe('profile', () => {
  it('has a name, tagline, bio, and at least one link (parseProfile ran at load)', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.bio.length).toBeGreaterThan(20);
    expect(profile.links.length).toBeGreaterThan(0);
  });
});

describe('experience', () => {
  it('covers the résumé roles', () => {
    expect(experience.length).toBeGreaterThanOrEqual(5);
  });

  it('is ordered newest-first by start date', () => {
    const starts = experience.map((e) => e.period.start);
    const sorted = [...starts].sort().reverse();
    expect(starts).toEqual(sorted);
  });

  it('every relatedProject slug resolves to a real project', () => {
    for (const role of experience) {
      if (role.relatedProject !== undefined) {
        expect(getProject(role.relatedProject)).toBeDefined();
      }
    }
  });

  it('unnamed entries are flagged named:false', () => {
    for (const role of experience) {
      if (role.organization === 'Independent') {
        expect(role.named).toBe(false);
      }
    }
  });
});
