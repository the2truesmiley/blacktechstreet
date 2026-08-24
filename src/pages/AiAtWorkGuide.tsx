import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { TechBackground } from '@/components/timeline/TechBackground';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { useSEO } from '@/hooks/useSEO';

const sections = [
  {
    icon: Sparkles,
    title: 'Practically',
    points: [
      'Start with the tasks you repeat weekly: drafting, summarizing, formatting, research.',
      'Write prompts like a work request: give context, the audience, the format, and the constraints.',
      'Treat the first output as a draft, never a deliverable. Edit it the way you would edit a colleague.',
      'Keep a personal file of prompts that worked so you stop starting from scratch.',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Ethically',
    points: [
      'Never paste customer data, credentials, or anything confidential into a public AI tool.',
      'Check your employer\'s AI policy before using a new tool for work product.',
      'Verify facts, numbers, names, and citations before they leave your desk.',
      'Disclose AI assistance when the work is presented as your own analysis or judgment.',
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Effectively',
    points: [
      'Measure the time saved on one task before rolling AI into your whole workflow.',
      'Use AI to widen options early and to tighten quality late, not to replace your thinking.',
      'Build a short review step into anything AI touches so mistakes get caught internally.',
      'Share what works with your team. Fluency spreads faster than tooling.',
    ],
  },
];

export default function AiAtWorkGuide() {
  useSEO({
    title: 'Using AI at Work: A Practical Starter Guide | Black Tech Street',
    description:
      'A free one-page guide on using AI practically, ethically, and effectively in the workplace, from the Black Tech Street ASPIRE AI Workshop curriculum.',
    canonical: 'https://blacktechstreet.ai/resources/ai-at-work',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative z-10 pt-28 pb-16 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-medium text-primary mb-3">Free guide</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5">
              Using AI at Work
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              A one-page starter guide on using AI practically, ethically, and effectively in the
              workplace, pulled from the ASPIRE AI Workshop curriculum.
            </p>
          </motion.header>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-border/40 bg-secondary/20 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm md:text-base text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8 text-center"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
              Want the full training?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              The ASPIRE AI Workshop is a free, full-day session in Historic Greenwood, with childcare
              provided.
            </p>
            <Link
              to="/aspire/events"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See upcoming workshops
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
