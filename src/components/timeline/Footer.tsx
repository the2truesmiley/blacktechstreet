import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoCircuit from '@/assets/logo_b_circuit.png';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/blacktechstreet', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/blacktechstreet', label: 'Instagram' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Programs', href: '/aspire' },
  { label: 'Partners', href: '/partners' },
  { label: 'Team', href: '/about' },
];

const contactInfo = [
  { icon: Mail, text: 'contact@blacktechstreet.com', href: 'mailto:contact@blacktechstreet.com' },
  { icon: MapPin, text: 'Tulsa, Oklahoma', href: null },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    if (href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background/80 backdrop-blur-lg border-t border-border/40">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src={logoCircuit} 
                  alt="Black Tech Street" 
                  className="relative w-10 h-10 object-contain"
                />
              </div>
              <span className="font-display font-bold text-foreground text-lg">
                Black Tech Street
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Revitalizing the legacy of Black Wall Street through technology, 
              innovation, and community empowerment in the Greater Tulsa Region.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "p-2.5 rounded-lg",
                    "bg-secondary/50 border border-border/40",
                    "text-muted-foreground hover:text-primary",
                    "hover:border-primary/50 hover:bg-secondary",
                    "transition-all duration-300"
                  )}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.text}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-muted-foreground text-sm">
                      <item.icon className="w-4 h-4" />
                      <span>{item.text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Black Tech Street. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Building the future, honoring the past.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
