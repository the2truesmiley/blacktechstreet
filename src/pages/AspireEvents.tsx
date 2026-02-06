import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Sparkles, Baby, Briefcase, Heart, Shield, ExternalLink, Accessibility } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { NextEventHero } from '@/components/events/NextEventHero';
import { EventsHero } from '@/components/events/EventsHero';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { type AspireEvent } from '@/data/aspireEvents';
import { cn } from '@/lib/utils';

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
  },
} as const;

export default function AspireEvents() {
  const [selectedEvent, setSelectedEvent] = useState<AspireEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleRegister = (event: AspireEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const expectItems = [
    {
      icon: Sparkles,
      title: 'Full-Day Immersive Experience',
      description: 'Deep dive into GenAI tools and responsible innovation practices'
    },
    {
      icon: Briefcase,
      title: 'Hands-On AI Tool Training',
      description: 'Learn practical applications you can use immediately'
    },
    {
      icon: Users,
      title: 'Networking with Community',
      description: 'Build lasting connections with fellow participants, local innovators, and Tulsa tech leaders'
    },
    {
      icon: Baby,
      title: 'Childcare Options Available',
      description: 'Ask about childcare during the signup process'
    },
    {
      icon: Accessibility,
      title: 'Accessibility Accommodations',
      description: 'Contact us for any accessibility needs'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopNavBar />
      
      <EventsHero />

      {/* Next Event Hero Section */}
      <section className="py-16 bg-secondary/20 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50"
          style={{ y: backgroundY }}
        />
        <div className="max-w-5xl mx-auto px-5 relative">
          <NextEventHero onRegister={handleRegister} />
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-secondary/20 relative overflow-hidden">
        {/* Animated background decoration */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        
        <div className="max-w-6xl mx-auto px-5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-10"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              What to Expect
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Each workshop is designed to provide hands-on experience with AI tools while fostering responsible innovation practices.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {expectItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className={cn(
                  "p-6 rounded-xl relative overflow-hidden cursor-default",
                  "bg-card/50 backdrop-blur-sm border border-border/40",
                  "transition-colors duration-300"
                )}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0"
                  variants={{
                    rest: { 
                      background: "linear-gradient(to bottom right, transparent, transparent)" 
                    },
                    hover: { 
                      background: "linear-gradient(to bottom right, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.04))" 
                    },
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  variants={{
                    rest: { boxShadow: "inset 0 0 0 1px transparent" },
                    hover: { boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.3)" },
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400 }
                      },
                    }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-display font-semibold mb-2"
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 4 },
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Childcare Partnership Section */}
      <section id="childcare" className="py-16 scroll-mt-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.01 }}
            className={cn(
              "relative overflow-hidden rounded-2xl",
              "bg-gradient-to-br from-primary/10 via-card/80 to-card/60",
              "border border-primary/20 backdrop-blur-sm",
              "p-8 md:p-10"
            )}
          >
            {/* Animated decorative elements */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
            
            <div className="relative">
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Baby className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0)",
                      "0 0 0 4px hsl(var(--primary) / 0.1)",
                      "0 0 0 0 hsl(var(--primary) / 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-3 h-3" />
                  <span>Complimentary Childcare</span>
                </motion.div>
              </motion.div>

              <motion.h2 
                className="text-2xl md:text-3xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                Focus on Learning, We've Got Your Kids Covered
              </motion.h2>
              
              <motion.p 
                className="text-muted-foreground mb-6 max-w-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Black Tech Street has partnered with <strong className="text-foreground">Jovie of Tulsa</strong> to provide 
                professional on-site childcare at no cost during our AI workshops—so you can fully engage 
                without worrying about your little ones.
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Shield, title: 'Fully Vetted Staff', desc: 'CPR/FA certified & background checked' },
                  { icon: Users, title: 'Experienced Nannies', desc: 'Professional childcare experts' },
                  { icon: Sparkles, title: 'Age-Appropriate Activities', desc: 'Safe & structured environment' },
                ].map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -3,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background/50 cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                href="https://www.jovie.com/resources-faq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative">Learn More About Jovie</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.p 
                className="mt-6 text-sm text-muted-foreground italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Indicate your childcare needs during registration to reserve your spot.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="space-y-4"
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-display font-bold"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Questions?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Have questions about our workshops or need accessibility accommodations? We're here to help.
            </motion.p>
            <motion.a
              href="mailto:contact@blacktechstreet.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Contact Us</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
