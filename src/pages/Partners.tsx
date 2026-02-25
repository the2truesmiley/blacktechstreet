import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';

// Import partner logos
import microsoftLogo from '@/assets/partners/microsoft-logo.png';
import nvidiaLogo from '@/assets/partners/nvidia-logo.png';
import atlasLogo from '@/assets/partners/atlas-logo.png';
import greenwoodLogo from '@/assets/partners/greenwood-cultural-center-logo.png';
import hpLogo from '@/assets/partners/hewlett-packard-logo.png';
import seedaiLogo from '@/assets/partners/seedai-logo.png';
import tedcLogo from '@/assets/partners/tedc-logo.png';
import tilLogo from '@/assets/partners/tulsa-innovation-labs-logo.png';
import tulsaRemoteLogo from '@/assets/partners/tulsa-remote-logo.png';

// Featured partners (larger display)
const featuredPartners = [
  { 
    name: 'Microsoft', 
    logo: microsoftLogo,
    link: 'https://www.microsoft.com/',
    description: 'AI & Cybersecurity Innovation Partner'
  },
  { 
    name: 'NVIDIA', 
    logo: nvidiaLogo,
    link: 'https://www.nvidia.com/',
    description: 'AI Training & Compute Access Partner'
  },
];

// All other partners
const partners = [
  { name: 'Atlas School', logo: atlasLogo, needsLightBg: false, link: 'https://www.atlasschool.com/' },
  { name: 'Greenwood Cultural Center', logo: greenwoodLogo, needsLightBg: false },
  { name: 'Hewlett Packard', logo: hpLogo, needsLightBg: false },
  { name: 'SeedAI', logo: seedaiLogo, needsLightBg: false },
  { name: 'TEDC', logo: tedcLogo, needsLightBg: false },
  { name: 'Tulsa Innovation Labs', logo: tilLogo, needsLightBg: false },
  { name: 'Tulsa Remote', logo: tulsaRemoteLogo, needsLightBg: true },
];


export default function Partners() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <TopNavBar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center pt-32 pb-12">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]"
          >
            Our{' '}
            <span className="relative">
              <span className="text-primary">Partners</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The organizations powering our mission to transform Historic Greenwood into a global epicenter for AI and cybersecurity innovation.
          </motion.p>

        </div>
      </section>

      {/* Featured Partners Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-card/50 to-transparent">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Strategic Partners
            </p>
          </motion.div>

          {/* Featured Partner Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredPartners.map((partner, index) => (
              <motion.div
                id={partner.name.toLowerCase().replace(/\s+/g, '-')}
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={cn(
                  "relative h-full p-8 md:p-10 rounded-2xl",
                  "bg-gradient-to-br from-card via-card to-card/80",
                  "border border-border/50 group-hover:border-primary/30",
                  "transition-all duration-500"
                )}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Logo Container */}
                    <div className="relative w-full h-48 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
                      {partner.link ? (
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 flex items-center justify-center"
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            loading="lazy"
                            className="w-[250px] h-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          />
                        </a>
                      ) : (
                        <div className="relative z-10 flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            loading="lazy"
                            className="w-[250px] h-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Partners Grid */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Community Partners
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                id={partner.name.toLowerCase().replace(/\s+/g, '-')}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {partner.link ? (
                  <a href={partner.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className={cn(
                      "relative h-52 p-8 rounded-xl",
                      "bg-card/50 backdrop-blur-sm",
                      "border border-border/30 hover:border-primary/40",
                      "flex items-center justify-center",
                      "transition-all duration-300"
                    )}>
                      <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={cn(
                        "relative z-10 flex items-center justify-center px-4 py-3 rounded-lg",
                        partner.needsLightBg && "bg-white/90"
                      )}>
                        <img src={partner.logo} alt={partner.name} loading="lazy" className="w-[150px] h-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110" />
                      </div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-card border border-border/50 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                        {partner.name}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className={cn(
                    "relative h-52 p-8 rounded-xl",
                    "bg-card/50 backdrop-blur-sm",
                    "border border-border/30 hover:border-primary/40",
                    "flex items-center justify-center",
                    "transition-all duration-300"
                  )}>
                    <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={cn(
                      "relative z-10 flex items-center justify-center px-4 py-3 rounded-lg",
                      partner.needsLightBg && "bg-white/90"
                    )}>
                      <img src={partner.logo} alt={partner.name} loading="lazy" className="w-[150px] h-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110" />
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-card border border-border/50 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                      {partner.name}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Card glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-2xl" />
            
            <div className={cn(
              "relative p-10 md:p-14 rounded-2xl text-center",
              "bg-gradient-to-br from-card via-card to-card/90",
              "border border-border/50"
            )}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight"
              >
                Shape the Future{' '}
                <span className="text-primary">of AI With Us</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
              >
                Join Black Tech Street to transform Historic Greenwood into a global powerhouse 
                for AI innovation. Together, we'll drive economic growth, advance responsible AI, 
                and position Tulsa as a major player in the AI revolution.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-lg font-semibold text-foreground mb-10"
              >
                Let's build a legacy of impact together, start today.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  to="/about"
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full",
                    "bg-primary text-primary-foreground font-semibold",
                    "hover:bg-primary/90 transition-all duration-300",
                    "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
                    "hover:scale-105"
                  )}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full",
                    "bg-secondary/80 text-foreground font-semibold border border-border/50",
                    "hover:bg-secondary hover:border-primary/50 transition-all duration-300",
                    "hover:scale-105"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
