import type { CaseStudy as CaseStudyData } from '@portfolio/data';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CaseStudy } from './CaseStudy.tsx';

const full: CaseStudyData = {
  summary: 'One-line positioning for the study.',
  context: 'Some **context** prose.',
  goals: ['First goal', 'Second goal'],
  keyDecisions: [
    {
      decision: 'Chose approach A',
      rationale: 'Because it `works`.',
      tradeoffs: 'Costs more at `build` time.',
    },
  ],
  whatIdChange: 'Ship a smaller default.',
};

describe('CaseStudy', () => {
  it('renders the section, the summary, and each provided subsection', () => {
    render(<CaseStudy study={full} />);

    expect(screen.getByRole('heading', { level: 2, name: /case study/i })).toBeInTheDocument();
    expect(screen.getByText(full.summary)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /context/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /goals/i })).toBeInTheDocument();
    expect(screen.getByText('First goal')).toBeInTheDocument();
  });

  it('renders each key decision with its rationale and trade-offs', () => {
    render(<CaseStudy study={full} />);

    expect(screen.getByText('Chose approach A')).toBeInTheDocument();
    expect(screen.getByText(/Trade-offs:/)).toBeInTheDocument();
    // trade-offs go through <Markdown inline> — the backticked word is a <code>,
    // and it stays inside the <p> (no paragraph wrapper).
    const code = screen.getByText('build', { selector: 'code' });
    expect(code).toBeInTheDocument();
    expect(code.closest('p')).toHaveClass('meta');
  });

  it('renders Markdown emphasis and code from prose fields', () => {
    render(<CaseStudy study={full} />);

    const context = screen.getByRole('heading', { level: 3, name: /context/i }).parentElement;
    expect(within(context as HTMLElement).getByText('context')).toBeInstanceOf(HTMLElement);
  });

  it('omits subsections that are not provided', () => {
    render(<CaseStudy study={{ summary: 'Only a summary here.' }} />);

    expect(screen.getByText('Only a summary here.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
