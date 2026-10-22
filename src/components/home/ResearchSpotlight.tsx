import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Homepage research spotlight end date.
 * Shown for 30 days starting October 22, 2026. Last day visible is November 20, 2026.
 * Hides automatically at 12:00 AM Central on November 21, 2026.
 * To extend or reuse this section, change this date.
 */
export const RESEARCH_SPOTLIGHT_END = new Date('2026-11-21T00:00:00-06:00');

export function ResearchSpotlight() {
  if (Date.now() >= RESEARCH_SPOTLIGHT_END.getTime()) return null;

  return (
    <section aria-labelledby="research-spotlight-heading" className="relative z-10 px-5 max-w-5xl mx-auto mb-12">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-0.5 w-full bg-primary" />
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">New research</p>
            <h2
              id="research-spotlight-heading"
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3"
            >
              Value-Native AI
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-3">
              A framework for maximizing the return on AI for any individual and any organization, built on value
              creation rather than AI adoption.
            </p>
            <p className="text-sm text-muted-foreground">Tyrance Billingsley II, Founder &amp; CEO · SSRN · 2026</p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Link
              to="/thought-leadership/value-native-ai"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Read the paper
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/thought-leadership"
              className="text-center text-sm font-semibold text-foreground hover:text-primary underline-offset-4 hover:underline transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              All research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
