import { motion } from 'framer-motion';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export function SocialSection() {
  const instagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="social-section" className="py-20 border-b border-border/30">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
          Follow Us On <span className="text-primary">Social</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay connected with Black Tech Street. Get the latest updates, events, and stories from our community.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <a
          href="https://instagram.com/blacktechstreet"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 px-6 py-3 rounded-full",
            "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
            "text-primary-foreground font-medium",
            "hover:scale-105 transition-transform duration-300",
            "shadow-lg shadow-primary/25"
          )}
        >
          <Instagram className="w-5 h-5" />
          @blacktechstreet
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <a
          href="https://facebook.com/blacktechstreet"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 px-6 py-3 rounded-full",
            "bg-secondary border border-border text-foreground font-medium",
            "hover:scale-105 hover:border-primary/50 transition-all duration-300",
            "shadow-lg shadow-black/25"
          )}
        >
          <Facebook className="w-5 h-5" />
          Black Tech Street
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Instagram Embed - Prominent */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-xl mx-auto"
      >
        <div 
          ref={instagramRef}
          className={cn(
            "rounded-2xl overflow-hidden",
            "bg-secondary/50 border-2 border-primary/30",
            "backdrop-blur-sm",
            "shadow-xl shadow-primary/10",
            "[&_iframe]:!min-w-0 [&_iframe]:!max-w-full"
          )}
        >
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/blacktechstreet/"
            data-instgrm-version="14"
            style={{
              background: 'transparent',
              border: 0,
              borderRadius: '3px',
              boxShadow: 'none',
              margin: '0',
              maxWidth: '100%',
              minWidth: '100%',
              padding: 0,
              width: '100%',
            }}
          >
            <div className="p-12 flex flex-col items-center justify-center min-h-[450px]">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6",
                "bg-gradient-to-br from-primary via-primary/80 to-primary/60"
              )}>
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <p className="text-muted-foreground text-center text-base mb-2">
                Loading Instagram feed...
              </p>
              <p className="text-muted-foreground/60 text-sm">
                @blacktechstreet
              </p>
            </div>
          </blockquote>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Latest updates from our community 🚀
        </p>
      </motion.div>
    </section>
  );
}

// Extend Window interface for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
