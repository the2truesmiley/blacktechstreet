import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StickyRegisterBarProps {
  to: string;
  label?: string;
  subLabel?: string;
  /** Scroll offset (px) after which the bar appears */
  showAfter?: number;
}

export function StickyRegisterBar({
  to,
  label = 'Reserve my free spot',
  subLabel,
  showAfter = 600,
}: StickyRegisterBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > showAfter);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 md:hidden',
        'border-t border-primary/25 bg-background/95 backdrop-blur-md',
        'px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3',
        'transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <Link
        to={to}
        tabIndex={visible ? 0 : -1}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground"
      >
        {label}
        <ArrowRight className="h-5 w-5" />
      </Link>
      {subLabel && (
        <p className="mt-2 text-center text-xs text-muted-foreground">{subLabel}</p>
      )}
    </div>
  );
}
