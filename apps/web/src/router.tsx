import { createBrowserRouter } from 'react-router';

import { routes } from './routes.tsx';

export { routes };

/** `/portfolio/` -> `/portfolio`; `/` -> `""` (router treats empty as root). */
export const basename = import.meta.env.BASE_URL.replace(/\/$/u, '');

export const router = createBrowserRouter(routes, basename ? { basename } : undefined);
