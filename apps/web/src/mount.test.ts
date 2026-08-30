import { createRoot, hydrateRoot } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mountApp } from './mount.ts';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
  hydrateRoot: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// mountApp is app-agnostic, so a placeholder node is all the test needs.
const app = 'app-tree';

describe('mountApp', () => {
  it('hydrates a container that already holds prerendered markup', () => {
    const container = document.createElement('div');
    container.append(document.createElement('p'));

    mountApp(container, app);

    expect(hydrateRoot).toHaveBeenCalledWith(container, app);
    expect(createRoot).not.toHaveBeenCalled();
  });

  it('client-renders into an empty container', () => {
    const container = document.createElement('div');

    mountApp(container, app);

    expect(createRoot).toHaveBeenCalledWith(container);
    expect(hydrateRoot).not.toHaveBeenCalled();
  });
});
