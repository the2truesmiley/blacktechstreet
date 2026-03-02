import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FlipClock } from '@/components/events/FlipClock';
import { aspireEvents2026 } from '@/data/aspireEvents';
import { isPast } from 'date-fns';
import { useMemo } from 'react';

export function AspireCtaBanner() {
  const nextEvent = useMemo(() => {
    return aspireEvents2026
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .find(e => !isPast(e.date)) || null;
  }, []);

  if (!nextEvent) return null;

  return (
    <section className="relative z-10 px-5 max-w-5xl mx-auto -mt-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Pulsing border glow wrapper */}
        <motion.div
          className="rounded-2xl p-[1px]"
          animate={{
            boxShadow: [
              '0 0 10px 1px hsl(var(--primary) / 0.2)',
              '0 0 30px 6px hsl(var(--primary) / 0.45)',
              '0 0 10px 1px hsl(var(--primary) / 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Link to="/aspire/events" className="block group">
            <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-background/90 backdrop-blur-md hover:border-primary/70 transition-colors duration-300">

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">

                  {/* ── Left: headline + details ── */}
                  <div className="flex-1 space-y-4">
                    {/* Badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/30"
                      animate={{
                        boxShadow: [
                          '0 0 0px hsl(var(--primary) / 0)',
                          '0 0 12px hsl(var(--primary) / 0.4)',
                          '0 0 0px hsl(var(--primary) / 0)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      Registration Open
                    </motion.div>

                    {/* Bold headline */}
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
                      Your next step starts{' '}
                      <span className="text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)]">
                        March&nbsp;28th
                      </span>
                    </h3>

                    <p className="text-muted-foreground text-sm max-w-sm">
                      ASPIRE AI Workshop. A free, full-day AI training experience open to the community.
                    </p>

                    {/* Event details */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        March 28, 2026
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        10:00 AM – 6:00 PM
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        Langston Tulsa
                      </span>
                    </div>
                  </div>

                  {/* ── Right: FlipClock + CTA button ── */}
                  <div className="flex flex-col items-center gap-5 lg:items-end w-full lg:w-auto">
                    {/* FlipClock */}
                    <div className="scale-90 sm:scale-100 origin-center">
                      <FlipClock targetDate={nextEvent.date} />
                    </div>

                    {/* Big register button */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 10px hsl(var(--primary) / 0.25)',
                          '0 0 24px hsl(var(--primary) / 0.55)',
                          '0 0 10px hsl(var(--primary) / 0.25)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-full w-full lg:w-auto"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="relative overflow-hidden inline-flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base">
                        {/* Shimmer */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                        />
                        <span className="relative flex items-center gap-2">
                          Register Free
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </span>
                      </span>
                    </motion.div>
                  </div>

                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
