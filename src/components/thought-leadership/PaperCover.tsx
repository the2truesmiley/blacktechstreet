import { cn } from '@/lib/utils';
import logoCircuit from '@/assets/logo_b_circuit.png';
import type { Paper } from '@/data/thoughtLeadership';

/** Typeset "cover page" for a paper, drawn in CSS so it stays crisp at any size. */
export function PaperCover({ paper, className, size = 'lg' }: { paper: Paper; className?: string; size?: 'sm' | 'lg' }) {
  const sm = size === 'sm';
  return (
    <div
      className={cn(
        'relative aspect-[8.5/11] w-full rounded-lg overflow-hidden',
        'bg-card border border-border/60 shadow-2xl shadow-primary/10',
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
      <div className="relative h-full flex flex-col p-[9%]">
        <div className="flex items-center gap-2">
          <img src={logoCircuit} alt="" className="w-7 h-7 object-contain" />
          <span className="font-display text-[11px] font-semibold tracking-wide text-muted-foreground">
            Black Tech Street
          </span>
        </div>

        <div className={cn('my-auto', sm ? 'pt-3' : 'pt-8')}>
          <p className={cn('font-display font-bold leading-[1.05] text-foreground', sm ? 'text-2xl' : 'text-4xl')}>
            Value<span className="text-primary">-</span>Native AI
          </p>
          <div className={cn('w-12 h-0.5 bg-primary', sm ? 'my-2.5' : 'my-4')} />
          <p className={cn('leading-snug text-muted-foreground', sm ? 'text-[11px]' : 'text-[13px]')}>
            Infrastructure for Creating, Identifying, and Capturing Value in the Age of AI
          </p>
        </div>

        <div className="border-t border-border/60 pt-3">
          <p className="text-[12px] font-semibold text-foreground">{paper.author}</p>
          <p className="text-[11px] text-muted-foreground">
            {paper.publisher} · {paper.publishedDate.slice(0, 4)}
          </p>
        </div>
      </div>
    </div>
  );
}
