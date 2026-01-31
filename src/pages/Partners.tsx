import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Partner logo data - using placeholder for external logos
const partners = [
  { name: 'Atlas', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68955161f1e681cc843afe53_Atlas%20Website%20Logo%20.png' },
  { name: 'Greenwood Cultural Center', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68a49c2b27a8f8782961eb05_Greenwood%20Cultural%20Center%20Color%20Logo%20.png' },
  { name: 'Hewlett Packard', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68a49df0434a8a90e4b36085_Hewlett%20Packard%20Color%20Logo%20.png' },
  { name: 'Microsoft', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b675b6e736cd59c16c5d53_Microsoft%20%20color%20logo%20.png' },
  { name: 'NVIDIA', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/6932028dc71f086344ab0b39_NVIDIA%20logo%20.png', link: 'https://www.nvidia.com/' },
  { name: 'SeedAI', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b676228705d9fd3a1903e8_SeedAI%20%20color%20logo%20.png' },
  { name: 'TEDC', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b676e4a5f62fb6f72d67f3_TEDC%20color%20logo%20.png' },
  { name: 'Tulsa Innovation Labs', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/6834c054e7721eb1687f1ca5_Tulsa%20Innovation%20Labs%20Black%20Glow%20Logo%20.png' },
  { name: 'Tulsa Remote', logo: 'https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68b677a4efac2b58c62dd1a4_Tulsa%20Remote%20%20color%20logo%20%20(1).png' },
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                Partner with{' '}
                <span className="text-primary">Black Tech Street</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Black Tech Street unites trailblazing partners to transform Greenwood into a global 
                epicenter for AI and cybersecurity. From industry giants to academic innovators, we 
                collaborate to spark economic growth, empower communities, and redefine technology's 
                future. Join us to shape a legacy of bold innovation. Let's make Tulsa a major AI player.
              </p>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/684656c07fd6c5716d658c28_9f683aeaa56028c2725c8ec378d28db6_elements-hero-v14-image-brix-templates.jpeg"
                  alt="Partnership collaboration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-16 bg-card/50">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="w-full flex items-center justify-center p-4"
              >
                {partner.link ? (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </a>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 w-auto object-contain filter brightness-0 invert opacity-70"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shape the Future CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.prod.website-files.com/6812e5e1258216169cbbdeb5/68955be1c6c3cf7a43084519_BTS%20ASPIRE%20walk%20up%20stairs.png"
                  alt="ASPIRE participants walking up stairs"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Shape the future{' '}
                <span className="text-primary">of AI with us</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Join Black Tech Street to transform Historic Greenwood into a global powerhouse for AI 
                and cybersecurity innovation. Our partners—industry pioneers, academic leaders, and 
                community visionaries—co-create a future where technology empowers everyone. By 
                collaborating with us, you'll drive economic growth, advance responsible AI, and 
                position Tulsa as a major player in the AI revolution.
              </p>
              <p className="text-lg font-semibold text-foreground mb-8">
                Let's build a legacy of impact together—start today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                    "bg-primary text-primary-foreground font-medium",
                    "hover:bg-primary/90 transition-all duration-300",
                    "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                  )}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="mailto:info@blacktechstreet.com"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                    "bg-secondary/80 text-foreground font-medium border border-border/50",
                    "hover:bg-secondary hover:border-primary/50 transition-all duration-300"
                  )}
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-muted-foreground text-sm">
            Black Tech Street © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
