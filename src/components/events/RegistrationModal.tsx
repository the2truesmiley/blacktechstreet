import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import type { AspireEvent } from '@/data/aspireEvents';

interface RegistrationModalProps {
  event: AspireEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ event, isOpen, onClose }: RegistrationModalProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border/40 shrink-0">
          <DialogTitle className="text-xl font-display">
            Register for {format(event.date, 'MMMM d, yyyy')}
          </DialogTitle>
          <DialogDescription>
            {event.title} at {event.locationFull}
          </DialogDescription>
          <a
            href={event.directRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Having trouble? Open the full registration form
            <ExternalLink className="w-4 h-4" />
          </a>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <iframe
            src={`${event.registrationUrl}?alignLeft=1&hideTitle=1&transparentBackground=1`}
            width="100%"
            height="1800"
            frameBorder="0"
            title={`Registration for ${format(event.date, 'MMMM yyyy')} ASPIRE Workshop`}
            className="w-full block h-[1800px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
