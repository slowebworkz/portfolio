import { projects } from '@portfolio/content';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';

import { routes } from './routes.tsx';

export { metaForPath } from './meta.ts';

/** `/portfolio/` -> `/portfolio`; unset / `/` -> `""`. Matches the client basename. */
const basename = (process.env.SITE_BASE ?? '/').replace(/\/$/u, '');
const handlerOptions = basename ? { basename } : undefined;

/** Render one route to an HTML string for the prerender step. */
export async function render(pathname: string): Promise<string> {
  const handler = createStaticHandler(routes, handlerOptions);
  const requestPath = `${basename}${pathname === '/' ? '/' : pathname}`;
  const context = await handler.query(new Request(`http://localhost${requestPath}`));

  if (context instanceof Response) {
    throw new Error(`Route "${pathname}" returned a ${context.status} response during prerender`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
  );
}

/** Every path the prerender step should emit. */
export const routePaths: string[] = [
  '/',
  '/work',
  '/about',
  '/writing',
  '/contact',
  ...projects
    .filter((project) => project.publishability.status !== 'private')
    .map((project) => `/work/${project.slug}`),
];
