import { projects } from '@portfolio/content';
import { describe, expect, it } from 'vitest';

import { metaForPath } from './meta.ts';

describe('metaForPath', () => {
  it('gives the home page a name-first title', () => {
    expect(metaForPath('/').title).toMatch(/^Karsten Huehn — /u);
  });

  it('suffixes section pages with the site name', () => {
    expect(metaForPath('/work').title).toBe('Work · Karsten Huehn');
    expect(metaForPath('/about').title).toBe('About · Karsten Huehn');
  });

  it('uses the project title and summary for a work detail page', () => {
    const project = projects.find((p) => p.publishability.status !== 'private');
    if (!project) throw new Error('expected at least one public project');
    const meta = metaForPath(`/work/${project.slug}`);
    expect(meta.title).toBe(`${project.title} · Karsten Huehn`);
    expect(meta.description).toBe(project.summary);
  });

  it('ignores a trailing slash', () => {
    expect(metaForPath('/work/')).toEqual(metaForPath('/work'));
  });

  it('falls back to a not-found title for unknown paths', () => {
    expect(metaForPath('/nope').title).toBe('Page not found · Karsten Huehn');
    expect(metaForPath('/work/does-not-exist').title).toBe('Project not found · Karsten Huehn');
  });

  it('always produces a non-empty description', () => {
    for (const path of ['/', '/work', '/about', '/writing', '/contact', '/nope']) {
      expect(metaForPath(path).description.length).toBeGreaterThan(0);
    }
  });
});
