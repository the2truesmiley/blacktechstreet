import { EmailCapture } from '@/components/email/EmailCapture';
import { headingMd } from './styles';

export function ResearchSignup() {
  return (
    <section aria-labelledby="research-signup" className="mt-16 md:mt-20">
      <div className="rounded-2xl border border-border bg-card px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2 id="research-signup" className={`${headingMd} text-xl md:text-2xl`}>
          Get new research when it drops
        </h2>
        <EmailCapture
          source="research-updates"
          buttonLabel="Subscribe"
          successMessage="You're on the list. We'll email you when new research is published."
          className="md:max-w-md"
        />
      </div>
    </section>
  );
}
