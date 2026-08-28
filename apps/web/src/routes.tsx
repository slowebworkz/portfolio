import type { RouteObject } from 'react-router';

import { RootLayout } from './layout/RootLayout.tsx';
import { About } from './routes/About.tsx';
import { Contact } from './routes/Contact.tsx';
import { Home } from './routes/Home.tsx';
import { NotFound } from './routes/NotFound.tsx';
import { Work } from './routes/Work.tsx';
import { WorkDetail } from './routes/WorkDetail.tsx';
import { Writing } from './routes/Writing.tsx';

/** Route table — shared by the browser router, tests, and SSR/prerender. */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'work', Component: Work },
      { path: 'work/:slug', Component: WorkDetail },
      { path: 'about', Component: About },
      { path: 'writing', Component: Writing },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
];
