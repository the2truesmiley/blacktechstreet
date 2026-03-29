import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { newsArticles, YEARS } from '@/data/newsArticles';
import { useSEO } from '@/hooks/useSEO';

export default function News() {
  useSEO({
    title: 'BTS In The News | Black Tech Street',
    description: 'Explore 44 press articles covering Black Tech Street\'s mission to rebuild Black Wall Street through technology — from CNN to Forbes to the U.S. Senate.',
  });

  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return newsArticles.filter((a) => {
      if (yearFilter && a.year !== yearFilter) return false;
      return true;
    });
  }, [yearFilter]);

  const grouped = useMemo(() => {
    const map = new Map<number, typeof filtered>();
    for (const a of filtered) {
      const list = map.get(a.year) || [];
      list.push(a);
      map.set(a.year, list);
    }
    return [...map.entries()].sort(([a], [b]) => b - a);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />

      <main className="relative">
        {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]"
          >
            BTS{' '}
            <span className="relative">
              <span className="text-primary">In The News</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            From CNN to Forbes to the U.S. Senate — explore the press coverage of Black Tech Street's 
            mission to rebuild Black Wall Street through technology and AI.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 flex-wrap"
        >
          {/* Year pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setYearFilter(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                yearFilter === null
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card/50 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground'
              )}
            >
              All Years
            </button>
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                  yearFilter === y
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                    : 'bg-card/50 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground'
                )}
              >
                {y}
              </button>
            ))}
          </div>

          <span className="text-sm text-muted-foreground ml-auto hidden sm:block">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>
      </section>

      {/* Articles */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${yearFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {grouped.map(([year, articles]) => (
              <div key={year} className="mb-12">
                {/* Year header */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{year}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
                  <span className="text-sm text-muted-foreground">{articles.length} article{articles.length !== 1 ? 's' : ''}</span>
                </div>

                <div className="grid gap-4">
                  {articles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No articles match the selected filters.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      </main>

      <Footer />
    </div>
  );
}

function ArticleCard({ article, index }: { article: typeof newsArticles[0]; index: number }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className={cn(
        'group relative p-5 md:p-6 rounded-xl',
        'bg-card/50 backdrop-blur-sm',
        'border border-border/30 hover:border-primary/30',
        'transition-all duration-300'
      )}
    >
      <div className="flex flex-col gap-3">
        {/* Source */}
        <div>
          {article.sourceUrl ? (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              {article.source}
            </a>
          ) : (
            <span className="text-sm font-semibold text-primary">{article.source}</span>
          )}
        </div>

        {/* Headline */}
        <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {article.headline}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{article.author}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {article.summary}
        </p>

        {/* Read Article link */}
        {article.url && (
          <div className="mt-1">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Read Article
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
