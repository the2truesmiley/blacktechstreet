import { useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Users, Sparkles, Briefcase, Shield, ExternalLink, Accessibility, Baby, Laptop,
  Calendar, Clock, MapPin, ArrowRight, Car, CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { EventTestimonials } from '@/components/events/EventTestimonials';
import { FacilitatorsSection } from '@/components/events/FacilitatorsSection';
import { FlipClock } from '@/components/events/FlipClock';
import { StickyRegisterBar } from '@/components/events/StickyRegisterBar';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { aspireEvents2026 } from '@/data/aspireEvents';
import { cn } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';
import { EventJsonLd } from '@/components/seo/EventJsonLd';

const REGISTER_PATH = '/aspire/events/september-2026/register';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

function RegisterCta({
  className,
  label = 'Reserve my free spot',
  note = 'Free · Takes about 3 minutes',
}: {
  className?: string;
  label?: string;
  note?: string | null;
}) {
  return (
    <div className={cn('w-full', className)}>
      <Link
        to={REGISTER_PATH}
        className={cn(
          'group inline-flex min-h-[52px] w-full items-center justify-center gap-2 sm:w-auto',
          'rounded-lg bg-primary px-8 text-base sm:text-lg font-semibold text-primary-foreground',
          'shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        {label}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </Link>
      {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}

const expectItems = [
  { icon: Sparkles, title: 'Full-Day Immersive Experience', description: 'Deep dive into GenAI tools and responsible innovation practices' },
  { icon: Briefcase, title: 'Hands-On AI Tool Training', description: 'Learn practical applications you can use immediately' },
  { icon: Users, title: 'Networking with Community', description: 'Build lasting connections with fellow participants, local innovators, and Tulsa tech leaders' },
  { icon: Baby, title: 'Free On-Site Childcare', description: 'Professional childcare provided at no cost during workshops' },
  { icon: Accessibility, title: 'Accessibility Accommodations', description: 'Contact us for any accessibility needs' },
  { icon: Laptop, title: 'Laptop Checkout Available', description: 'Need a device? Laptops are available to borrow during the workshop at no cost' },
];

const faqItems = [
  {
    q: 'Is it really free?',
    a: 'Yes. The workshop, the materials, lunch-break logistics, childcare, and laptop checkout all cost you nothing. We never ask for payment information.',
  },
  {
    q: 'Do I need to bring a laptop?',
    a: 'Bring one if you have it. If you do not, laptops are available to borrow at the workshop at no cost — just note it during registration.',
  },
  {
    q: 'Do I need any AI or tech experience?',
    a: 'No. The workshop is built for complete beginners and still gives experienced users practical new workflows.',
  },
  {
    q: 'What about childcare?',
    a: 'Professional, vetted on-site childcare is provided free through our partnership with Jovie of Tulsa. Indicate your childcare needs during registration so we can reserve a spot.',
  },
  {
    q: 'What if I cannot stay the whole day?',
    a: 'Still register. Sessions build on each other, but you are welcome to attend the portion of the day that works for your schedule.',
  },
  {
    q: 'Where do I park?',
    a: 'Free parking is available near Langston University\u2019s Tulsa campus at 914 N Greenwood Ave. See the parking details page for the exact lots and entrances.',
  },
];

export default function AspireEventSeptember2026() {
  const reduceMotion = useReducedMotion();

  useSEO({
    title: 'Free AI Workshop Sept 19, 2026 | ASPIRE | Black Tech Street',
    description:
      'Reserve a free spot at the September 19, 2026 ASPIRE AI Workshop in Greenwood, Tulsa. Hands-on AI training, free childcare, laptops available. No experience needed.',
    canonical: 'https://blacktechstreet.ai/aspire/events/september-2026',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const septemberEvent = useMemo(
    () => aspireEvents2026.find((e) => e.id === 'september-2026')!,
    [],
  );

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '150px 0px' },
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
      };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />
      <EventJsonLd
        name="ASPIRE AI Workshop — Free Hands-On AI Training"
        description="A free, full-day AI workshop in Tulsa's Greenwood District. Learn ChatGPT, AI tools, and responsible innovation. Free childcare and laptop checkout included."
        startDate="2026-09-19T10:00:00-05:00"
        endDate="2026-09-19T18:00:00-05:00"
        location={{ name: 'Langston University - Tulsa Campus', address: '914 N Greenwood Ave, Tulsa, OK 74106' }}
        url="https://blacktechstreet.ai/aspire/events/september-2026"
      />

      <main className="relative pb-24 md:pb-0">
        {/* Offer hero */}
        <section className="relative pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="relative mx-auto max-w-5xl px-5">
            <motion.div
              variants={reduceMotion ? undefined : containerVariants}
              initial={reduceMotion ? undefined : 'hidden'}
              animate={reduceMotion ? undefined : 'visible'}
              className={cn(
                'relative overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-primary/15 via-card to-card',
                'border border-primary/30 p-6 md:p-10',
              )}
            >
              <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
                <motion.div variants={reduceMotion ? undefined : itemVariants} className="space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    ASPIRE 2026 · GenAI Fluency &amp; Responsible Innovation
                  </p>

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Free full-day AI workshop
                  </h1>

                  <p className="max-w-xl text-lg text-foreground/90">
                    Spend one Saturday learning how to use AI tools practically, ethically, and
                    effectively — at work and in your own projects. No experience required.
                  </p>

                  <div className="flex flex-col gap-2 text-base">
                    <span className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 shrink-0 text-primary" />
                      {format(septemberEvent.date, 'EEEE, MMMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-primary" />
                      {septemberEvent.time}
                    </span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=914+N+Greenwood+Ave,+Tulsa,+OK+74106"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 hover:text-primary transition-colors"
                    >
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>
                        {septemberEvent.locationFull}
                        <span className="block text-sm text-muted-foreground group-hover:text-primary/80">
                          914 N Greenwood Ave, Tulsa, OK 74106
                        </span>
                      </span>
                    </a>
                    <Link
                      to="/aspire/parking"
                      className="inline-flex items-center gap-2 pl-8 text-sm font-medium text-primary hover:underline"
                    >
                      <Car className="h-4 w-4" />
                      Parking details
                    </Link>
                  </div>

                  <RegisterCta className="pt-1" />

                  <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm text-foreground/90">
                    {['No cost', 'Free childcare', 'Laptops provided', 'Beginner friendly'].map((t) => (
                      <li key={t} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={reduceMotion ? undefined : itemVariants}
                  className="flex justify-center md:justify-end"
                >
                  <div className="scale-90 origin-center md:scale-100">
                    <FlipClock targetDate={septemberEvent.date} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="relative py-14">
          <div className="relative mx-auto max-w-6xl px-5">
            <motion.div {...reveal} className="mb-10 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">What to Expect</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Each workshop is designed to provide hands-on experience with AI tools while
                fostering responsible innovation practices.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {expectItems.map((item) => (
                <motion.div
                  key={item.title}
                  {...reveal}
                  className={cn(
                    'rounded-xl p-6 bg-card/50 backdrop-blur-sm border border-border/40',
                    'transition-colors duration-300 hover:border-primary/30',
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...reveal} className="mt-10 flex justify-center">
              <RegisterCta className="text-center sm:w-auto" note="Free · Takes about 3 minutes" />
            </motion.div>
          </div>
        </section>

        {/* Childcare */}
        <section id="childcare" className="relative scroll-mt-24 py-14">
          <div className="mx-auto max-w-4xl px-5">
            <motion.div
              {...reveal}
              className={cn(
                'relative overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-primary/10 via-card/80 to-card/60',
                'border border-primary/20 backdrop-blur-sm p-8 md:p-10',
              )}
            >
              <div className="mb-4 flex items-center gap-3">
                <Baby className="h-7 w-7 text-primary" />
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Free On-Site Childcare
                </h2>
              </div>

              <p className="mb-6 max-w-2xl text-muted-foreground">
                Black Tech Street has partnered with{' '}
                <a
                  href="https://www.jovie.com/resources-faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Jovie of Tulsa
                </a>{' '}
                to provide professional on-site childcare at no cost during our ASPIRE AI workshops,
                so you can fully engage without worrying about your little ones.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Shield, title: 'Fully Vetted Staff', desc: 'CPR/FA certified & background checked' },
                  { icon: Users, title: 'Experienced Nannies', desc: 'Professional childcare experts' },
                  { icon: Sparkles, title: 'Age-Appropriate Activities', desc: 'Safe & structured environment' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-lg bg-background/50 p-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.jovie.com/resources-faq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 px-5 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Learn more about Jovie
                <ExternalLink className="h-4 w-4" />
              </a>

              <p className="mt-6 text-sm italic text-muted-foreground">
                Indicate your childcare needs during registration to reserve your spot.
              </p>
            </motion.div>
          </div>
        </section>

        <FacilitatorsSection />
        <EventTestimonials />

        <section className="relative py-10">
          <div className="mx-auto max-w-4xl px-5 flex justify-center">
            <RegisterCta className="text-center sm:w-auto" />
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-14">
          <div className="mx-auto max-w-3xl px-5">
            <motion.h2 {...reveal} className="mb-6 text-center font-display text-2xl font-bold md:text-3xl">
              Common Questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <motion.div {...reveal} className="rounded-2xl border border-primary/25 bg-card/60 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Save your seat for September 19
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Registration is open and completely free. Seats are limited to keep the workshop
                hands-on.
              </p>
              <div className="mt-6 flex justify-center">
                <RegisterCta className="text-center sm:w-auto" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Questions or accessibility needs?{' '}
                <a
                  href="mailto:contact@blacktechstreet.com"
                  className="font-medium text-primary hover:underline"
                >
                  contact@blacktechstreet.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <StickyRegisterBar to={REGISTER_PATH} subLabel="Free · September 19, 2026 · Tulsa" />
    </div>
  );
}
