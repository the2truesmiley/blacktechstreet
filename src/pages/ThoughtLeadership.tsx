import { motion } from 'framer-motion';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { FeaturedPublication } from '@/components/thought-leadership/FeaturedPublication';
import { ResearchSignup } from '@/components/thought-leadership/ResearchSignup';
import { getPaper } from '@/data/thoughtLeadership';
import { useSEO } from '@/hooks/useSEO';

const SUBHEAD =
  'Research, frameworks, and ideas from the Black Tech Street team on building technology that serves our communities.';

export default function ThoughtLeadership() {
  useSEO({
    title: 'Thought Leadership | Black Tech Street',
    description: SUBHEAD,
    canonical: 'https://blacktechstreet.ai/thought-leadership',
    ogUrl: 'https://blacktechstreet.ai/thought-leadership',
  });

  const featured = getPaper('value-native-ai');

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />

      <main className="relative">
        {/* Hero */}
        <section className="relative pt-36 pb-10 md:pt-44 md:pb-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.13),transparent)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 max-w-3xl mx-auto px-5 text-center"
          >
            <h1 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] text-foreground">
              Thought <span className="text-primary">Leadership</span>
            </h1>
          </motion.div>
        </section>

        <div className="relative z-10 max-w-5xl mx-auto px-5 pb-16 md:pb-20">
          {featured && <FeaturedPublication paper={featured} />}
          <ResearchSignup />
        </div>

      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
