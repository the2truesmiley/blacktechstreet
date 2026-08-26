import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import type { AspireEvent } from '@/data/aspireEvents';

interface RegistrationModalProps {
  event: AspireEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_HEIGHT = 3200;

export function RegistrationModal({ event, isOpen, onClose }: RegistrationModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);

  // Tally forwards its content height via postMessage when dynamicHeight=1.
  useEffect(() => {
    if (!isOpen) return;
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string' || !e.data.includes('Tally.')) return;
      try {
        const data = JSON.parse(e.data);
        const h = Number(data?.payload?.height);
        if (h && Number.isFinite(h)) setHeight(Math.max(h + 40, 600));
      } catch {
        /* ignore non-JSON messages */
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setHeight(FALLBACK_HEIGHT);
  }, [isOpen]);

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[92vh] w-[calc(100vw-1rem)] sm:w-full overflow-hidden p-0 flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border/40 shrink-0 text-left">
          <DialogTitle className="text-base sm:text-xl font-display pr-8">
            Register for {format(event.date, 'MMMM d, yyyy')}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {event.title} at {event.locationFull}
          </DialogDescription>
          <a
            href={event.directRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            Having trouble? Open the full registration form
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain -webkit-overflow-scrolling-touch">
          <iframe
            ref={iframeRef}
            src={`${event.registrationUrl}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            width="100%"
            height={height}
            frameBorder="0"
            title={`Registration for ${format(event.date, 'MMMM yyyy')} ASPIRE Workshop`}
            className="w-full block"
            style={{ height }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
