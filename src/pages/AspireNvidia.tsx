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
} from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { EventJsonLd } from '@/components/seo/EventJsonLd';
import { useSEO } from '@/hooks/useSEO';
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

const runOfShow = [
  {
    time: '9:15 – 10:00 AM',
    title: 'Doors, check in, setup',
    lead: 'Black Tech Street',
    points: [
      'Participants check in and are seated.',
      'Each person confirms their laptop and chatbot are working.',
      'A support table handles anyone who is stuck, so no one starts the day behind.',
      'Light breakfast and coffee available.',
    ],
  },
  {
    time: '10:00 – 10:15 AM',
    title: 'Welcome and live build',
    lead: 'Black Tech Street',
    points: [
      'Black Tech Street opens the day and frames what participants will walk out with.',
      'One live build on stage: a real task from the audience becomes a working skill in front of the room.',
      'Hand off to Michael Boone.',
    ],
  },
  {
    time: '10:15 – 11:35 AM',
    title: 'Skills build',
    lead: 'Michael Boone, NVIDIA',
    points: [
      'Michael Boone walks the room through building and uploading the skills, step by step.',
      'The room works in sync, with a checkpoint roughly every ten minutes.',
      'Coaches circulate to keep anyone from falling behind.',
      'Goal: every participant finishes with at least one skill that runs.',
    ],
  },
  {
    time: '11:35 – 11:50 AM',
    title: 'Break',
    lead: '',
    points: [
      'Coaches clear any remaining technical issues before the applied portion begins.',
      'Participants who want to build an extra skill can keep going with a coach.',
    ],
  },
  {
    time: '11:50 AM – 1:20 PM',
    title: 'Skills Application',
    lead: 'Black Tech Street',
    points: [
      'Five exercises, each building on the last.',
      'Participants do not move on until the current exercise produces a real result.',
    ],
  },
  {
    time: '1:20 – 1:45 PM',
    title: 'Participant presentations',
    lead: 'Black Tech Street',
    points: [
      'Five to six people present for two minutes each: what they built, what it does for them, and why it mattered.',
      'Presenters represent a range of starting experience levels.',
    ],
  },
  {
    time: '1:45 – 2:00 PM',
    title: 'Close and follow up',
    lead: 'Both',
    points: [
      'Participants write down what they saved and what they plan to automate next.',
      'Black Tech Street collects these as the record of impact and confirms the 30 day follow up.',
      'Doors stay open and the support table stays staffed for 20 minutes after.',
    ],
  },
];

const exercises = [
  {
    icon: Sparkles,
    n: '01',
    title: 'Feed It the Truth',
    duration: '15 min',
    desc:
      'Note three specific true things about your situation that a stranger would not know, then feed the skill your real information and get a first output.',
  },
  {
    icon: Search,
    n: '02',
    title: 'Question It Before You Trust It',
    duration: '20 min',
    desc:
      'Ask the skill what it assumed, what its weakest part is, and what it would need to know to improve. Answer the third and run it again. This is the master habit of the day.',
  },
  {
    icon: Repeat,
    n: '03',
    title: 'Build the Routine',
    duration: '15 min',
    desc:
      'Decide when you will run the skill again, put multiple skills in order so one feeds the next, and write the routine as one sentence.',
  },
  {
    icon: Gauge,
    n: '04',
    title: 'Put a Number On It',
    duration: '15 min',
    desc:
      'Write how long the task took before and how long now, multiply by how often you do it across a year, and name one dated action you will take this week.',
  },
  {
    icon: Share2,
    n: '05',
    title: 'Make It Teachable',
    duration: '25 min',
    desc:
      'Write the skill as three plain steps, hand it to a stranger who runs it on their own information, watch where they get stuck, and fix the instructions until it works.',
  },
];

const takeaways = [
  'At least one working skill you built yourself.',
  'A real task from your own life, completed in the room.',
  'One concrete action to take this week.',
  'A skill proven to work in someone else\u2019s hands, ready to share.',
];

