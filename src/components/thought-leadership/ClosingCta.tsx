import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { focusRing, headingMd } from './styles';

export function ClosingCta() {
  return (
    <section aria-labelledby="bring-this-research" className="relative z-10 max-w-5xl mx-auto px-5">
      <div className="relative border-t border-border py-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-40 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.08),transparent)]"
        />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 id="bring-this-research" className={`${headingMd} mb-2`}>
              Bring this research to your organization
            </h2>
            <p className="text-muted-foreground max-w-[60ch]">
              We partner with companies, institutions, and public agencies to put these frameworks to work.
            </p>
          </div>
          <Link
            to="/contact"
            className={`inline-flex w-full md:w-auto shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${focusRing}`}
          >
            Get in touch
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
