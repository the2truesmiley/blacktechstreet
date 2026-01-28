import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/blacktechstreet', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/blacktechstreet', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="relative pt-12 pb-8 border-t border-border/30">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-lg">B</span>
              </div>
            </div>
            <span className="font-display font-bold text-foreground text-xl">
              Black Tech Street
            </span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  "p-3 rounded-full",
                  "bg-secondary/50 border border-border/40",
                  "text-muted-foreground hover:text-primary",
                  "hover:border-primary/50 hover:bg-secondary",
                  "transition-all duration-300"
                )}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            Black Tech Street © {new Date().getFullYear()}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
