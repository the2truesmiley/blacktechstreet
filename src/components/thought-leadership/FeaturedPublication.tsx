import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { paperPath, formatPaperDate, type Paper } from '@/data/thoughtLeadership';
import { FeaturedCover } from './FeaturedCover';
import { authorInitials } from './citation';
import { eyebrow, focusRing, headingLg } from './styles';

export function FeaturedPublication({ paper }: { paper: Paper }) {
  const chips = ['Research Paper', paper.publisher, paper.publishedDate.slice(0, 4)];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      aria-labelledby={`featured-${paper.slug}`}
      className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-background p-6 sm:p-8 lg:p-12 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]"
    >
      <div className="grid gap-8 md:gap-10 md:grid-cols-[38fr_62fr] md:items-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.08),transparent)]"
          />
          <FeaturedCover paper={paper} className="relative max-w-[260px] md:max-w-[320px] mx-auto md:mx-0" />
        </div>

        <div>
          <p className={`${eyebrow} mb-4`}>Featured paper</p>
          <ul className="flex flex-wrap gap-2 mb-5" aria-label="Publication details">
            {chips.map((c) => (
              <li
                key={c}
                className="px-2.5 py-1 rounded-full border border-border text-xs font-medium text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>

          <h2 id={`featured-${paper.slug}`} className={`${headingLg} mb-5`}>
            <Link to={paperPath(paper.slug)} className={`rounded-sm hover:text-primary transition-colors ${focusRing}`}>
              {paper.title}
            </Link>
          </h2>

          <div className="flex items-center gap-3 mb-2">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary text-xs font-semibold font-display"
            >
              {authorInitials(paper.author)}
            </span>
            <p className="text-sm text-foreground">
              {paper.author}, <span className="text-muted-foreground">{paper.authorTitle}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Published <time dateTime={paper.publishedDate}>{formatPaperDate(paper.publishedDate)}</time>
          </p>

          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground max-w-[65ch] mb-8">{paper.summary}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={paperPath(paper.slug)}
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${focusRing}`}
            >
              Read the paper
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={paper.pdfHostedLocally ? '' : undefined}
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/60 transition-colors ${focusRing}`}
            >
              Download PDF
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
