import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';

// Featured partners (larger display)
const featuredPartners = [
  { 
    name: 'Microsoft', 
    logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b675b6e736cd59c16c5d53_Microsoft%20%20color%20logo%20.png',
    description: 'AI & Cybersecurity Innovation Partner'
  },
  { 
    name: 'NVIDIA', 
    logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/6932028dc71f086344ab0b39_NVIDIA%20logo%20.png',
    link: 'https://www.nvidia.com/',
    description: 'AI Training & Compute Access Partner'
  },
];

// All other partners
const partners = [
  { name: 'Atlas', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68955161f1e681cc843afe53_Atlas%20Website%20Logo%20.png' },
  { name: 'Greenwood Cultural Center', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68a49c2b27a8f8782961eb05_Greenwood%20Cultural%20Center%20Color%20Logo%20.png' },
  { name: 'Hewlett Packard', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68a49df0434a8a90e4b36085_Hewlett%20Packard%20Color%20Logo%20.png' },
  { name: 'SeedAI', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b676228705d9fd3a1903e8_SeedAI%20%20color%20logo%20.png' },
  { name: 'TEDC', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b676e4a5f62fb6f72d67f3_TEDC%20color%20logo%20.png' },
  { name: 'Tulsa Innovation Labs', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/6834c054e7721eb1687f1ca5_Tulsa%20Innovation%20Labs%20Black%20Glow%20Logo%20.png' },
  { name: 'Tulsa Remote', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b677a4efac2b58c62dd1a4_Tulsa%20Remote%20%20color%20logo%20%20(1).png' },
];

const stats = [
  { icon: Users, value: '9+', label: 'Strategic Partners' },
  { icon: Globe, value: 'Global', label: 'Reach & Impact' },
  { icon: Zap, value: 'AI', label: 'Powered Innovation' },
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
      <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-20">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Building the Future Together</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]"
          >
            Partner with{' '}
            <span className="relative">
              <span className="text-primary">Black Tech Street</span>
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
            Uniting trailblazing partners to transform Historic Greenwood into a global epicenter 
            for AI and cybersecurity innovation. Join us to shape a legacy of bold innovation.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Strategic Partners
            </h2>
            <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Industry Leaders Powering Innovation
            </p>
          </motion.div>

          {/* Featured Partner Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredPartners.map((partner, index) => (
              <motion.div
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
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Logo Container */}
                    <div className="relative w-full h-24 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl" />
                      {partner.link ? (
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10"
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-16 w-auto object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          />
                        </a>
                      ) : (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="relative z-10 max-h-16 w-auto object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>

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

      {/* All Partners Grid */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Network
            </h2>
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Collaborating for Change
            </p>
          </motion.div>

          {/* Partner Logo Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className={cn(
                  "relative h-32 p-6 rounded-xl",
                  "bg-card/50 backdrop-blur-sm",
                  "border border-border/30 hover:border-primary/40",
                  "flex items-center justify-center",
                  "transition-all duration-300"
                )}>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 max-h-12 w-auto object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                
                {/* Partner name tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-card border border-border/50 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {partner.name}
                </div>
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
                Let's build a legacy of impact together—start today.
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

                <a
                  href="mailto:info@blacktechstreet.com"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full",
                    "bg-secondary/80 text-foreground font-semibold border border-border/50",
                    "hover:bg-secondary hover:border-primary/50 transition-all duration-300",
                    "hover:scale-105"
                  )}
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-muted-foreground text-sm">
            Black Tech Street © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
