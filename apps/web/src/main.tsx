import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { router } from './router.tsx';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container #root not found');
}

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Prerendered pages ship with markup in #root — hydrate those; fall back to a
// fresh client render (dev, or any route the prerender step didn't cover).
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
