import { motion } from 'framer-motion';
import { BellRing } from 'lucide-react';
import { EmailCapture } from './EmailCapture';

interface EventAlertsSectionProps {
  detail?: string;
}

export function EventAlertsSection({ detail = 'aspire-workshops' }: EventAlertsSectionProps) {
  return (
    <section className="py-16 relative">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '150px 0px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border/40 bg-secondary/20 p-6 md:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BellRing className="h-5 w-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Get notified when the next workshop opens
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base mb-6">
            Seats fill fast. Add your email and we'll send you a heads up the moment registration opens
            for the next ASPIRE AI Workshop.
          </p>
          <EmailCapture
            source="event-alerts"
            detail={detail}
            showName
            buttonLabel="Notify me"
            successMessage="Locked in. You'll hear from us as soon as the next workshop opens."
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Workshop announcements only. No spam, and you can ask us to remove you any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
