import { projects } from '@portfolio/content';
import { describe, expect, it } from 'vitest';

import { render, routePaths } from './entry-server.tsx';

const workSlug = (slug: string) => `/work/${slug}`;

describe('prerender contract', () => {
  it.each(routePaths)('prerenders %s to an HTML document', async (path) => {
    const html = await render(path);
    expect(html).toContain('<main');
  });

  it('renders a document for an unknown route instead of throwing', async () => {
    await expect(render('/no-such-page')).resolves.toContain('<main');
  });

  it('emits a route for every public project', () => {
    const publicSlugs = projects
      .filter((project) => project.publishability.status !== 'private')
      .map((project) => workSlug(project.slug));

    expect(routePaths).toEqual(expect.arrayContaining(publicSlugs));
  });

  it('keeps private projects out of the prerender set', () => {
    const privateSlugs = projects
      .filter((project) => project.publishability.status === 'private')
      .map((project) => workSlug(project.slug));

    for (const slug of privateSlugs) {
      expect(routePaths).not.toContain(slug);
    }
  });
});
