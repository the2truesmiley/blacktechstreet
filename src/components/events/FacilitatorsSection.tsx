import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
} as const;

interface Facilitator {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
}

const facilitators: Facilitator[] = [
  {
    name: "Tyrance Billingsley II",
    role: "Founder & CEO",
    bio: "Tulsa-born visionary leading ASPIRE workshops to make AI fluency accessible to all. Featured speaker at the White House and U.S. Senate on AI and the future of work.",
    linkedin: "https://www.linkedin.com/in/tyrance-billingsley-ii-ab0683123/",
    twitter: "https://twitter.com/TyranceBii",
  },
];

export function FacilitatorsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <div className="max-w-6xl mx-auto px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Your Guides
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Meet Your Facilitator
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Learn from passionate educators and industry practitioners who are committed to making AI accessible to everyone.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {facilitators.map((facilitator, index) => (
            <motion.div
              key={facilitator.name}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className={cn(
                "relative p-8 rounded-2xl max-w-md w-full",
                "bg-card/50 backdrop-blur-sm border border-border/40",
                "group cursor-default"
              )}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
                }}
              />
              
              {/* Border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ boxShadow: "inset 0 0 0 1px transparent" }}
                whileHover={{ boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.3)" }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative text-center">
                {/* Avatar */}
                <motion.div
                  className="mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-32 h-32 mx-auto ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
                    {facilitator.image ? (
                      <AvatarImage src={facilitator.image} alt={facilitator.name} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                      {facilitator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                {/* Name & Role */}
                <h3 className="text-xl font-display font-bold mb-1">
                  {facilitator.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {facilitator.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {facilitator.bio}
                </p>

                {/* Social Links */}
                {(facilitator.linkedin || facilitator.twitter) && (
                  <div className="flex items-center justify-center gap-3">
                    {facilitator.linkedin && (
                      <motion.a
                        href={facilitator.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`${facilitator.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                    )}
                    {facilitator.twitter && (
                      <motion.a
                        href={facilitator.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`${facilitator.name}'s Twitter`}
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
