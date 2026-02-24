import { useEffect } from 'react';
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

const Index = () => {
  // Set SEO meta tags
  useEffect(() => {
    document.title = 'Black Tech Street | Rebirthing Historic Black Wall Street';
    
    const updateOrCreateMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attr}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateMeta('description', 'Explore Black Tech Street\'s journey rebirthing Historic Black Wall Street as a world-class AI innovation economy in Greenwood, Tulsa.', true);
    updateOrCreateMeta('og:title', 'Black Tech Street | Rebirthing Historic Black Wall Street');
    updateOrCreateMeta('og:description', 'Explore Black Tech Street\'s journey rebirthing Historic Black Wall Street as a world-class AI innovation economy.');
    updateOrCreateMeta('og:type', 'website');
    
    updateOrCreateMeta('twitter:card', 'summary_large_image', true);
    updateOrCreateMeta('twitter:title', 'Black Tech Street | Timeline', true);
    updateOrCreateMeta('twitter:description', 'Explore Black Tech Street\'s journey rebirthing Historic Black Wall Street as a world-class innovation economy.', true);
  }, []);

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
        {/* Social section with Instagram */}
        <SocialSection />


        {/* Testimonials */}
        <TestimonialsSection />
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
