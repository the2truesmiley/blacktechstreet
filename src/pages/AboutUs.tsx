import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'Rebirthing Historic Black Wall Street as a world-class innovation economy rooted in AI, Cybersecurity, and Other Emerging Technologies.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'Transforming Greenwood and the Greater Tulsa Region into the model for AI-powered societies and economies of the future.',
  },
  {
    icon: Users,
    title: 'Our Approach',
    description: 'We design and deliver programs at the intersection of education, innovation, and research to ensure communities can participate in, and shape, the AI economy.',
  },
  {
    icon: MapPin,
    title: 'Our Roots',
    description: 'Rooted in the historic Greenwood District of Tulsa, Oklahoma — once known as Black Wall Street — we honor that legacy by building the future of technology.',
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <TechBackground isVisible={true} />
      <TopNavBar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-5">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              About <span className="text-primary">Black Tech Street</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're building the future of technology, rooted in the historic legacy of Black Wall Street.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-secondary/30 border border-border/40",
                  "backdrop-blur-sm",
                  "hover:border-primary/40 transition-colors duration-300"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    "bg-primary/10 border border-primary/30"
                  )}>
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "p-8 rounded-xl mb-16",
              "bg-secondary/30 border border-border/40",
              "backdrop-blur-sm"
            )}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Black Tech Street was born from a vision to revitalize the spirit of innovation and 
                entrepreneurship that defined the original Black Wall Street in Tulsa's Greenwood District.
              </p>
              <p>
                In the early 20th century, Greenwood was a thriving hub of Black-owned businesses and 
                cultural institutions. Today, we're channeling that same entrepreneurial energy into 
                the technologies that will shape our future: <strong className="text-primary">artificial intelligence, 
                cybersecurity, and emerging tech</strong>.
              </p>
              <p>
                Our programs bridge the gap between education and industry, ensuring that our community 
                doesn't just participate in the AI revolution—we help lead it.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Ready to join the movement?
            </h3>
            <Link
              to="/#contact-section"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                "bg-primary text-primary-foreground font-medium",
                "hover:bg-primary/90 transition-colors"
              )}
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
