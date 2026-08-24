import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { useSEO } from '@/hooks/useSEO';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy | Black Tech Street',
    description:
      'How Black Tech Street collects, uses, and protects the personal information you share through our website, workshop registrations, and email updates.',
    canonical: 'https://blacktechstreet.ai/privacy',
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      <main className="pt-32 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: August 24, 2026</p>

          <div className="space-y-8 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Who we are</h2>
              <p className="text-muted-foreground">
                Black Tech Street is a nonprofit organization based in Tulsa, Oklahoma, working to rebuild
                Historic Greenwood as an AI powered economy. This policy explains what we do with the
                information you give us on this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Information we collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  <span className="text-foreground">Contact details you submit.</span> Name, email address,
                  and any answers you provide when you register for an ASPIRE workshop, contact us, or ask for
                  updates.
                </li>
                <li>
                  <span className="text-foreground">Basic usage data.</span> Pages visited, referring site,
                  device and browser type, collected through standard web analytics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">How we use it</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>To confirm and manage your workshop or event registration.</li>
                <li>To answer questions you send us.</li>
                <li>To let you know when new programs, workshops, or opportunities open up.</li>
                <li>To understand which pages and programs people find useful.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                We do not sell your personal information, and we do not share it with third parties for their
                own marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Service providers</h2>
              <p className="text-muted-foreground">
                We use trusted providers to operate this site and our programs, including form and registration
                tools, database and hosting services, email delivery, and website analytics. These providers
                process information only on our behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Photography at events</h2>
              <p className="text-muted-foreground">
                We photograph and record our workshops and community events, and we may publish those images on
                this website and our social channels. If you would prefer not to appear, tell staff at the event
                or email us and we will remove you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Your choices</h2>
              <p className="text-muted-foreground">
                You can ask us to correct or delete your information, or to stop sending you updates, at any
                time. Email{' '}
                <a
                  href="mailto:contact@blacktechstreet.com"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  contact@blacktechstreet.com
                </a>{' '}
                and we will take care of it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Children</h2>
              <p className="text-muted-foreground">
                Programs for minors are registered by a parent or guardian. We do not knowingly collect
                information directly from children under 13 without that consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Changes to this policy</h2>
              <p className="text-muted-foreground">
                If we update this policy, we will change the date above. Material changes will be noted on this
                page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Contact us</h2>
              <p className="text-muted-foreground">
                Questions about privacy? Email{' '}
                <a
                  href="mailto:contact@blacktechstreet.com"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  contact@blacktechstreet.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
