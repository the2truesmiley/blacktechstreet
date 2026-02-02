import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format, differenceInDays, differenceInHours, differenceInMinutes, isPast } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { aspireEvents2026, type AspireEvent } from '@/data/aspireEvents';

interface NextEventHeroProps {
  onRegister: (event: AspireEvent) => void;
}

export function NextEventHero({ onRegister }: NextEventHeroProps) {
  const now = new Date();
  
  // Find the next upcoming event
  const { nextEvent, upcomingEvents, pastEvents } = useMemo(() => {
    const sorted = [...aspireEvents2026].sort((a, b) => a.date.getTime() - b.date.getTime());
    const upcoming = sorted.filter(e => !isPast(e.date));
    const past = sorted.filter(e => isPast(e.date));
    
    return {
      nextEvent: upcoming[0] || null,
      upcomingEvents: upcoming.slice(1),
      pastEvents: past
    };
  }, []);

  // Calculate countdown
  const countdown = useMemo(() => {
    if (!nextEvent) return null;
    
    const days = differenceInDays(nextEvent.date, now);
    const hours = differenceInHours(nextEvent.date, now) % 24;
    const minutes = differenceInMinutes(nextEvent.date, now) % 60;
    
    return { days, hours, minutes };
  }, [nextEvent, now]);

  if (!nextEvent) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">All 2026 workshops have concluded. Stay tuned for 2027!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Next Event - Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-primary/20 via-card to-card",
          "border border-primary/30",
          "p-6 md:p-10"
        )}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next Workshop
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Event Info */}
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-display font-bold">
                {format(nextEvent.date, 'MMMM d, yyyy')}
              </h3>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{format(nextEvent.date, 'EEEE')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{nextEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{nextEvent.locationFull}</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="mt-4 group"
                onClick={() => onRegister(nextEvent)}
              >
                Register Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="flex justify-center md:justify-end gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-display font-bold text-primary">{countdown.days}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">Days</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-display font-bold text-primary">{countdown.hours}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">Hours</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-display font-bold text-primary">{countdown.minutes}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">Minutes</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Other Upcoming Dates */}
      {upcomingEvents.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-display font-semibold text-muted-foreground">Also Coming Up</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                onClick={() => onRegister(event)}
                className={cn(
                  "p-4 rounded-xl text-left",
                  "bg-card/50 border border-border/40",
                  "hover:border-primary/40 hover:bg-card transition-all duration-200",
                  "group"
                )}
              >
                <div className="font-display font-semibold text-lg">
                  {format(event.date, 'MMM d')}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(event.date, 'EEEE')}
                </div>
                <div className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Register →
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
