import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { aspireEvents2026 } from '@/data/aspireEvents';
import { useSEO } from '@/hooks/useSEO';

const FALLBACK_HEIGHT = 3200;
// Extra breathing room so Tally's submit button is never clipped by
// rounding differences or late-loading fields on narrow screens.
const HEIGHT_BUFFER = 120;
const MIN_HEIGHT = 900;

export default function AspireEventSeptember2026Register() {
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  // Remount the iframe when the layout width bucket changes so Tally
  // re-measures and re-reports its height after resize / rotation.
  const [widthKey, setWidthKey] = useState(() =>
    typeof window === 'undefined' ? 'md' : String(Math.round(window.innerWidth / 80)),
  );

  const event = useMemo(
    () => aspireEvents2026.find((e) => e.id === 'september-2026')!,
    [],
  );

  useSEO({
    title: 'Register | September 19 ASPIRE AI Workshop | Black Tech Street',
    description:
      'Reserve your free spot for the September 19, 2026 ASPIRE AI Workshop in Greenwood, Tulsa. Free training, free childcare, laptops available.',
    canonical: 'https://blacktechstreet.ai/aspire/events/september-2026/register',
    ogUrl: 'https://blacktechstreet.ai/aspire/events/september-2026/register',
    ogImage: 'https://blacktechstreet.ai/bts-logo.png',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setWidthKey(String(Math.round(window.innerWidth / 80)));
      });
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  // Tally forwards its content height via postMessage when dynamicHeight=1.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string' || !e.data.includes('Tally.')) return;
      try {
        const data = JSON.parse(e.data);
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


  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopNavBar />

      <main className="relative pt-24 pb-16">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-5">
          <Link
            to="/aspire/events/september-2026"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to workshop details
          </Link>

          <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold">
            Reserve your free spot
          </h1>

          <div className="mt-4 grid gap-2 text-sm sm:text-base text-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              {format(event.date, 'EEEE, MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              {event.locationFull} — 914 N Greenwood Ave, Tulsa, OK 74106
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-primary/25 bg-card/60 p-4 sm:p-5">
            <ul className="grid gap-2 text-sm text-foreground sm:grid-cols-3">
              {[
                'Takes about 3 minutes',
                'No cost, no payment info',
                'Confirmation email after you submit',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={event.directRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Having trouble? Open the form in a new tab
            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>

          <div className="mt-6 -mx-4 sm:mx-0">
            <iframe
              src={`${event.registrationUrl}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1`}
              width="100%"
              height={height}
              frameBorder="0"
              title="Registration form for the September 19, 2026 ASPIRE AI Workshop"
              className="block w-full"
              style={{ height }}
            />
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Questions or accessibility needs?{' '}
            <a
              href="mailto:contact@blacktechstreet.com"
              className="font-medium text-primary hover:underline"
            >
              contact@blacktechstreet.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
