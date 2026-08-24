import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { useSEO } from '@/hooks/useSEO';

export default function Terms() {
  useSEO({
    title: 'Terms of Use | Black Tech Street',
    description:
      'The terms that apply when you use the Black Tech Street website, register for an ASPIRE workshop, or submit information to us.',
    canonical: 'https://blacktechstreet.ai/terms',
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      <main className="pt-32 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Terms of Use</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: August 24, 2026</p>

          <div className="space-y-8 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Using this site</h2>
              <p className="text-muted-foreground">
                This website is operated by Black Tech Street. By using it you agree to these terms. Please do
                not attempt to disrupt the site, misuse our forms, or access data that is not yours.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Program and event registration</h2>
              <p className="text-muted-foreground">
                Registering for a workshop reserves a seat but does not guarantee attendance if capacity is
                reached. Dates, locations, facilitators, and agendas may change. We will communicate changes to
                registered participants by email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Content and trademarks</h2>
              <p className="text-muted-foreground">
                Text, images, curriculum, logos, and branding on this site belong to Black Tech Street or to the
                partner organizations credited. Partner logos are used with permission and remain the property
                of their owners. Do not reuse our materials commercially without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Third party links and tools</h2>
              <p className="text-muted-foreground">
                We link to partner sites and use third party tools for registration forms and maps. We are not
                responsible for the content or practices of those sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">No warranty</h2>
              <p className="text-muted-foreground">
                Information on this site is provided as is for general and educational purposes. Training
                content, including AI guidance, is educational and is not legal, financial, or professional
                advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Privacy</h2>
              <p className="text-muted-foreground">
                Information you submit is handled as described in our{' '}
                <a
                  href="/privacy"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">
                Questions about these terms? Email{' '}
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
