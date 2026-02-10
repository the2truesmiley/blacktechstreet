import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function FinalCTASection() {
  return (
    <section id="contact-section" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6"
        >
          THE FUTURE OF TECH{' '}
          <span className="text-primary">STARTS HERE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
        >
          Join us in building the blueprint for an AI-powered society on the grounds of Historic Greenwood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about-section"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "group flex items-center gap-2 px-6 py-3 rounded-full",
              "bg-primary text-primary-foreground font-medium",
              "hover:bg-primary/90 transition-all duration-300",
              "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            )}
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="mailto:info@blacktechstreet.com"
            className={cn(
              "group flex items-center gap-2 px-6 py-3 rounded-full",
              "bg-secondary/80 text-foreground font-medium border border-border/50",
              "hover:bg-secondary hover:border-primary/50 transition-all duration-300"
            )}
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
