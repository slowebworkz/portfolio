import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { routePaths } from './entry-server.tsx';
import { routes } from './routes.tsx';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return { router, ...render(<RouterProvider router={router} />) };
}

const projectPath = routePaths.find((path) => path.startsWith('/work/'));

describe('app shell', () => {
  it.each(routePaths)('resolves and renders %s', async (path) => {
    renderAt(path);
    expect(await screen.findByRole('main')).toBeInTheDocument();
  });

  it('renders the not-found route for an unknown path', async () => {
    renderAt('/nope');
    expect(await screen.findByTestId('not-found')).toBeInTheDocument();
  });

  it('sets the document title from the route', async () => {
    renderAt('/about');
    await screen.findByRole('main');
    expect(document.title).toBe('About · Karsten Huehn');
  });

  it('navigates from the home page to the work index via the primary nav', async () => {
    const user = userEvent.setup();
    const { router } = renderAt('/');

    const nav = screen.getByRole('navigation', { name: /primary/i });
    await user.click(within(nav).getByRole('link', { name: 'Work' }));

    await screen.findByRole('main');
    expect(router.state.location.pathname).toBe('/work');
  });

  it('navigates from the work index into a project detail page', async () => {
    expect(projectPath).toBeDefined();

    const user = userEvent.setup();
    const { router } = renderAt('/work');

    const link = (await screen.findAllByRole('link')).find(
      (anchor) => anchor.getAttribute('href') === projectPath,
    );
    expect(link).toBeDefined();
    await user.click(link as HTMLElement);

    expect(router.state.location.pathname).toBe(projectPath);
  });
});
