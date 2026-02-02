import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-display">
            Register for {format(event.date, 'MMMM d, yyyy')}
          </DialogTitle>
          <DialogDescription>
            {event.title} at {event.locationFull}
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-[600px] overflow-auto">
          <iframe
            src={`${event.registrationUrl}?alignLeft=1&hideTitle=1&transparentBackground=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            title={`Registration for ${format(event.date, 'MMMM yyyy')} ASPIRE Workshop`}
            className="min-h-[600px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
