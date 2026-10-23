import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { useSEO } from '@/hooks/useSEO';

// Tally form "Contact Information" (first, last, email required; phone optional).
// The form itself also redirects to the homepage on completion.
const TALLY_FORM_ID = 'q54qMd';
const FORM_URL = `https://tally.so/r/${TALLY_FORM_ID}`;
// No transparentBackground: Tally's dark label text needs its own light card to stay readable on our dark page.
const EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1&formEventsForwarding=1`;

const MIN_HEIGHT = 520;
const HEIGHT_BUFFER = 60;
const REDIRECT_DELAY_MS = 2000;

export default function TccAi2026() {
  const navigate = useNavigate();
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Contact | Black Tech Street',
    description: 'Share your contact information with Black Tech Street.',
    canonical: 'https://blacktechstreet.ai/TCCAI2026',
    ogUrl: 'https://blacktechstreet.ai/TCCAI2026',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string' || !e.data.includes('Tally.')) return;
      try {
        const data = JSON.parse(e.data);
        if (data?.event === 'Tally.FormSubmitted') {
          setSubmitted(true);
          return;
        }
        const h = Number(data?.payload?.height);
        if (h && Number.isFinite(h)) {
          setHeight(Math.max(h + HEIGHT_BUFFER, MIN_HEIGHT));
        }
      } catch {
        /* ignore non-JSON messages */
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const t = window.setTimeout(() => navigate('/', { replace: true }), REDIRECT_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [submitted, navigate]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopNavBar />

      <main className="relative pt-24 pb-16">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-5">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Thanks For Listening!</h1>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-5"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Thank you! Your information was received.</p>
                <p className="mt-1 text-sm text-muted-foreground">Taking you to the home page…</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6 overflow-hidden rounded-xl">
                <iframe
                  src={EMBED_URL}
                  width="100%"
                  height={height}
                  frameBorder="0"
                  scrolling="no"
                  title="Contact information form"
                  className="block w-full border-0"
                  style={{ height, minHeight: MIN_HEIGHT }}
                />
              </div>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Having trouble? Open the form in a new tab
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
