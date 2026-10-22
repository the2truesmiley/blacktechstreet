import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { Paper } from '@/data/thoughtLeadership';
import { apaCitation, apaCitationParts } from './citation';
import { focusRing, headingSm } from './styles';

export function CiteThisWork({ paper }: { paper: Paper }) {
  const citation = apaCitation(paper);
  const { text, url } = apaCitationParts(paper);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the citation text stays selectable */
    }
  };

  return (
    <section aria-labelledby="cite-this-work" className="mt-8 rounded-2xl border border-border p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="cite-this-work" className={headingSm}>
          Cite this work
        </h2>
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-sm font-medium text-foreground hover:border-primary/60 transition-colors ${focusRing}`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4" aria-hidden="true" />
          )}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy citation'}</span>
        </button>
      </div>
      <p className="font-mono text-[13px] leading-relaxed text-muted-foreground break-words rounded-lg bg-primary/[0.04] border border-border/60 shadow-[inset_0_1px_2px_hsl(var(--background)/0.6)] px-4 py-3.5 md:px-5 md:py-4">
        {text}{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-sm underline-offset-2 hover:underline hover:text-foreground ${focusRing}`}
        >
          {url}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
