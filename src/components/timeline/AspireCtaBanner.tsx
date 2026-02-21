import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AspireCtaBanner() {
  return (
    <section className="relative z-10 px-5 max-w-5xl mx-auto -mt-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/aspire/events" className="block group">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-background/80 backdrop-blur-md p-6 sm:p-8 hover:border-primary/60 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20">
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              {/* Left content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30">
                    Registration Open
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  ASPIRE GenAI Fluency Workshop
                </h3>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    March 28, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    10:00 AM – 6:00 PM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    Langston Tulsa
                  </span>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
