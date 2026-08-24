import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmailCapture } from './EmailCapture';

export function ResourceUnlockCard() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '150px 0px' }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Free guide: Using AI at work
          </h2>
        </div>
        <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-2xl">
          A one-page starter guide on using AI practically, ethically, and effectively in the workplace,
          pulled straight from our ASPIRE workshop curriculum. Tell us where to send it and read it right away.
        </p>

        {unlocked ? (
          <Link
            to="/resources/ai-at-work"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read the guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <>
            <EmailCapture
              source="resource-guide"
              detail="ai-at-work-guide"
              buttonLabel="Send me the guide"
              successMessage="Guide unlocked below."
              onSuccess={() => setUnlocked(true)}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              We'll also let you know when new programs and workshops open up.
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}
