import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { paperPath, formatPaperDate, type Paper } from '@/data/thoughtLeadership';
import { focusRing, headingMd } from './styles';

/** Rendered only when there is more than one publication. */
export function PublicationList({ papers }: { papers: Paper[] }) {
  if (papers.length < 2) return null;

  return (
    <section aria-labelledby="all-publications" className="mt-10 md:mt-12">
      <h2 id="all-publications" className={`${headingMd} mb-6`}>
        All publications
      </h2>
      <ul className="border-t border-border">
        {papers.map((p) => (
          <li key={p.slug} className="border-b border-border">
            <Link
              to={paperPath(p.slug)}
              className={`group grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_auto] gap-x-6 gap-y-1 items-center px-3 py-5 -mx-3 rounded-lg hover:bg-card/60 transition-colors ${focusRing}`}
            >
              <p className="text-sm text-muted-foreground col-span-2 md:col-span-1">
                <time dateTime={p.publishedDate}>{formatPaperDate(p.publishedDate)}</time>
                <span className="block">Research Paper</span>
              </p>
              <div>
                <p className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {p.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{p.author}</p>
              </div>
              <ArrowRight
                className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
