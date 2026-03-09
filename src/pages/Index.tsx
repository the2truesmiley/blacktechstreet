import { TechBackground } from '@/components/timeline/TechBackground';
import { TimelineProgress } from '@/components/timeline/TimelineProgress';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { TimelineHero } from '@/components/timeline/TimelineHero';

import { AspireCtaBanner } from '@/components/timeline/AspireCtaBanner';
import { SocialSection } from '@/components/timeline/SocialSection';

import { TestimonialsSection } from '@/components/timeline/TestimonialsSection';
import { FinalCTASection } from '@/components/timeline/FinalCTASection';
import { Footer } from '@/components/timeline/Footer';
import { BackToTopButton } from '@/components/timeline/BackToTopButton';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'Black Tech Street | Rebirthing Historic Black Wall Street',
    description: "Explore Black Tech Street's journey rebirthing Historic Black Wall Street as a world-class AI innovation economy in Greenwood, Tulsa.",
    canonical: 'https://blacktechstreet.com/',
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Tech background with matrix effect */}
      <TechBackground isVisible={true} />
      
      {/* Fixed navigation bar */}
      <TopNavBar variant="home" />
      
      {/* Scroll progress bar */}
      <TimelineProgress />

      {/* Hero section (unchanged Matrix-style) */}
      <TimelineHero />

      {/* ASPIRE March CTA */}
      <AspireCtaBanner />

      {/* Main content */}
      <main className="relative z-10 px-5 pb-20 max-w-5xl mx-auto">
        {/* Testimonials */}
        <TestimonialsSection />

        {/* Social section with Instagram */}
        <SocialSection />
      </main>

      {/* Final CTA */}
      <FinalCTASection />

      {/* Enhanced Footer */}
      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>

      {/* Back to top button */}
      <BackToTopButton />
    </div>
  );
};

export default Index;
