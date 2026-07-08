import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Calendar, Clock, MapPin, Laptop, Baby } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import typrosBadge from '@/assets/typros-badge.png.asset.json';
import btsLogo from '@/assets/logo_bts_dark_glow.png';


const TALLY_FORM_ID = 'zxvANM';

function useTypewriter(text: string, speed: number = 40, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(text);
      return;
    }
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay, shouldReduceMotion]);

  useEffect(() => {
    if (!started || shouldReduceMotion) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, shouldReduceMotion]);

  return displayed;
}

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  startWhen?: boolean;
}

function CountUp({ to, duration = 2, suffix = '', prefix = '', className, startWhen = true }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState('0');
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (isInView && startWhen) {
      motionValue.set(shouldReduceMotion ? to : 0);
      if (!shouldReduceMotion) {
        motionValue.set(to);
      }
    }
  }, [isInView, startWhen, to, motionValue, shouldReduceMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplay(Math.round(latest).toString());
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

function TypewriterHeading({ text, className }: { text: string; className?: string }) {
  const typed = useTypewriter(text, 45, 800);
  const shouldReduceMotion = useReducedMotion() ?? false;
  return (
    <span className={className}>
      {typed}
      {!shouldReduceMotion && (
        <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-pulse" aria-hidden="true" />
      )}
    </span>
  );
}


export default function AspireTypros() {
  useSEO({
    title: 'Black Tech Street × TYPROS ASPIRE AI Workshop',
    description:
      'Black Tech Street and TYPROS are partnering to help young professionals learn to use AI practically, ethically, and effectively in the workplace. Register for the free August 20, 2026 ASPIRE AI Workshop.',
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 55,
        damping: 22,
        mass: 1,
        delay: i * 0.12,
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
              className="flex flex-col items-center gap-3 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
                <img
                  src={btsLogo}
                  alt="Black Tech Street logo"
                  className="h-24 sm:h-28 md:h-40 w-auto"
                />
                <span className="text-2xl sm:text-3xl md:text-5xl font-light text-muted-foreground">×</span>
                <img
                  src={typrosBadge.url}
                  alt="TYPROS logo"
                  className="h-16 sm:h-20 md:h-28 w-auto"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="flex flex-col sm:flex-row items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-[11px] md:text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Free Training
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.28em] text-muted-foreground font-medium">
                Now Accepting Registrations
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="mb-5"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-[1.05]">
                <TypewriterHeading text="AI is changing how we work." />
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, type: 'spring' as const, stiffness: 55, damping: 22 }}
                  className="text-primary"
                >
                  Learn to use it well.
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              TYPROS and Black Tech Street are partnering to help young professionals better
              understand how AI can be used practically, ethically, and effectively in the
              workplace.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 mb-2">
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Reserve your free seat
              </a>
            </motion.div>
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

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring' as const, stiffness: 55, damping: 22, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-6 text-center">
              <div className="text-5xl md:text-7xl font-display font-bold text-primary mb-1">
                <CountUp to={8} suffix="" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Hours of hands-on training</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-6 text-center">
              <div className="text-5xl md:text-7xl font-display font-bold text-primary mb-1">
                <CountUp to={1} suffix="" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Day intensive workshop</div>
            </div>
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
              Reserve your free seat
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

          {/* Black Tech Street brand closer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center gap-4 mt-16 text-center"
          >
            <img
              src={btsLogo}
              alt="Black Tech Street logo"
              className="h-20 md:h-28 w-auto opacity-90"
            />
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground font-medium">
              Powered by Black Tech Street
            </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
