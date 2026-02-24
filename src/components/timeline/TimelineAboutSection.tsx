import { motion } from "framer-motion";
import { Target, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function TimelineAboutSection() {
  const instagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
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
    <section id="about-section" className="py-16 border-b border-border/30">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        {/* Mission Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div
                className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  "bg-secondary border border-primary/30",
                  "shadow-lg shadow-black/20",
                )}
              >
                <Target className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">Our Mission</h3>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            <strong className="text-primary">Rebirthing Historic Black Wall Street</strong> as a world-class innovation
            economy rooted in AI, Cybersecurity, and Other Emerging Technologies.
          </p>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            We design and deliver programs at the intersection of{" "}
            <strong className="text-primary">education, innovation, and research</strong> to ensure communities can
            participate in, and shape, the AI economy.
          </p>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Transforming Greenwood and the Greater Tulsa Region into{" "}
            <strong className="text-primary">the model for AI-powered societies</strong> and economies of the future.
          </p>
        </motion.div>

        {/* Instagram Embed */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-primary via-primary/70 to-primary/50",
              )}
            >
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <a
                href="https://instagram.com/blacktechstreet"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                @blacktechstreet
              </a>
              <p className="text-xs text-muted-foreground">Follow us on Instagram</p>
            </div>
          </div>

          <div
            ref={instagramRef}
            className={cn(
              "rounded-lg overflow-hidden",
              "bg-secondary/30 border border-border/40",
              "[&_iframe]:!min-w-0 [&_iframe]:!max-w-full",
            )}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/blacktechstreet/"
              data-instgrm-version="14"
              style={{
                background: "transparent",
                border: 0,
                borderRadius: "3px",
                boxShadow: "none",
                margin: "0",
                maxWidth: "100%",
                minWidth: "100%",
                padding: 0,
                width: "100%",
              }}
            >
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                <Instagram className="w-12 h-12 text-primary/40 mb-4" />
                <p className="text-muted-foreground text-center text-sm">Loading Instagram feed...</p>
              </div>
            </blockquote>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">Latest updates from our community</p>
        </motion.div>
      </div>
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
