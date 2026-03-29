import { useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Sparkles, Briefcase, Shield, ExternalLink, Accessibility, Baby, Laptop, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { EventsHero } from '@/components/events/EventsHero';
import { EventTestimonials } from '@/components/events/EventTestimonials';
import { FacilitatorsSection } from '@/components/events/FacilitatorsSection';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { FlipClock } from '@/components/events/FlipClock';
import { Button } from '@/components/ui/button';
import { aspireEvents2026, type AspireEvent } from '@/data/aspireEvents';
import { cn } from '@/lib/utils';
import jovieChildcareBadge from '@/assets/partners/jovie-childcare-badge.png';
import { useSEO } from '@/hooks/useSEO';

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

export default function AspireEventDecember2026() {
  const [selectedEvent, setSelectedEvent] = useState<AspireEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useSEO({
    title: 'December 2026 ASPIRE Workshop | Black Tech Street',
    description: 'Register for the December 2026 ASPIRE GenAI Fluency Workshop in Greenwood, Tulsa. Hands-on AI training with free childcare.',
    canonical: 'https://blacktechstreet.com/aspire/events/december-2026',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const decemberEvent = useMemo(() => {
    return aspireEvents2026.find(e => e.id === 'december-2026')!;
  }, []);

  const handleRegister = () => {
    setSelectedEvent(decemberEvent);
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
      title: 'Free On-Site Childcare',
      description: 'Professional childcare provided at no cost during workshops'
    },
    {
      icon: Accessibility,
      title: 'Accessibility Accommodations',
      description: 'Contact us for any accessibility needs'
    },
    {
      icon: Laptop,
      title: 'Laptop Checkout Available',
      description: 'Need a device? Laptops are available to borrow during the workshop at no cost'
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />
      <main className="relative">
      <EventsHero hideBadges={['workshops', 'all-saturdays']} />

      {/* December Event Hero Section */}
      <section className="py-16 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50"
          style={{ y: backgroundY }}
        />
        <div className="max-w-5xl mx-auto px-5 relative">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-gradient-to-br from-primary/20 via-card to-card",
                "border border-primary/30",
                "p-6 md:p-10"
              )}
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Decorative glow */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-3 border border-primary/30"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0)",
                        "0 0 20px 4px hsl(var(--primary) / 0.4)",
                        "0 0 0 0 hsl(var(--primary) / 0)",
                      ],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    December Workshop
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                    ASPIRE GenAI Fluency Workshop
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Event Info */}
                  <motion.div className="space-y-4" variants={containerVariants}>
                    <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold">
                      {format(decemberEvent.date, 'MMMM d, yyyy')}
                    </motion.h3>
                    
                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                      {[
                        { icon: Calendar, text: format(decemberEvent.date, 'EEEE') },
                        { icon: Clock, text: decemberEvent.time },
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center gap-3"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="text-lg md:text-xl font-medium text-foreground">{item.text}</span>
                        </motion.div>
                      ))}
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=914+N+Greenwood+Ave,+Tulsa,+OK+74106"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">{decemberEvent.locationFull}</span>
                        </motion.div>
                        <div className="flex items-center gap-3 pl-8">
                          <span className="text-base text-muted-foreground group-hover:text-primary/80 transition-colors">914 N Greenwood Ave, Tulsa, OK 74106</span>
                        </div>
                      </a>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.div
                        className="mt-4 inline-block rounded-lg"
                        animate={{
                          boxShadow: [
                            "0 0 10px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.1)",
                            "0 0 20px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.2)",
                            "0 0 10px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.1)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button 
                          size="lg" 
                          className="group relative overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold"
                          onClick={handleRegister}
                        >
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                          />
                          <span className="relative flex items-center gap-2">
                            Register Now
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </motion.span>
                          </span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Countdown */}
                  <motion.div variants={itemVariants} className="flex justify-center md:justify-end">
                    <FlipClock targetDate={decemberEvent.date} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 relative overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
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
            {expectItems.map((item) => (
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
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { background: "linear-gradient(to bottom right, transparent, transparent)" },
                    hover: { background: "linear-gradient(to bottom right, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.04))" },
                  }}
                  transition={{ duration: 0.3 }}
                />
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
                      hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 400 } },
                    }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-display font-semibold mb-2"
                    variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            
            <div className="relative">
              <motion.a
                href="https://www.jovie.com/resources-faq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={jovieChildcareBadge} 
                  alt="Jovie - Free On-Site Childcare Provided" 
                  className="h-24 md:h-32 w-auto object-contain"
                />
              </motion.a>

              <motion.h2 
                className="text-2xl md:text-3xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                Free On-Site Childcare Provided
              </motion.h2>
              
              <motion.p 
                className="text-muted-foreground mb-6 max-w-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Black Tech Street has partnered with{' '}
                <a 
                  href="https://www.jovie.com/resources-faq/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground font-semibold hover:text-primary transition-colors"
                >
                  Jovie of Tulsa
                </a>{' '}
                to provide professional on-site childcare at no cost during our ASPIRE AI workshops—so you can fully engage 
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
                ].map((item) => (
                  <motion.div 
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -3, transition: { type: "spring", stiffness: 400 } }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background/50 cursor-default"
                  >
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
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
                <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
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

      <FacilitatorsSection />
      <EventTestimonials />

      {/* Contact CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="space-y-4"
          >
            <motion.h2 className="text-2xl md:text-3xl font-display font-bold">
              Questions?
            </motion.h2>
            <motion.p className="text-muted-foreground">
              Have questions about our workshops or need accessibility accommodations? We're here to help.
            </motion.p>
            <motion.a
              href="mailto:contact@blacktechstreet.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
              <span className="relative">Contact Us</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />

      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
