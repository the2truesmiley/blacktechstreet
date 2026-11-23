import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ASPIRE_INVITATION_ENABLED, ASPIRE_INVITATION_KEY, shouldShowAspireInvitation } from '@/lib/aspireInvitation';
import workshopPhoto from '@/assets/gallery/dec-2025-ai-workshop-full-room.jpg';

export function AspireInvitation() {
  const { pathname, search } = useLocation();
  const [open, setOpen] = useState(false);
  const preview = new URLSearchParams(search).get('aspire-popup') === 'preview';

  useEffect(() => {
    if (pathname !== '/') return;
    let seen = true;
    try {
      seen = localStorage.getItem(ASPIRE_INVITATION_KEY) === '1';
    } catch {
      // If persistence is unavailable, avoid showing a repeatedly appearing popup.
      return;
    }
    if (!shouldShowAspireInvitation(Date.now(), seen, preview || ASPIRE_INVITATION_ENABLED)) return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(ASPIRE_INVITATION_KEY, '1');
      } catch {
        return;
      }
      setOpen(true);
    }, preview ? 300 : 5000);
    return () => window.clearTimeout(timer);
  }, [pathname, preview]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-lg border-border bg-card p-0 gap-0 text-card-foreground motion-reduce:animate-none [&>button]:bg-card [&>button]:text-card-foreground [&>button]:p-2 [&>button]:opacity-100">
        <img src={workshopPhoto} alt="Participants learning together at an ASPIRE AI Workshop in Tulsa" className="w-full h-36 sm:h-48 object-cover" />
        <div className="p-6 sm:p-8 space-y-5">
          <DialogTitle className="font-display text-2xl sm:text-3xl leading-tight tracking-normal pr-2">
            Join the last <span className="text-primary">ASPIRE AI Workshop</span> of 2026
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Finish the year with practical AI skills. Free hands-on training, childcare, and laptop checkout.
          </DialogDescription>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3"><Calendar className="h-4 w-4 shrink-0 text-primary" />Saturday, December 5, 2026</p>
            <p className="flex items-center gap-3"><Clock className="h-4 w-4 shrink-0 text-primary" />10:00 AM to 6:00 PM</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=914+N+Greenwood+Ave,+Tulsa,+OK+74106" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-primary transition-colors">
              <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>Langston Tulsa<span className="block text-muted-foreground mt-1">914 N Greenwood Ave, Tulsa, OK 74106</span></span>
            </a>
          </div>
          <Button asChild size="lg" className="w-full text-base">
            <Link to="/aspire/events/december-2026" onClick={() => setOpen(false)}>Reserve my spot<ArrowRight /></Link>
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setOpen(false)}>Not now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}