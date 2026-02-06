import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { FlipClock } from './FlipClock';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { aspireEvents2026, type AspireEvent } from '@/data/aspireEvents';

interface NextEventHeroProps {
  onRegister: (event: AspireEvent) => void;
}

// Floating sparkle effect
function FloatingSparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Sparkles className="w-3 h-3 text-primary/40" />
        </motion.div>
      ))}
    </div>
  );
}

export function NextEventHero({ onRegister }: NextEventHeroProps) {
  
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

  if (!nextEvent) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground">All 2026 workshops have concluded. Stay tuned for 2027!</p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  } as const;

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Next Event - Hero Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-primary/20 via-card to-card",
          "border border-primary/30",
          "p-6 md:p-10"
        )}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Decorative glow */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingSparkles />
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next Workshop
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
              Join Our Next ASPIRE AI Workshop!
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Event Info */}
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.h3 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-display font-bold"
              >
                {format(nextEvent.date, 'MMMM d, yyyy')}
              </motion.h3>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-3"
              >
                {[
                  { icon: Calendar, text: format(nextEvent.date, 'EEEE') },
                  { icon: Clock, text: nextEvent.time },
                  { icon: MapPin, text: nextEvent.locationFull },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-3"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-lg md:text-xl font-medium text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  className="mt-4 group relative overflow-hidden"
                  onClick={() => onRegister(nextEvent)}
                >
                  <motion.span
                    className="absolute inset-0 bg-primary-foreground/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Countdown with Flip Clock */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center md:justify-end"
            >
              <FlipClock targetDate={nextEvent.date} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Other Upcoming Dates */}
      {upcomingEvents.length > 0 && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Section Header */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h4 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest">
              Also Coming Up in 2026
            </h4>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {upcomingEvents.map((event, index) => (
              <motion.button
                key={event.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -6,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRegister(event)}
                className={cn(
                  "relative overflow-hidden rounded-xl text-left",
                  "bg-gradient-to-br from-card via-card to-card/80",
                  "border border-border/50",
                  "hover:border-primary/50 transition-all duration-300",
                  "group shadow-lg shadow-black/5"
                )}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.15), transparent 70%)",
                  }}
                />
                
                <div className="relative p-5">
                  {/* Month badge */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                      {format(event.date, 'MMMM')}
                    </span>
                    <Calendar className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                  </div>
                  
                  {/* Date - Large */}
                  <div className="mb-2">
                    <span className="text-4xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {format(event.date, 'd')}
                    </span>
                  </div>
                  
                  {/* Day of week */}
                  <div className="text-sm text-muted-foreground font-medium mb-4">
                    {format(event.date, 'EEEE')}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">
                      {event.time.split(' - ')[0]}
                    </span>
                    <motion.div 
                      className="flex items-center gap-1.5 text-sm font-medium text-primary"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">Register</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
