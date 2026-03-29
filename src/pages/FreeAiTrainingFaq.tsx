import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSEO } from '@/hooks/useSEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqCategories = [
  {
    title: 'About the Workshop',
    faqs: [
      { q: 'What is the ASPIRE AI Workshop?', a: 'ASPIRE is a free, full-day GenAI Fluency Workshop hosted by Black Tech Street in Tulsa, Oklahoma. Participants learn practical AI skills through hands-on training in a welcoming, community-driven environment.' },
      { q: 'Is the AI workshop really free?', a: 'Yes — 100% free. There are no hidden fees, no credit card required, and no upsells. The workshop, lunch, childcare, and laptop checkout are all included at no cost.' },
      { q: 'Who funds this? Why is it free?', a: 'ASPIRE workshops are supported by community partners and grants focused on equitable access to technology education in the Greenwood District and greater Tulsa.' },
      { q: 'How often do workshops happen?', a: 'We hold workshops throughout the year — typically quarterly. Check our events page for the next available date.' },
    ],
  },
  {
    title: 'Eligibility & Requirements',
    faqs: [
      { q: 'Do I need any tech experience to attend?', a: 'No experience necessary. Our workshops are designed for complete beginners. If you can use a smartphone, you can learn AI with us.' },
      { q: 'Is there an age requirement?', a: 'The workshop is designed for adults (18+). Free childcare is available for younger children.' },
      { q: 'Do I need to bring a laptop?', a: 'No — we provide free laptop checkout during the workshop. Just let us know during registration if you need one.' },
      { q: 'Is this only for people in Tulsa?', a: 'Anyone can attend! The workshops are held in-person at Langston University — Tulsa Campus, but attendees come from across Oklahoma and beyond.' },
    ],
  },
  {
    title: 'Childcare & Accessibility',
    faqs: [
      { q: 'Is childcare really free?', a: 'Yes. Black Tech Street partners with Jovie of Tulsa to provide professional, on-site childcare at no cost. All staff are CPR/First Aid certified and fully background-checked.' },
      { q: 'What ages does childcare cover?', a: 'Please indicate your children\'s ages during registration, and we\'ll accommodate accordingly. Jovie provides age-appropriate activities.' },
      { q: 'Are there accessibility accommodations?', a: 'Yes. Contact us at contact@blacktechstreet.com with any accessibility needs and we\'ll do our best to accommodate.' },
    ],
  },
  {
    title: 'What You\'ll Learn',
    faqs: [
      { q: 'What AI tools will I learn?', a: 'You\'ll get hands-on experience with ChatGPT, AI image generation, AI writing assistants, and other GenAI tools. The exact curriculum evolves to stay current.' },
      { q: 'Will I get a certificate?', a: 'Yes — participants who complete the full-day workshop receive a certificate of completion.' },
      { q: 'Can I use these skills for my job or business?', a: 'Absolutely. The workshop focuses on practical, immediately usable skills — from writing professional content to automating tasks and creating marketing materials.' },
      { q: 'Is this about learning to code?', a: 'No — this is about using AI tools, not building them. You\'ll learn to work with AI as a tool for productivity, creativity, and decision-making.' },
    ],
  },
  {
    title: 'Logistics',
    faqs: [
      { q: 'Where is the workshop held?', a: 'Langston University — Tulsa Campus, 914 N Greenwood Ave, Tulsa, OK 74106. Located in the historic Greenwood District.' },
      { q: 'What time does it start and end?', a: 'Workshops run from 10:00 AM to 6:00 PM with breaks and lunch included.' },
      { q: 'Is lunch provided?', a: 'Yes — lunch is provided free of charge during the workshop.' },
      { q: 'Is parking available?', a: 'Yes, free parking is available at the venue.' },
      { q: 'How do I register?', a: 'Visit our events page and click "Register Free" for the next available workshop date. Registration takes about 2 minutes.' },
    ],
  },
];

export default function FreeAiTrainingFaq() {
  useSEO({
    title: 'Free AI Training FAQ | ASPIRE Workshop Questions | Black Tech Street',
    description: 'Got questions about free AI training in Tulsa? Find answers about ASPIRE AI Workshops — eligibility, childcare, what you\'ll learn, and how to register.',
    canonical: 'https://blacktechstreet.ai/free-ai-training-faq',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // FAQ Page JSON-LD
  useEffect(() => {
    const allFaqs = faqCategories.flatMap(c => c.faqs);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
    const existing = document.getElementById('faq-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative">
        {/* Hero */}
        <section className="pt-32 pb-16 relative">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
                Free AI Training{' '}
                <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]">FAQ</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about ASPIRE — the free, hands-on AI workshops in Tulsa's Greenwood District.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="pb-20 relative">
          <div className="max-w-3xl mx-auto px-5 space-y-12">
            {faqCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.05 }}
              >
                <h2 className="text-2xl font-display font-bold mb-4 text-foreground">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${catIdx}-${i}`}
                      className="border border-border/40 rounded-xl px-6 bg-card/30 data-[state=open]:bg-card/60"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-4 text-[15px]">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 relative">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Ready to Learn AI for Free?
              </h2>
              <p className="text-muted-foreground text-lg">
                Register in under 2 minutes. No cost, no experience needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/free-ai-workshop">
                  <Button size="lg" className="bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full">
                    View Workshop Details
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/aspire/events">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold rounded-full border-primary/40 text-primary hover:bg-primary/10">
                    See All Dates
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Still have questions? Email us at{' '}
                <a href="mailto:contact@blacktechstreet.com" className="text-primary hover:underline">contact@blacktechstreet.com</a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
