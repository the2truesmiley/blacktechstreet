import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { TechBackground } from '@/components/timeline/TechBackground';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
} as const;

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Black Tech Street';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Let's Build the{' '}
              <span className="text-primary">Future Together</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about our programs, partnerships, or how to get involved? 
              We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Connect With Us
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you're interested in sponsoring our events, joining our programs, 
                  or simply learning more about what we do, reach out and let's start a conversation.
                </p>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="mailto:contact@blacktechstreet.com"
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl",
                  "bg-secondary/30 border border-border/40",
                  "hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
                )}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-primary">contact@blacktechstreet.com</p>
                </div>
              </motion.a>

              <motion.div
                variants={itemVariants}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl",
                  "bg-secondary/30 border border-border/40"
                )}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Historic Greenwood District</p>
                  <p className="text-muted-foreground">Tulsa, Oklahoma</p>
                </div>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                variants={itemVariants}
                className="relative p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <p className="relative text-foreground font-medium italic">
                  "The future of tech starts in Greenwood."
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                action="mailto:contact@blacktechstreet.com"
                method="GET"
                encType="text/plain"
                className={cn(
                  "p-8 rounded-2xl",
                  "bg-secondary/20 border border-border/40",
                  "backdrop-blur-sm"
                )}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send a Message
                </h2>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="body"
                      placeholder="Tell us more..."
                      rows={5}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
