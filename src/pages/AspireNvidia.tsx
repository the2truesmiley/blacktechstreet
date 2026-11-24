import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Laptop,
  Check,
  Sparkles,
  Search,
  Repeat,
  Gauge,
  Share2,
  Megaphone,
  Eye,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { EventJsonLd } from '@/components/seo/EventJsonLd';
import { useSEO } from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import btsLogo from '@/assets/logo_bts_dark_glow.png';
import nvidiaLogo from '@/assets/nvidia-logo.png';
import tyranceHeadshot from '@/assets/team/tyrance-headshot.png';
import michaelHeadshot from '@/assets/team/michael-boone-headshot.png';

/**
 * Drop the Tally form ID here when registration opens.
 * Leaving it empty renders the "registration opens soon" placeholder.
 */
const TALLY_FORM_ID = '';

/**
 * The protected workshop content is NOT bundled with the site. It lives in the
 * nvidia-access edge function and is only returned after the server validates
 * an access token issued for the correct password.
 */
interface WorkshopContent {
  seo: { title: string; description: string };
  hero: {
    heading: string;
    status: string;
    taglineLead: string;
    taglineAccent: string;
    subcopy: string;
    calloutTitle: string;
    calloutBody: string;
    cta: string;
  };
  facts: { icon: string; label: string; value: string }[];
  laptopNote: string;
  leads: { name: string; title: string; org: string; role: string; imageKey: string }[];
  runOfShow: { time: string; title: string; lead: string; points: string[] }[];
  exercisesIntro: string;
  exercises: { icon: string; n: string; title: string; duration: string; desc: string }[];
  takeaways: string[];
  registration: {
    heading: string;
    subcopy: string;
    successHeading: string;
    successSubcopy: string;
    successBody: string;
    placeholderHeading: string;
    placeholderBody: string;
  };
  eventJsonLd: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    locationName: string;
    locationAddress: string;
  };
}

const factIcons: Record<string, LucideIcon> = {
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
};

const exerciseIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  search: Search,
  repeat: Repeat,
  gauge: Gauge,
  share: Share2,
};

const leadImages: Record<string, string> = {
  michael: michaelHeadshot,
  tyrance: tyranceHeadshot,
};

const ACCESS_STORAGE_KEY = 'aspire-nvidia-access-token';

async function requestAccessToken(password: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('nvidia-access', {
    body: { password },
  });
  if (error) {
    const details =
      error instanceof FunctionsHttpError ? await error.context.text() : error.message;
    console.error('nvidia-access failed:', details);
    throw new Error('incorrect');
  }
  if (!data?.token) throw new Error('incorrect');
  return data.token as string;
}

async function fetchWorkshopContent(token: string): Promise<WorkshopContent | null> {
  const { data, error } = await supabase.functions.invoke('nvidia-access', {
    body: { action: 'content', token },
  });
  if (error || !data?.content) return null;
  return data.content as WorkshopContent;
}

function PasswordGate({ onUnlock }: { onUnlock: (token: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const token = await requestAccessToken(value.trim());
      sessionStorage.setItem(ACCESS_STORAGE_KEY, token);
      onUnlock(token);
    } catch {
      setError('Incorrect password. Try again.');
      setValue('');
      inputRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <TechBackground isVisible={true} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border/50 bg-card/80 backdrop-blur p-8 text-center">
        <img src={btsLogo} alt="Black Tech Street" className="h-16 mx-auto mb-6 object-contain" />
        <h1 className="font-display text-xl mb-2">Protected page</h1>
        <p className="text-sm text-foreground/80 mb-6">Enter the access password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="access-password" className="sr-only">Access password</label>
          <div className="relative">
            <input
              id="access-password"
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(null); }}
              placeholder="Password"
              maxLength={128}
              aria-invalid={!!error}
              aria-describedby={error ? 'access-password-error' : undefined}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-11 text-center text-foreground outline-none focus:border-primary aria-[invalid=true]:border-destructive"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground/60 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {error && (
            <p id="access-password-error" role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || value.trim().length === 0}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AspireNvidiaPage() {
  const [status, setStatus] = useState<'checking' | 'locked' | 'unlocked'>('checking');
  const [content, setContent] = useState<WorkshopContent | null>(null);

  const unlockWithToken = useCallback(async (token: string) => {
    const fetched = await fetchWorkshopContent(token);
    if (!fetched) {
      sessionStorage.removeItem(ACCESS_STORAGE_KEY);
      setStatus('locked');
      return;
    }
    setContent(fetched);
    setStatus('unlocked');
  }, []);

  useEffect(() => {
    let active = true;
    const token = sessionStorage.getItem(ACCESS_STORAGE_KEY);
    if (!token) {
      setStatus('locked');
      return;
    }
    fetchWorkshopContent(token).then((fetched) => {
      if (!active) return;
      if (!fetched) {
        sessionStorage.removeItem(ACCESS_STORAGE_KEY);
        setStatus('locked');
        return;
      }
      setContent(fetched);
      setStatus('unlocked');
    });
    return () => {
      active = false;
    };
  }, []);

  // Keep this page out of search results regardless of gate state.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  if (status === 'checking') {
    return (
      <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <TechBackground isVisible={true} />
        <p className="relative z-10 text-sm text-foreground/70">Checking access…</p>
      </div>
    );
  }

  if (status === 'locked' || !content) {
    return <PasswordGate onUnlock={unlockWithToken} />;
  }
  return <AspireNvidia content={content} />;
}