export default function AspireNvidia() {
  useSEO({
    title: 'Black Tech Street × NVIDIA ASPIRE Skills Workshop',
    description:
      'A free, hands-on AI skills building workshop from Black Tech Street and NVIDIA. Saturday, October 10, 2026 at Langston University Tulsa. Build a skill, apply it to real work, walk out with it running.',
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
      if (typeof event.data !== 'string') return;
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
        name="Black Tech Street × NVIDIA ASPIRE Skills Building Workshop"
        description="A free, hands-on AI skills building workshop. Build a skill with NVIDIA, apply it to a real task from your own work with Black Tech Street, and present what you built."
        startDate="2026-10-10T10:00:00-05:00"
        endDate="2026-10-10T14:00:00-05:00"
        location={{ name: 'Langston University, Tulsa', address: '914 N Greenwood Ave, Tulsa, OK 74106' }}
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
                ASPIRE Skills Building Workshop
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="mb-6">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-primary font-medium">
                Now Accepting Registrations
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={2}
              className="text-xl md:text-3xl font-display font-bold tracking-tight leading-[1.15] mb-5"
            >
              Build the Skill. Apply it to your own work.{' '}
              <span className="text-primary">Walk out with it running.</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-base md:text-lg text-foreground max-w-2xl mx-auto">
              NVIDIA teaches you to build the skill. Black Tech Street helps you apply it to a real
              task from your own life. The day ends with participants presenting what they built and
              why it mattered.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 mb-3 flex justify-center">
              <div className="w-full max-w-md rounded-xl bg-primary/10 border border-primary/30 px-5 py-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Megaphone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-primary">Free Training</div>
                  <div className="text-xs text-foreground/80">No cost to attend — registration required.</div>
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
                Reserve your seat
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
            {[
              { icon: Calendar, label: 'Date', value: 'Saturday, October 10, 2026' },
              { icon: Clock, label: 'Time', value: '10:00 AM – 2:00 PM' },
              { icon: MapPin, label: 'Location', value: 'Langston University, Tulsa' },
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
                <div className="font-display font-bold text-base leading-snug">{value}</div>
              </motion.div>
            ))}
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
              In person. Bring your own laptop and use any chatbot you like.
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
              {[
                {
                  name: 'Michael Boone',
                  title: 'Manager of Trustworthy AI Product',
                  org: 'NVIDIA',
                  role: 'Skills build',
                  image: michaelHeadshot,
                },
                {
                  name: 'Tyrance Billingsley II',
                  title: 'Founder & CEO',
                  org: 'Black Tech Street',
                  role: 'Skills Application',
                  image: tyranceHeadshot,
                },
              ].map((lead) => (
                <div
                  key={lead.name}
                  className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5"
                >
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-border/60 shrink-0"
                  />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary mb-1">{lead.role}</div>
                    <div className="font-display font-bold text-base sm:text-lg leading-snug">{lead.name}</div>
                    {'title' in lead && lead.title && (
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
                {runOfShow.map((block, i) => (
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
              Each exercise builds on the last, and you do not move on until the current one produces a
              real result. The same steps work for any skill built that morning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercises.map(({ icon: Icon, n, title, duration, desc }, i) => (
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
              ))}
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
              {takeaways.map((t) => (
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
              {formSubmitted ? 'Reservation received' : 'Reserve your seat'}
            </h2>
            <p className="text-sm text-foreground text-center mb-6">
              {formSubmitted
                ? "We'll see you on Saturday, October 10, 2026."
                : 'Free to attend. Capacity is 150 participants.'}
            </p>

            {!TALLY_FORM_ID ? (
              <div className="rounded-xl border border-border/50 bg-background/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Registration opens soon</h3>
                <p className="text-sm text-foreground max-w-md mx-auto">
                  Sign-ups for the October 10 workshop are not open yet. Check back shortly, or reach
                  out through our contact page and we will let you know the moment seats are released.
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
                          Your seat is reserved for the Black Tech Street × NVIDIA ASPIRE Skills Building
                          Workshop on October 10, 2026.
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
