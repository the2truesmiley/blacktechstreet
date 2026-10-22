import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ExternalLink, Share2 } from 'lucide-react';
import { paperPath, formatPaperDate, featuredSummaries, type Paper } from '@/data/thoughtLeadership';
import { FeaturedCover } from './FeaturedCover';
import tyranceHeadshot from '@/assets/team/tyrance-headshot.png';
import { eyebrow, focusRing, headingLg } from './styles';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers that block the async clipboard API.
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  }
}

export function FeaturedPublication({ paper }: { paper: Paper }) {
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const share = async () => {
    const ok = await copyText(window.location.href);
    setShareState(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShareState('idle'), 2200);
  };

  const summary = featuredSummaries[paper.slug] ?? paper.summary;

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
          <FeaturedCover paper={paper} className="relative max-w-[240px] md:max-w-[300px] mx-auto md:mx-0" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <p className={eyebrow}>Featured paper</p>
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Published on {paper.publisher}
            </span>
          </div>

          <h2 id={`featured-${paper.slug}`} className={`${headingLg} mb-5`}>
            <Link to={paperPath(paper.slug)} className={`rounded-sm hover:text-primary transition-colors ${focusRing}`}>
              {paper.title}
            </Link>
          </h2>

          <div className="flex items-center gap-3 mb-2">
            <img
              src={tyranceHeadshot}
              alt={`Headshot of ${paper.author}`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-primary/40"
            />
            <p className="text-sm text-foreground">
              {paper.author}, <span className="text-muted-foreground">{paper.authorTitle}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Published <time dateTime={paper.publishedDate}>{formatPaperDate(paper.publishedDate)}</time>
          </p>

          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground max-w-[65ch] mb-8">{summary}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={paper.ssrnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ${focusRing}`}
            >
              Read the Paper
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">(opens SSRN in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={share}
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/60 transition-colors ${focusRing}`}
            >
              {shareState === 'copied' ? (
                <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              ) : (
                <Share2 className="w-4 h-4" aria-hidden="true" />
              )}
              <span aria-live="polite">
                {shareState === 'copied' ? 'Link copied' : shareState === 'failed' ? 'Copy failed' : 'Share'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
