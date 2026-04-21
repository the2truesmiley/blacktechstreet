import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { Button } from '@/components/ui/button';
import { aspireEvents2026 } from '@/data/aspireEvents';
import { useSEO } from '@/hooks/useSEO';

export default function AspireEventApril2026() {
  useSEO({
    title: 'ASPIRE April 2026 Workshop (Concluded) | Black Tech Street',
    description:
      'The April 18, 2026 ASPIRE AI Workshop has concluded. View upcoming free AI workshops in Tulsa from Black Tech Street.',
    canonical: 'https://blacktechstreet.ai/aspire/events/april-2026',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Tell search engines not to index this past-event landing page
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const nextEvent = useMemo(() => {
    return (
      [...aspireEvents2026]
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .find((e) => !isPast(e.date)) || null
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative pt-32 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-8 md:p-12 text-center"
          >
            {/* Concluded badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider border border-border mb-6">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Workshop Concluded
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              The April 18, 2026 ASPIRE Workshop has wrapped.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Thank you to everyone who joined us at Langston University for a full day of
              hands-on AI training. Photos and highlights from the session will be shared soon.
            </p>

            {/* Next event card */}
            {nextEvent ? (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-left">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Next ASPIRE Workshop
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  {format(nextEvent.date, 'MMMM d, yyyy')}
                </h2>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {format(nextEvent.date, 'EEEE')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {nextEvent.time.replace('-', '–')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {nextEvent.locationFull}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1">
                    <Link to="/aspire/events">
                      View &amp; Register
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <Link to="/aspire">Learn About ASPIRE</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <Button asChild size="lg">
                <Link to="/aspire/events">
                  View Upcoming Workshops
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
