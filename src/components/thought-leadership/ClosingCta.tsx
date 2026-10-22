import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { focusRing } from './styles';

export function ClosingCta() {
  return (
    <section aria-labelledby="bring-this-research" className="relative z-10 border-t border-border">
      <div className="max-w-5xl mx-auto px-5 py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2
            id="bring-this-research"
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2"
          >
            Bring this research to your organization
          </h2>
          <p className="text-muted-foreground max-w-[60ch]">
            We partner with companies, institutions, and public agencies to put these frameworks to work.
          </p>
        </div>
        <Link
          to="/contact"
          className={`inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${focusRing}`}
        >
          Get in touch
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
