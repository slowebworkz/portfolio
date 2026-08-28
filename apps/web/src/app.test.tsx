import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { routes } from './routes.tsx';

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
    renderAt('/work/praxis-kit');
    expect(
      await screen.findByRole('heading', { level: 1, name: /praxis kit/i }),
    ).toBeInTheDocument();
  });

  it('lists the authored projects on /work', async () => {
    renderAt('/work');
    expect(await screen.findByRole('link', { name: /McMillan Study Guides/i })).toBeInTheDocument();
  });

  it('renders the profile and experience timeline on /about', async () => {
    renderAt('/about');
    expect(
      await screen.findByRole('heading', { level: 2, name: /experience/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/FastSpring/)).toBeInTheDocument();
  });

  it('shows contact links on /contact', async () => {
    renderAt('/contact');
    const main = await screen.findByRole('main');
    expect(within(main).getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
  });

  it('sets the document title from the route', async () => {
    renderAt('/about');
    await screen.findByRole('heading', { level: 1, name: /about/i });
    expect(document.title).toBe('About · Karsten Huehn');
  });

  it('renders a not-found page for an unknown route', async () => {
    renderAt('/nope');
    expect(
      await screen.findByRole('heading', { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
