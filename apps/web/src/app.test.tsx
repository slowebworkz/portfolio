import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { routes } from './router.tsx';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe('app shell', () => {
  it('renders the home page with primary navigation', async () => {
    renderAt('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /engineering portfolio/i }),
    ).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Work' })).toBeInTheDocument();
  });

  it('renders a project detail page from the slug', async () => {
    renderAt('/work/component-library');
    expect(
      await screen.findByRole('heading', { level: 1, name: /component library/i }),
    ).toBeInTheDocument();
  });

  it('renders a not-found page for an unknown route', async () => {
    renderAt('/nope');
    expect(
      await screen.findByRole('heading', { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
