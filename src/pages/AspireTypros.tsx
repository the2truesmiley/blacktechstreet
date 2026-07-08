import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Laptop, Baby, Sparkles } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';
import typrosBadge from '@/assets/typros-badge.png.asset.json';

const TALLY_FORM_ID = 'zxvANM';


export default function AspireTypros() {
  useSEO({
    title: 'TYPROS x Black Tech Street ASPIRE AI Workshop',
    description:
      'TYPROS and Black Tech Street are partnering to help young professionals learn to use AI ethically, strategically, and effectively in the workplace. Register for the August 20, 2026 ASPIRE AI Workshop.',
    canonical: 'https://blacktechstreet.ai/aspire-typros',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative pt-28 md:pt-32 pb-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
              <img
                src={typrosBadge.url}
                alt="TYPROS logo"
                className="h-16 md:h-20 w-auto"
              />
              <span className="text-2xl md:text-3xl font-light text-muted-foreground">×</span>
              <div className="text-left leading-tight">
                <div className="text-xs md:text-sm uppercase tracking-widest text-primary font-semibold">
                  Black Tech Street
                </div>
                <div className="text-base md:text-lg font-display font-bold">
                  ASPIRE AI Workshop
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/30 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Registration Open
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              AI is changing how we work.
              <br />
              <span className="text-primary">Learn to use it well.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              TYPROS and Black Tech Street are partnering to help young professionals better
              understand how AI can be used ethically, strategically, and effectively in the
              workplace.
            </p>
          </motion.div>

          {/* Event details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5">
              <Calendar className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Date</div>
              <div className="font-display font-bold text-lg">August 20, 2026</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Time</div>
              <div className="font-display font-bold text-lg">9:00 AM – 5:00 PM</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-md p-5">
              <MapPin className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Location</div>
              <div className="font-display font-bold text-lg">Langston Tulsa Campus</div>
            </div>
          </motion.div>

          {/* What to expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-8 mb-10"
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
              What you'll take away
            </h2>
            <p className="text-muted-foreground mb-4">
              Through Black Tech Street's ASPIRE training course, participants gain the knowledge
              and confidence to use AI as a tool that enhances their work while aligning with
              organizational values and producing high-quality results through hands-on learning
              and practical application.
            </p>
            <p className="text-muted-foreground">
              Whether you're just getting started or already experimenting with AI, this session
              will give you practical takeaways you can put to work immediately.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-4">
                <Laptop className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Laptops available</div>
                  <div className="text-xs text-muted-foreground">
                    Available for checkout if you need one.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-4">
                <Baby className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Childcare</div>
                  <div className="text-xs text-muted-foreground">
                    Available upon request.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration form */}
          <motion.div
            id="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">
              Reserve your seat
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Free to attend. Seats are limited.
            </p>

            <div className="rounded-xl overflow-hidden bg-background">
              <iframe
                src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1&formEventsForwarding=1`}
                width="100%"
                height="6235"
                frameBorder={0}
                title="ASPIRE AI - TYPROS"
                className="w-full"
              />
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
