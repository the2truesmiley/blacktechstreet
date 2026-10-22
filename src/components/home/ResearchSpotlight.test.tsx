import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ResearchSpotlight, RESEARCH_SPOTLIGHT_END } from './ResearchSpotlight';

const renderAt = (iso: string) => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(iso));
  return render(
    <MemoryRouter>
      <ResearchSpotlight />
    </MemoryRouter>
  );
};

afterEach(() => vi.useRealTimers());

describe('ResearchSpotlight 30-day window', () => {
  it('ends at 12:00 AM Central on November 21, 2026', () => {
    expect(RESEARCH_SPOTLIGHT_END.toISOString()).toBe('2026-11-21T06:00:00.000Z');
  });

  it('shows on the last visible day, November 20, 2026 at 11:59 PM Central', () => {
    renderAt('2026-11-20T23:59:00-06:00');
    expect(screen.getByRole('heading', { name: 'Value-Native AI' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read the paper/ })).toHaveAttribute(
      'href',
      '/thought-leadership/value-native-ai'
    );
  });

  it('renders nothing at all once the end date is reached', () => {
    const { container } = renderAt('2026-11-21T00:00:00-06:00');
    expect(container).toBeEmptyDOMElement();
  });
});
