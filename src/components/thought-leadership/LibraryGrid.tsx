import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  filterLibrary,
  formatPaperDate,
  isExternalHref,
  placeholderCount,
  sortByNewest,
  visibleFilters,
  type LibraryFilterLabel,
  type LibraryItem,
} from '@/data/thoughtLeadership';
import { cn } from '@/lib/utils';
import { focusRing, headingMd, headingSm } from './styles';

const cardBase =
  'flex h-full flex-col rounded-2xl border p-6 transition duration-200 ease-out motion-reduce:transition-none';

function LibraryCard({ item }: { item: LibraryItem }) {
  const external = isExternalHref(item.href);
  const inner = (
    <>
      <span className="self-start inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-4">
        {item.type}
      </span>
      <h3 className={`${headingSm} text-lg group-hover:text-primary transition-colors mb-2`}>{item.title}</h3>
      <p className="text-sm text-foreground/80">{item.author}</p>
      <p className="text-sm text-muted-foreground mb-4">
        <time dateTime={item.date}>{formatPaperDate(item.date)}</time>
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground mb-6">{item.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Read {item.type.toLowerCase()}
        {external ? (
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        )}
      </span>
    </>
  );

  const className = cn(
    cardBase,
    'group border-border bg-card hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_32px_-16px_hsl(var(--primary)/0.35)]',
    focusRing
  );

  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link to={item.href} className={className}>
      {inner}
    </Link>
  );
}

function ComingSoonCard() {
  return (
    <div
      className={cn(
        cardBase,
        'min-h-[220px] items-center justify-center border-dashed border-border/70 bg-card/30 text-center'
      )}
    >
      <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground mb-3">
        Coming soon
      </span>
      <div aria-hidden="true" className="w-24 space-y-2">
        <div className="h-2 rounded-full bg-muted" />
        <div className="h-2 w-2/3 mx-auto rounded-full bg-muted" />
      </div>
    </div>
  );
}

export function LibraryGrid({ items }: { items: LibraryItem[] }) {
  const filters = visibleFilters(items);
  const [active, setActive] = useState<LibraryFilterLabel>('All');
  const shown = sortByNewest(filterLibrary(items, active));
  const empty = placeholderCount(shown.length);

  return (
    <section aria-labelledby="more-from-our-team" className="mt-16 md:mt-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
        <h2 id="more-from-our-team" className={headingMd}>
          More from our team
        </h2>
        {filters.length > 1 && (
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            {filters.map((label) => {
              const on = label === active;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(label)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    on
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground',
                    focusRing
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.href}>
            <LibraryCard item={item} />
          </li>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <li key={`coming-soon-${i}`}>
            <ComingSoonCard />
          </li>
        ))}
      </ul>

      {empty > 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">More research and perspectives coming soon.</p>
      )}
    </section>
  );
}