function AspireNvidia({ content }: { content: WorkshopContent }) {
  useSEO({
    title: content.seo.title,
    description: content.seo.description,
    canonical: 'https://blacktechstreet.ai/aspire-nvidia',
  });

  const shouldReduceMotion = useReducedMotion() ?? false;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [iframeKey, setIframeKey] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://tally.so' || typeof event.data !== 'string') return;
      if (event.data.includes('Tally.FormSubmitted')) {
        setFormSubmitted(true);
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const clearLoadTimeout = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  }, []);

  const handleIframeLoad = useCallback(() => {
    clearLoadTimeout();
    setLoadStatus('loaded');
  }, [clearLoadTimeout]);

  const handleRetry = useCallback(() => {
    clearLoadTimeout();
    setLoadStatus('loading');
    setIframeKey((prev) => prev + 1);
  }, [clearLoadTimeout]);

  const handleResetForm = useCallback(() => {
    setFormSubmitted(false);
    setLoadStatus('loading');
    setIframeKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!TALLY_FORM_ID) return;
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => {
      setLoadStatus((prev) => (prev === 'loading' ? 'error' : prev));
    }, 10000);
    return () => clearLoadTimeout();
  }, [iframeKey, clearLoadTimeout]);

  useEffect(() => {
    if (!TALLY_FORM_ID || formSubmitted) return;
    const TALLY_SRC = 'https://tally.so/widgets/embed.js';
    const load = () => {
      const w = window as typeof window & { Tally?: { loadEmbeds: () => void } };
      if (w.Tally) {
        w.Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])')
          .forEach((el) => {
            if (el.dataset.tallySrc) el.src = el.dataset.tallySrc;
          });
      }
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TALLY_SRC}"]`);
    if (existing) {
      load();
      return;
    }
    const s = document.createElement('script');
    s.src = TALLY_SRC;
    s.onload = load;
    s.onerror = load;
    document.body.appendChild(s);
  }, [formSubmitted, iframeKey]);

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
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <EventJsonLd
        name={content.eventJsonLd.name}
        description={content.eventJsonLd.description}
        startDate={content.eventJsonLd.startDate}
        endDate={content.eventJsonLd.endDate}
        location={{ name: content.eventJsonLd.locationName, address: content.eventJsonLd.locationAddress }}
        url="https://blacktechstreet.ai/aspire-nvidia"
      />

      {/* Scroll progress */}
      <div className="fixed top-16 md:top-20 left-0 right-0 h-1 bg-muted/30 z-40" aria-hidden="true">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <main className="relative pt-16 md:pt-20 pb-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0} className="flex flex-col items-center gap-3 mb-8">
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
                <img src={btsLogo} alt="Black Tech Street logo" className="h-20 sm:h-28 md:h-40 w-auto" />
                <span className="text-xl sm:text-3xl md:text-5xl font-light text-foreground">×</span>
                <span className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 sm:px-4">
                  <img src={nvidiaLogo} alt="NVIDIA logo" className="h-14 sm:h-20 md:h-24 w-auto" />
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight uppercase text-foreground/90 mt-2">
                {content.hero.heading}
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="mb-6">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-primary font-medium">
                {content.hero.status}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={2}
              className="text-xl md:text-3xl font-display font-bold tracking-tight leading-[1.15] mb-5"
            >
              {content.hero.taglineLead}{' '}
              <span className="text-primary">{content.hero.taglineAccent}</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-base md:text-lg text-foreground max-w-2xl mx-auto">
              {content.hero.subcopy}
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 mb-3 flex justify-center">
              <div className="w-full max-w-md rounded-xl bg-primary/10 border border-primary/30 px-5 py-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Megaphone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-primary">{content.hero.calloutTitle}</div>
                  <div className="text-xs text-foreground/80">{content.hero.calloutBody}</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="flex justify-center">
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 w-64 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {content.hero.cta}
              </a>
            </motion.div>
          </motion.div>

          {/* Event facts */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            {content.facts.map(({ icon, label, value }) => {
              const Icon = factIcons[icon] ?? Calendar;
              return (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5 hover:border-primary/50 hover:bg-card/90 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary mb-2 transition-transform group-hover:scale-110" />
                  <div className="text-xs uppercase tracking-wider text-foreground mb-1">{label}</div>
                  <div className="font-display font-bold text-base leading-snug">{value}</div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/40 p-4 mb-10"
          >
            <Laptop className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              {content.laptopNote}
            </p>
          </motion.div>

          {/* Leads */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-4">Led by</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.leads.map((lead) => (
                <div
                  key={lead.name}
                  className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5"
                >
                  <img
                    src={leadImages[lead.imageKey] ?? tyranceHeadshot}
                    alt={lead.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-border/60 shrink-0"
                  />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary mb-1">{lead.role}</div>
                    <div className="font-display font-bold text-base sm:text-lg leading-snug">{lead.name}</div>
                    {lead.title && (
                      <div className="text-sm text-foreground/80">{lead.title}</div>
                    )}
                    <div className="text-sm text-foreground">{lead.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Run of show */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-6">Run of show</h2>
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border/70" aria-hidden="true" />
              <ol className="space-y-6">
                {content.runOfShow.map((block, i) => (
                  <motion.li
                    key={block.title}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <span
                      className="absolute -left-6 sm:-left-8 top-2 h-[15px] w-[15px] sm:h-[19px] sm:w-[19px] rounded-full border-2 border-primary bg-background"
                      aria-hidden="true"
                    />
                    <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="text-sm font-mono text-primary">{block.time}</span>
                        {block.lead && (
                          <span className="text-[11px] uppercase tracking-wider text-foreground/80 border border-border/60 rounded-full px-2 py-0.5">
                            {block.lead}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{block.title}</h3>
                      <ul className="space-y-1.5">
                        {block.points.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-foreground">
                            <span className="text-primary mt-[3px]" aria-hidden="true">
                              •
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* Five exercises */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Five Exercises</h2>
            <p className="text-sm text-foreground mb-6 max-w-2xl">
              {content.exercisesIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.exercises.map(({ icon, n, title, duration, desc }, i) => {
                const Icon = exerciseIcons[icon] ?? Sparkles;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-xs font-mono text-foreground/70">
                        {n} · {duration}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-2">{title}</h3>
                    <p className="text-sm text-foreground">{desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-8 mb-12"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-4">
              What every participant leaves with
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.takeaways.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-4 text-sm text-foreground"
                >
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Registration */}
          <motion.div
            id="register"
            ref={formSectionRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-3 sm:p-6 md:p-8 scroll-mt-24"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">
              {formSubmitted ? content.registration.successHeading : content.registration.heading}
            </h2>
            <p className="text-sm text-foreground text-center mb-6">
              {formSubmitted ? content.registration.successSubcopy : content.registration.subcopy}
            </p>

            {!TALLY_FORM_ID ? (
              <div className="rounded-xl border border-border/50 bg-background/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{content.registration.placeholderHeading}</h3>
                <p className="text-sm text-foreground max-w-md mx-auto">
                  {content.registration.placeholderBody}
                </p>
              </div>
            ) : (
              <>
                <div className="relative -mx-3 sm:mx-0 rounded-none sm:rounded-xl overflow-hidden bg-background min-h-[400px]">
                  <div className="sr-only" aria-live="polite" aria-atomic="true">
                    {loadStatus === 'loading' && !formSubmitted && 'Loading registration form...'}
                    {loadStatus === 'error' && !formSubmitted && 'Registration form failed to load. Retry button available.'}
                    {formSubmitted && 'Your reservation has been received.'}
                  </div>

                  {formSubmitted ? (
                    <div className="absolute inset-0 z-20 flex items-start justify-center pt-12 md:pt-16 p-6 md:p-8 bg-background">
                      <div className="text-center max-w-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                          <Check className="h-8 w-8 text-primary" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">You're registered!</h3>
                        <p className="text-sm text-foreground mb-6">
                          {content.registration.successBody}
                        </p>
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          Register another person
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loadStatus === 'loading' && (
                        <div className="absolute inset-0 z-10 p-6 md:p-8 space-y-4 bg-background" aria-busy="true">
                          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
                          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                          <div className="h-96 bg-muted rounded animate-pulse" />
                        </div>
                      )}

                      {loadStatus === 'error' && (
                        <div className="relative z-10 p-6 md:p-8 text-center" role="alert">
                          <p className="text-foreground mb-4">
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
                          data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1&formEventsForwarding=1`}
                          width="100%"
                          height="1200"
                          frameBorder={0}
                          loading="lazy"
                          title="ASPIRE NVIDIA Skills Building Workshop registration form"
                          name="tally-aspire-nvidia-registration"
                          onLoad={handleIframeLoad}
                          className={cn(
                            'block w-full max-w-full transition-opacity duration-300',
                            loadStatus === 'loading' ? 'opacity-0' : 'opacity-100'
                          )}
                        />
                      )}
                    </>
                  )}
                </div>

                {!formSubmitted && (
                  <p className="text-sm text-foreground text-center mt-4">
                    If the form above doesn't load,{' '}
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
                )}
              </>
            )}
          </motion.div>

          {/* Brand closer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center gap-4 mt-16 text-center"
          >
            <img src={btsLogo} alt="Black Tech Street logo" className="h-20 md:h-28 w-auto opacity-90" />
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
