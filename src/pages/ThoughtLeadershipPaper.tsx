import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Copy, Download, ExternalLink } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { PaperCover } from '@/components/thought-leadership/PaperCover';
import { getPaper, formatPaperDate, paperCitation, paperPath } from '@/data/thoughtLeadership';
import { useSEO } from '@/hooks/useSEO';

export default function ThoughtLeadershipPaper() {
  const { slug = '' } = useParams();
  const paper = getPaper(slug);
  const [copied, setCopied] = useState(false);

  const url = `https://blacktechstreet.ai${paperPath(slug)}`;

  useSEO({
    title: paper ? `${paper.shortTitle} | ${paper.author} | Black Tech Street` : 'Thought Leadership | Black Tech Street',
    description: paper?.summary ?? '',
    canonical: url,
    ogUrl: url,
    ogType: 'article',
  });

  useEffect(() => {
    if (!paper) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'paper-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: paper.title,
      name: paper.title,
      author: { '@type': 'Person', name: paper.author, jobTitle: paper.authorTitle, affiliation: { '@type': 'Organization', name: 'Black Tech Street' } },
      datePublished: paper.publishedDate,
      publisher: { '@type': 'Organization', name: 'Black Tech Street', url: 'https://blacktechstreet.ai' },
      abstract: paper.abstract.join(' '),
      identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: paper.doi },
      sameAs: [paper.ssrnUrl, `https://doi.org/${paper.doi}`],
      url,
      encoding: { '@type': 'MediaObject', encodingFormat: 'application/pdf', contentUrl: paper.pdfUrl },
    });
    document.getElementById('paper-jsonld')?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, [paper, url]);

  if (!paper) return <Navigate to="/thought-leadership" replace />;

  const citation = paperCitation(paper);
  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; text stays selectable */
    }
  };

  const downloadProps = {
    href: paper.pdfUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    ...(paper.pdfHostedLocally ? { download: '' } : {}),
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />

      <main className="relative">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        {/* Header */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="relative z-10 max-w-6xl mx-auto px-5">
            <Link
              to="/thought-leadership"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Thought Leadership
            </Link>

            <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-primary font-semibold mb-4"
                >
                  Research Paper · {formatPaperDate(paper.publishedDate)}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.05] mb-5"
                >
                  Value<span className="text-primary">-</span>Native AI
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl md:text-2xl text-muted-foreground leading-snug max-w-2xl mb-8"
                >
                  Infrastructure for Creating, Identifying, and Capturing Value in the Age of AI
                </motion.p>
                <p className="text-base text-foreground mb-8">
                  <span className="font-semibold">{paper.author}</span>
                  <span className="text-muted-foreground">, {paper.authorTitle}, Black Tech Street</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    {...downloadProps}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 shadow-lg shadow-primary/20"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                  <a
                    href={paper.ssrnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-foreground font-semibold text-base hover:border-primary/60"
                  >
                    View on SSRN
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="hidden lg:block"
              >
                <PaperCover paper={paper} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key figures */}
        <section className="relative z-10 border-y border-border/40 bg-card/30">
          <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-3 gap-8">
            {paper.keyStats.map((s) => (
              <div key={s.value}>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{s.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Abstract */}
        <section className="relative z-10 max-w-3xl mx-auto px-5 py-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Abstract</h2>
          <div className="space-y-6">
            {paper.abstract.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-lg md:text-xl text-foreground leading-relaxed'
                    : 'text-base md:text-lg text-muted-foreground leading-relaxed'
                }
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Framework */}
        <section className="relative z-10 max-w-6xl mx-auto px-5 pb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">The Framework</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">Three co-equal pillars.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {paper.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-card/60 border border-border/40"
              >
                <p className="text-6xl font-display font-bold text-primary leading-none mb-4">{pillar.count}</p>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{pillar.body}</p>
                {pillar.items && (
                  <ul className="flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prediction */}
        <section className="relative z-10 max-w-4xl mx-auto px-5 pb-20">
          <figure className="border-l-4 border-primary pl-6 md:pl-10 py-2">
            <figcaption className="text-sm font-semibold text-primary mb-4">A falsifiable prediction</figcaption>
            <blockquote className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-snug">
              {paper.prediction}
            </blockquote>
          </figure>
        </section>

        {/* Download + cite */}
        <section className="relative z-10 max-w-4xl mx-auto px-5 pb-24">
          <div className="rounded-2xl border border-primary/30 bg-card/60 p-7 md:p-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Read the full paper</h2>
            <p className="text-muted-foreground mb-6">
              Free to download. Published on {paper.publisher}, {formatPaperDate(paper.publishedDate)}.
            </p>
            <a
              {...downloadProps}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 mb-8"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>

            <div className="border-t border-border/40 pt-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-semibold text-foreground">Cite this paper</h3>
                <button
                  onClick={copyCitation}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
                  aria-label="Copy citation"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-mono bg-background/60 rounded-lg p-4 break-words">
                {citation}
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
