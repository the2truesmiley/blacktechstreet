import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, Sparkles, Baby, Accessibility, Briefcase, Heart, Shield, ExternalLink } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { EventCalendar } from '@/components/events/EventCalendar';
import { EventCard } from '@/components/events/EventCard';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { aspireEvents2026, type AspireEvent } from '@/data/aspireEvents';
import { cn } from '@/lib/utils';
export default function AspireEvents() {
  const [selectedEvent, setSelectedEvent] = useState<AspireEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = (event: AspireEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const scrollToEvent = (eventId: string) => {
    const element = document.getElementById(eventId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
      title: 'Networking with Community Leaders',
      description: 'Connect with innovators and thought leaders in the AI space'
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
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>2026 Workshop Series</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold">
              ASPIRE{' '}
              <span className="text-primary">2026 Events</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              GenAI Fluency & Responsible Innovation Workshops
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/40">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">4 Workshops</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/40">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">All Saturdays</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/40">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">LU-Tulsa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Calendar Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              2026 Calendar
            </h2>
            <p className="text-muted-foreground">
              Click on highlighted dates to view workshop details
            </p>
          </motion.div>

          <EventCalendar onEventClick={scrollToEvent} />
        </div>
      </section>

      {/* Event Cards Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Upcoming Workshops
            </h2>
            <p className="text-muted-foreground">
              Secure your spot at one of our 2026 ASPIRE sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aspireEvents2026.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              What to Expect
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each workshop is designed to provide hands-on experience with AI tools while fostering responsible innovation practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expectItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-card/50 backdrop-blur-sm border border-border/40",
                  "hover:border-primary/30 transition-all duration-300"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Childcare Partnership Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "relative overflow-hidden rounded-2xl",
              "bg-gradient-to-br from-primary/10 via-card/80 to-card/60",
              "border border-primary/20 backdrop-blur-sm",
              "p-8 md:p-10"
            )}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Baby className="w-6 h-6 text-primary" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Heart className="w-3 h-3" />
                  <span>Complimentary Childcare</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Focus on Learning, We've Got Your Kids Covered
              </h2>
              
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Black Tech Street has partnered with <strong className="text-foreground">Jovie of Tulsa</strong> to provide 
                professional on-site childcare at no cost during our AI workshops—so you can fully engage 
                without worrying about your little ones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Fully Vetted Staff</p>
                    <p className="text-xs text-muted-foreground">CPR/FA certified & background checked</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Experienced Nannies</p>
                    <p className="text-xs text-muted-foreground">Professional childcare experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Age-Appropriate Activities</p>
                    <p className="text-xs text-muted-foreground">Safe & structured environment</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.jovie.com/resources-faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Learn More About Jovie
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="mailto:TulsaOK@jovie.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:border-primary/50 text-foreground font-medium transition-colors"
                >
                  Contact: TulsaOK@jovie.com
                </a>
              </div>

              <p className="mt-6 text-sm text-muted-foreground italic">
                Indicate your childcare needs during registration to reserve your spot.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Questions?
            </h2>
            <p className="text-muted-foreground">
              Have questions about our workshops or need accessibility accommodations? We're here to help.
            </p>
            <a
              href="mailto:contact@blacktechstreet.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
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
