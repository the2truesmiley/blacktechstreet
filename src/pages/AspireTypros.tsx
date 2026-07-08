import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, MapPin, Laptop, Baby } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import typrosBadge from '@/assets/typros-badge.png.asset.json';


const TALLY_FORM_ID = 'zxvANM';


export default function AspireTypros() {
  useSEO({
    title: 'TYPROS x Black Tech Street ASPIRE AI Workshop',
    description:
      'TYPROS and Black Tech Street are partnering to help young professionals learn to use AI ethically, strategically, and effectively in the workplace. Register for the August 20, 2026 ASPIRE AI Workshop.',
    canonical: 'https://blacktechstreet.ai/aspire-typros',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shouldReduceMotion = useReducedMotion() ?? false;

  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [iframeKey, setIframeKey] = useState(0);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLoadTimeout = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  }, []);

  const startLoadTimer = useCallback(() => {
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => {
      setLoadStatus((prev) => (prev === 'loading' ? 'error' : prev));
    }, 10000);
  }, [clearLoadTimeout]);

  const handleIframeLoad = useCallback(() => {
    clearLoadTimeout();
    setLoadStatus('loaded');
  }, [clearLoadTimeout]);

  const handleRetry = useCallback(() => {
    clearLoadTimeout();
    setLoadStatus('loading');
    setIframeKey((prev) => prev + 1);
  }, [clearLoadTimeout]);

  useEffect(() => {
    startLoadTimer();
    return () => clearLoadTimeout();
  }, [iframeKey, startLoadTimer, clearLoadTimeout]);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative pt-28 md:pt-32 pb-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-center mb-12"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center justify-center gap-4 md:gap-6 mb-8"
            >
              <img
                src={typrosBadge.url}
                alt="TYPROS logo"
                className="h-16 md:h-20 w-auto"
              />
              <span className="text-2xl md:text-3xl font-light text-muted-foreground">×</span>
              <div className="text-left leading-tight">
                <div className="text-xs md:text-sm uppercase tracking-widest text-primary font-semibold">
                  Black Tech Street
                </div>
                <div className="text-base md:text-lg font-display font-bold">
                  ASPIRE AI Workshop
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-muted-foreground font-medium">
                Now Accepting Registrations
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={2}
              className="text-4xl md:text-6xl font-display font-bold mb-5 tracking-tight leading-[1.05]"
            >
              AI is changing how we work.
              <br />
              <span className="text-primary">Learn to use it well.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              TYPROS and Black Tech Street are partnering to help young professionals better
              understand how AI can be used ethically, strategically, and effectively in the
              workplace.
            </motion.p>
          </motion.div>

          {/* Event details */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: Calendar, label: 'Date', value: 'August 20, 2026' },
              { icon: Clock, label: 'Time', value: '9:00 AM – 5:00 PM' },
              { icon: MapPin, label: 'Location', value: 'Langston Tulsa Campus' },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5 hover:border-primary/50 hover:bg-card/90 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary mb-2 transition-transform group-hover:scale-110" />
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                <div className="font-display font-bold text-lg">{value}</div>
              </motion.div>
            ))}
          </motion.div>


          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-8 mb-10"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
              What you'll take away
            </h2>
            <p className="text-muted-foreground mb-4">
              Through Black Tech Street's ASPIRE training course, participants gain the knowledge
              and confidence to use AI as a tool that enhances their work while aligning with
              organizational values and producing high-quality results through hands-on learning
              and practical application.
            </p>
            <p className="text-muted-foreground">
              Whether you're just getting started or already experimenting with AI, this session
              will give you practical takeaways you can put to work immediately.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {[
                { icon: Laptop, title: 'Laptops available', desc: 'Available for checkout if you need one.' },
                { icon: Baby, title: 'Childcare', desc: 'Available upon request.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-4 hover:border-primary/40 hover:bg-background/60 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{title}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration form */}
          <motion.div
            id="register"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">
              Reserve your seat
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Free to attend. Seats are limited.
            </p>

            <div className="relative rounded-xl overflow-hidden bg-background min-h-[400px]">
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {loadStatus === 'loading' && 'Loading registration form...'}
                {loadStatus === 'error' && 'Registration form failed to load. Retry button available.'}
              </div>

              {loadStatus === 'loading' && (
                <div
                  className="absolute inset-0 z-10 p-6 md:p-8 space-y-4 bg-background"
                  aria-busy="true"
                >
                  <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-96 bg-muted rounded animate-pulse" />
                </div>
              )}

              {loadStatus === 'error' && (
                <div
                  className="relative z-10 p-6 md:p-8 text-center"
                  role="alert"
                >
                  <p className="text-muted-foreground mb-4">
                    The registration form couldn't load. Please check your connection and try again.
                  </p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Retry loading form
                  </button>
                </div>
              )}

              {loadStatus !== 'error' && (
                <iframe
                  key={iframeKey}
                  src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1&formEventsForwarding=1`}
                  width="100%"
                  height="6235"
                  frameBorder={0}
                  loading="lazy"
                  title="ASPIRE AI - TYPROS registration form"
                  name="tally-aspire-typros-registration"
                  onLoad={handleIframeLoad}
                  className={cn(
                    'w-full transition-opacity duration-300',
                    loadStatus === 'loading' ? 'opacity-0' : 'opacity-100'
                  )}
                />
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4">
              If the form above doesn’t load,{' '}
              <a
                href={`https://tally.so/embed/${TALLY_FORM_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                open the registration form in a new tab
              </a>
              .
            </p>


          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
