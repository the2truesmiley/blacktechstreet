import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { TechBackground } from '@/components/timeline/TechBackground';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

// Simple preview gate: page is not yet public.
// Access via /donate?preview=btsdraft2026
const PREVIEW_KEY = 'btsdraft2026';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const IMPACT = [
  'Fund AI workshop scholarships for Tulsa youth',
  'Provide laptops and learning materials',
  'Support founder mentorship and capital readiness',
  'Sustain the ASPIRE AI Workshop series',
];

export default function Donate() {
  const [params] = useSearchParams();
  const hasAccess = params.get('preview') === PREVIEW_KEY;

  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

  useSEO({
    title: 'Support Black Tech Street | Donate',
    description: 'Support Black Tech Street and help build the future of AI innovation rooted in Tulsa\'s Greenwood District.',
    canonical: 'https://blacktechstreet.com/donate',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Block search indexing while in preview
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const amount = custom ? Number(custom) : selected ?? 0;

  const handleDonate = () => {
    // Stripe will be wired up later.
    alert(`Stripe checkout coming soon.\nAmount: $${amount} (${frequency})`);
  };

  if (!hasAccess) {
    return (
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <TechBackground isVisible={true} />
        <TopNavBar />
        <main className="relative z-10 pt-40 pb-20 px-5">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Coming Soon
            </h1>
            <p className="text-muted-foreground">
              Our giving page isn't quite ready for the public yet. Check back shortly.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Preview banner */}
          <div className="mb-6 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300">
            Preview mode — this page is not yet public. Stripe is not connected.
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-6">
              <Heart className="w-4 h-4" />
              Support the Movement
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Fuel the Future of <span className="text-emerald-400">Black Tech Street</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your contribution funds workshops, mentorship, and capital readiness for the next generation of AI builders rooted in Greenwood.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Donation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
            >
              {/* Frequency toggle */}
              <div className="inline-flex rounded-full border border-white/10 p-1 mb-6">
                {(['one-time', 'monthly'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={cn(
                      'px-5 py-2 text-sm rounded-full transition-colors capitalize',
                      frequency === f
                        ? 'bg-emerald-500 text-black font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {f.replace('-', ' ')}
                  </button>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-4">Choose an amount</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {PRESET_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setSelected(a); setCustom(''); }}
                    className={cn(
                      'py-4 rounded-lg border text-lg font-semibold transition-all',
                      selected === a && !custom
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    ${a}
                  </button>
                ))}
              </div>

              <label className="block text-sm text-muted-foreground mb-2">Or enter a custom amount</label>
              <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  className="pl-7 h-12 text-lg"
                />
              </div>

              <Button
                onClick={handleDonate}
                disabled={!amount || amount < 1}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-base"
              >
                Donate ${amount || 0} {frequency === 'monthly' ? '/ month' : ''}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout powered by Stripe (coming soon).
              </p>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold mb-5">Your impact</h2>
              <ul className="space-y-4">
                {IMPACT.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-muted-foreground">
                Black Tech Street is dedicated to building the most concentrated hub of Black innovation in AI, rooted in the legacy of Tulsa's Greenwood District.
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
