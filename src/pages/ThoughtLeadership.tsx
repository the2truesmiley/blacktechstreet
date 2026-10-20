import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { PaperCover } from '@/components/thought-leadership/PaperCover';
import { papers, paperPath, formatPaperDate } from '@/data/thoughtLeadership';
import { useSEO } from '@/hooks/useSEO';

export default function ThoughtLeadership() {
  useSEO({
    title: 'Thought Leadership | Black Tech Street',
    description:
      'Research and frameworks from Black Tech Street on how individuals and organizations create, identify, and capture value in the age of AI.',
    canonical: 'https://blacktechstreet.ai/thought-leadership',
    ogUrl: 'https://blacktechstreet.ai/thought-leadership',
  });

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />

      <main className="relative">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="relative z-10 max-w-5xl mx-auto px-5">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05] mb-6"
            >
              Thought <span className="text-primary">Leadership</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Research and frameworks from Black Tech Street on building an AI Powered Economy, drawn from
              field work in Greenwood and the empirical literature.
            </motion.p>
          </div>
        </section>

        <section className="relative z-10 max-w-5xl mx-auto px-5 pb-24">
          <div className="grid gap-8">
            {papers.map((paper) => (
              <motion.article
                key={paper.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group grid md:grid-cols-[220px_1fr] gap-8 items-center p-6 md:p-8 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/40 transition-colors"
              >
                <Link to={paperPath(paper.slug)} className="block max-w-[220px] mx-auto md:mx-0 w-full" tabIndex={-1}>
                  <PaperCover paper={paper} size="sm" className="group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
                <div>
                  <p className="text-sm text-primary font-semibold mb-3">
                    Research Paper · {formatPaperDate(paper.publishedDate)}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mb-3">
                    <Link to={paperPath(paper.slug)} className="hover:text-primary transition-colors">
                      {paper.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {paper.author}, {paper.authorTitle}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{paper.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={paperPath(paper.slug)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                    >
                      Read the paper
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={paper.pdfHostedLocally ? '' : undefined}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-foreground font-semibold hover:border-primary/60"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
