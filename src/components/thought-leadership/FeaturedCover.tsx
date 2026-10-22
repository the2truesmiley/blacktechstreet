import { Link } from 'react-router-dom';
import logoCircuit from '@/assets/logo_b_circuit.png';
import { paperPath, type Paper } from '@/data/thoughtLeadership';
import { cn } from '@/lib/utils';

/** Two-tone editorial cover for the featured publication. The whole cover links to the paper. */
export function FeaturedCover({ paper, className }: { paper: Paper; className?: string }) {
  const [head, ...rest] = paper.shortTitle.split('-');
  const subtitle = paper.title.includes(':') ? paper.title.slice(paper.title.indexOf(':') + 1).trim() : '';

  return (
    <Link
      to={paperPath(paper.slug)}
      aria-label={`Read ${paper.shortTitle}`}
      className={cn(
        'group block w-full rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        className
      )}
    >
      <div
        className={cn(
          'relative aspect-[3/4] w-full overflow-hidden rounded-xl',
          'bg-background border border-border',
          'shadow-[0_24px_48px_-16px_hsl(var(--background)/0.9),0_8px_24px_-12px_hsl(var(--primary)/0.25)]',
          'transition-transform duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none'
        )}
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-primary" />
        <div className="relative h-full flex flex-col p-[10%]">
          <div className="flex items-center gap-2">
            <img src={logoCircuit} alt="" width={24} height={24} className="w-6 h-6 object-contain" />
            <span className="font-display text-[11px] font-semibold tracking-wide text-muted-foreground">
              Black Tech Street
            </span>
          </div>

          <div className="my-auto">
            <p className="font-display font-bold tracking-tight leading-[1.02] text-foreground text-[clamp(1.75rem,3.2vw,2.5rem)]">
              {rest.length ? (
                <>
                  {head}
                  <span className="text-primary">-</span>
                  {rest.join('-')}
                </>
              ) : (
                paper.shortTitle
              )}
            </p>
            {subtitle && (
              <>
                <div className="w-10 h-px bg-primary my-4" />
                <p className="text-[12px] leading-snug text-muted-foreground">{subtitle}</p>
              </>
            )}
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-[12px] font-semibold text-foreground">{paper.author}</p>
            <p className="text-[11px] text-muted-foreground">
              {paper.publisher} · {paper.publishedDate.slice(0, 4)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
