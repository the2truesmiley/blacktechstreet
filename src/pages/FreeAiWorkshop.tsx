import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin, Baby, Laptop, Users, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isPast, format } from 'date-fns';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { FlipClock } from '@/components/events/FlipClock';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { aspireEvents2026, type AspireEvent } from '@/data/aspireEvents';
import { cn } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';
import { EventJsonLd } from '@/components/seo/EventJsonLd';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const personas = [
  { emoji: '👩‍🏫', title: 'Teachers & Educators', desc: 'Learn to integrate AI tools into your classroom and curriculum' },
  { emoji: '💼', title: 'Small Business Owners', desc: 'Automate tasks, create content, and grow your business with AI' },
  { emoji: '🔍', title: 'Job Seekers', desc: 'Build AI skills that employers are actively hiring for' },
  { emoji: '👨‍👩‍👧', title: 'Parents & Caregivers', desc: 'Understand AI your kids are using and learn alongside them — free childcare provided' },
  { emoji: '🎓', title: 'Students', desc: 'Get hands-on experience with tools shaping every industry' },
  { emoji: '🌱', title: 'Complete Beginners', desc: 'No tech experience required — we start from zero' },
];

const outcomes = [
  'Write professional content with ChatGPT and other AI tools',
  'Create presentations, images, and marketing materials with AI',
  'Automate repetitive tasks to save hours every week',
  'Understand AI safety and responsible use',
  'Build a personal AI workflow you can use immediately',
  'Earn a certificate of completion',
];

const faqs = [
  { q: 'Is this really 100% free?', a: 'Yes — completely free. No hidden fees, no upsells, no credit card required. The workshop, lunch, childcare, and laptop checkout are all provided at no cost.' },
  { q: 'Do I need any tech experience?', a: 'None at all. Our workshops are designed for complete beginners. If you can use a smartphone, you can learn AI with us.' },
  { q: 'What about childcare?', a: 'Free professional on-site childcare is provided by Jovie of Tulsa — fully vetted, CPR-certified staff. Just indicate your needs during registration.' },
  { q: 'What if I don\'t have a laptop?', a: 'We have free laptop checkout available during the workshop. Just let us know when you register.' },
  { q: 'Where is the workshop held?', a: 'Langston University — Tulsa Campus, 914 N Greenwood Ave, Tulsa, OK 74106. Located in the historic Greenwood District.' },
  { q: 'How long is the workshop?', a: 'It\'s a full-day experience running from 10:00 AM to 6:00 PM, with breaks and lunch included.' },
];

export default function FreeAiWorkshop() {
  useSEO({
    title: 'Free AI Workshop in Tulsa | Learn AI for Free | ASPIRE by Black Tech Street',
    description: 'Free hands-on AI training in Tulsa, Oklahoma. Learn ChatGPT, AI tools & responsible innovation. No experience needed. Free childcare & laptops. Register now.',
    canonical: 'https://blacktechstreet.ai/free-ai-workshop',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [selectedEvent, setSelectedEvent] = useState<AspireEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextEvent = useMemo(() => {
    return aspireEvents2026
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .find(e => !isPast(e.date)) || null;
  }, []);

  const upcomingEvents = useMemo(() => {
    return aspireEvents2026
      .filter(e => !isPast(e.date))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, []);

  const handleRegister = (event: AspireEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      {nextEvent && (
        <EventJsonLd
          name="ASPIRE AI Workshop — Free Hands-On AI Training in Tulsa"
          description="A free, full-day AI workshop in Tulsa's Greenwood District. Learn ChatGPT, AI tools, and responsible innovation. Free childcare and laptop checkout. No experience required."
          startDate={`${nextEvent.date.toISOString().split('T')[0]}T10:00:00-05:00`}
          endDate={`${nextEvent.date.toISOString().split('T')[0]}T18:00:00-05:00`}
          location={{ name: 'Langston University - Tulsa Campus', address: '914 N Greenwood Ave, Tulsa, OK 74106' }}
          url="https://blacktechstreet.ai/free-ai-workshop"
        />
      )}

      <main className="relative">
        {/* Hero */}
        <section className="pt-32 pb-20 relative">
          <div className="max-w-5xl mx-auto px-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-6"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                100% Free — No Experience Required
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Learn AI{' '}
                <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                  For Free
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Hands-on AI workshops in Tulsa's historic Greenwood District. 
                Free childcare. Free laptops. Zero experience needed.
              </motion.p>

              {nextEvent && (
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 pt-4">
                  <FlipClock targetDate={nextEvent.date} />
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      {format(nextEvent.date, 'MMMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      {nextEvent.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {nextEvent.location}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-full"
                      onClick={() => handleRegister(nextEvent)}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                      />
                      <span className="relative flex items-center gap-2">
                        Register Free — It's $0
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* What You'll Actually Learn */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">What You'll Walk Away With</h2>
              <p className="text-muted-foreground">Practical AI skills you can use the very next day</p>
            </motion.div>

            <motion.div
              className="grid gap-4 max-w-2xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {outcomes.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/40"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Who This Is For</h2>
              <p className="text-muted-foreground">Our workshops welcome everyone — no matter your background</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {personas.map((p) => (
                <motion.div
                  key={p.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400 } }}
                  className="p-6 rounded-xl bg-card/50 border border-border/40 cursor-default"
                >
                  <span className="text-3xl mb-3 block">{p.emoji}</span>
                  <h3 className="text-lg font-display font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Everything Included Free */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Everything Is <span className="text-primary">Free</span>
              </h2>
              <p className="text-muted-foreground">No catches. No credit card. No upsells.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Sparkles, label: 'Full-day AI training', sub: '10 AM – 6 PM' },
                { icon: Baby, label: 'Professional childcare', sub: 'By Jovie of Tulsa' },
                { icon: Laptop, label: 'Laptop checkout', sub: 'No device needed' },
                { icon: Users, label: 'Lunch & networking', sub: 'Meals included' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Upcoming Dates */}
        {upcomingEvents.length > 0 && (
          <section className="py-20 relative">
            <div className="max-w-4xl mx-auto px-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Upcoming Workshop Dates</h2>
                <p className="text-muted-foreground">All workshops run 10:00 AM – 6:00 PM at Langston Tulsa</p>
              </motion.div>

              <motion.div
                className="grid gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className={cn(
                      "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl",
                      "bg-card/50 border border-border/40"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs text-primary font-semibold uppercase">{format(event.date, 'MMM')}</span>
                        <span className="text-lg font-bold text-primary leading-none">{format(event.date, 'd')}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">{event.time} · {event.location}</p>
                      </div>
                    </div>
                    <Button
                      className="bg-primary text-primary-foreground font-semibold shrink-0"
                      onClick={() => handleRegister(event)}
                    >
                      Register Free
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-20 relative">
          <div className="max-w-3xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Frequently Asked Questions</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/40 rounded-xl px-6 bg-card/30 data-[state=open]:bg-card/60"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Bottom CTA */}
        {nextEvent && (
          <section className="py-20 relative">
            <div className="max-w-3xl mx-auto px-5 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Ready to Start Your AI Journey?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Next workshop: {format(nextEvent.date, 'MMMM d, yyyy')}. Seats are limited.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-full"
                    onClick={() => handleRegister(nextEvent)}
                  >
                    Register Free — $0, No Strings
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <p className="text-sm text-muted-foreground">
                  Or <Link to="/aspire/events" className="text-primary hover:underline">view all workshop dates →</Link>
                </p>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
