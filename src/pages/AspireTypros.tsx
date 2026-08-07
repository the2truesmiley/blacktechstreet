import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Calendar, Clock, MapPin, Laptop, Baby, ExternalLink } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';
import typrosBadge from '@/assets/typros-badge.png';
import btsLogo from '@/assets/logo_bts_dark_glow.png';


const TALLY_FORM_URL = 'https://tally.so/r/zxvANM';

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
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView || !startWhen) return;
    if (shouldReduceMotion) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, startWhen, to, duration, shouldReduceMotion]);

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

  const shouldReduceMotion = useReducedMotion() ?? false;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Scroll progress */}
      <div
        className="fixed top-16 md:top-20 left-0 right-0 h-1 bg-muted/30 z-40"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <main className="relative pt-16 md:pt-20 pb-20 px-5">
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
                <span className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground">×</span>
                <img
                  src={typrosBadge}
                  alt="TYPROS logo"
                  className="h-16 sm:h-20 md:h-28 w-auto"
                />
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight uppercase text-foreground/90 mt-2">
                ASPIRE Enterprise Workshop
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-primary font-medium">
                Now Accepting Registrations
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="mb-5"
            >
              <h2 className="text-xl md:text-3xl font-display font-bold tracking-tight leading-[1.05]">
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
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base md:text-lg text-foreground max-w-2xl mx-auto"
            >
              TYPROS and Black Tech Street are partnering to help young professionals better
              understand how AI can be used practically, ethically, and effectively in the
              workplace.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 mb-3">
              <span className="inline-flex items-center justify-center rounded-full bg-foreground border border-primary/20 px-7 py-3.5 w-64 text-sm font-semibold text-primary">
                Free Training
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="mb-2">
              <a
                href={TALLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 w-64 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Reserve your seat
                <ExternalLink className="w-4 h-4" />
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
                <div className="text-xs uppercase tracking-wider text-foreground mb-1">{label}</div>
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
              <div className="text-xs uppercase tracking-wider text-foreground">Hours of hands-on training</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-6 text-center">
              <div className="text-5xl md:text-7xl font-display font-bold text-primary mb-1">
                <CountUp to={1} suffix="" />
              </div>
              <div className="text-xs uppercase tracking-wider text-foreground">Day intensive workshop</div>
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
            <p className="text-foreground mb-4">
              Through Black Tech Street's ASPIRE training course, participants gain the knowledge
              and confidence to use AI as a tool that enhances their work while aligning with
              organizational values and producing high-quality results through hands-on learning
              and practical application.
            </p>
            <p className="text-foreground">
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
                    <div className="text-xs text-foreground">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration CTA */}
          <motion.div
            id="register"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Reserve your seat
            </h2>
            <p className="text-sm text-foreground mb-8 max-w-md mx-auto">
              Seats are limited. Complete your free registration on Tally in a new tab and we'll see you at the ASPIRE AI Workshop on August 20, 2026.
            </p>

            <a
              href={TALLY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Register on Tally
              <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-xs text-foreground mt-5">
              You'll be redirected to{' '}
              <span className="text-primary">{TALLY_FORM_URL}</span>
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
            <p className="text-xs uppercase tracking-[0.28em] text-foreground font-medium">
              Powered by Black Tech Street
            </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
