import { motion } from 'framer-motion';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { FeaturedPublication } from '@/components/thought-leadership/FeaturedPublication';
import { PublicationList } from '@/components/thought-leadership/PublicationList';
import { CiteThisWork } from '@/components/thought-leadership/CiteThisWork';
import { ClosingCta } from '@/components/thought-leadership/ClosingCta';
import { papers } from '@/data/thoughtLeadership';
import { useSEO } from '@/hooks/useSEO';

export default function ThoughtLeadership() {
  useSEO({
    title: 'Thought Leadership | Black Tech Street',
    description:
      'Research and frameworks from Black Tech Street on how individuals and organizations create, identify, and capture value in the age of AI.',
    canonical: 'https://blacktechstreet.ai/thought-leadership',
    ogUrl: 'https://blacktechstreet.ai/thought-leadership',
  });

  const sorted = [...papers].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  const featured = sorted[0];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />

      <main className="relative">
        {/* Hero */}
        <section className="relative pt-36 pb-10 md:pt-48 md:pb-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.13),transparent)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 max-w-5xl mx-auto px-5"
          >
            <h1 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] text-foreground">
              Thought <span className="text-primary">Leadership</span>
            </h1>
          </motion.div>
        </section>

        {featured && (
          <div className="relative z-10 max-w-5xl mx-auto px-5 pb-10 md:pb-12">
            <FeaturedPublication paper={featured} />
            <CiteThisWork paper={featured} />
            <PublicationList papers={sorted} />
          </div>
        )}

        <ClosingCta />
      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
