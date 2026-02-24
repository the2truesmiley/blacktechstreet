import { motion } from 'framer-motion';

export function GreenwoodLegacySection() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p className="text-xl text-foreground font-medium">
            In the early 20th century, Tulsa's Greenwood District was home to one of
            the most prosperous Black communities in the United States.
          </p>
          <p>
            Known as Black Wall Street, Greenwood had hundreds of Black-owned
            businesses, including banks, hotels, theaters, and hospitals. It showed
            what was possible when a community invested in itself.
          </p>
          <p>
            Today, Black Tech Street carries that legacy forward. We focus on
            artificial intelligence, cybersecurity, and emerging technologies to
            ensure our community helps shape the future economy, not just
            participate in it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
