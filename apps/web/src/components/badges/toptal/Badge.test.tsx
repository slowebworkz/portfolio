import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ToptalBadge } from './Badge.tsx';

describe('ToptalBadge', () => {
  it('shows the rank and links to the résumé', () => {
    render(<ToptalBadge />);
    expect(screen.getByRole('heading', { name: /top 3% talent/i })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /hire me/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('toptal.com'));
  });

  it('exposes the Toptal wordmark to assistive tech', () => {
    render(<ToptalBadge />);
    expect(screen.getByRole('img', { name: /toptal/i })).toBeInTheDocument();
  });
});
