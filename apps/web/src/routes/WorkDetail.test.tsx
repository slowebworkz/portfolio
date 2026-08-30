import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { routes } from '../routes.tsx';

function renderAt(path: string) {
  return render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);
}

describe('WorkDetail', () => {
  it('shows the package line and the case study for a project that has one', async () => {
    renderAt('/work/praxis-kit');

    await screen.findByRole('heading', { level: 1, name: /praxis kit/i });
    expect(screen.getByText(/downloads\/week/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /case study/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /key decisions/i })).toBeInTheDocument();
  });

  it('omits the package line for a project that is not a published package', async () => {
    renderAt('/work/mcmillan-study-guides-redesign');

    await screen.findByRole('heading', { level: 1 });
    expect(screen.queryByText(/downloads\/week/i)).not.toBeInTheDocument();
  });

  // The `{project.caseStudy && <CaseStudy>}` guard's absent-case is covered by
  // CaseStudy.test.tsx ("omits subsections that are not provided"); every real
  // project now carries a case study.
});
