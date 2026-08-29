import type { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/** Mount the app into `container`. Prerendered pages ship with markup in #root —
 *  hydrate those; fall back to a fresh client render (dev, or any route the
 *  prerender step didn't cover). Knows nothing about the app it mounts. */
export function mountApp(container: HTMLElement, app: ReactNode): void {
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}
