import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Car, Laptop, Baby } from 'lucide-react';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Button } from '@/components/ui/button';
import { EventJsonLd } from '@/components/seo/EventJsonLd';
import { useSEO } from '@/hooks/useSEO';
import { aspireEvents2026 } from '@/data/aspireEvents';
import { aspireNearbyCities, decemberVenue, nearbyCityPath, nearbyCityTitle, nearbyCityDescription, nearbyCityDirections } from '@/data/aspireNearbyCities';
import NotFound from '@/pages/NotFound';
import workshopPhoto from '@/assets/gallery/dec-2025-ai-workshop-full-room.jpg';

export default function AspireNearbyCity() {
  const { city: slug } = useParams();
  const city = aspireNearbyCities.find(item => item.slug === slug);
  const event = aspireEvents2026.find(item => item.id === 'december-2026');
  const canonical = `https://blacktechstreet.ai${nearbyCityPath(city?.slug ?? '')}`;
  useSEO({
    title: city ? nearbyCityTitle(city.name) : 'Page Not Found | Black Tech Street',
    description: city ? nearbyCityDescription(city.name) : 'This page could not be found.',
    canonical,
    ogUrl: canonical,
  });
  if (!city || !event) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      <EventJsonLd name="ASPIRE AI Workshop" description={nearbyCityDescription(city.name)} startDate="2026-12-05T10:00:00-06:00" endDate="2026-12-05T18:00:00-06:00" location={decemberVenue} url={canonical} />
      <main>
        <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
          <img src={workshopPhoto} alt="An ASPIRE AI Workshop at Langston Tulsa" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
          <div className="relative max-w-5xl mx-auto px-5 space-y-5">
            <p className="text-primary font-medium">For {city.name} residents</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">ASPIRE AI Workshop</h1>
            <p className="text-xl max-w-xl">Join the last ASPIRE AI Workshop of 2026.</p>
            <p className="text-muted-foreground max-w-xl leading-relaxed">Coming from {city.name}? You’re welcome at our free, hands-on AI workshop in Tulsa’s Greenwood District. The event takes place at Langston Tulsa, not in {city.name}.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />December 5, 2026</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{event.time}</span>
            </div>
            <Button asChild size="lg"><a href={event.directRegistrationUrl} target="_blank" rel="noopener noreferrer">Register for free<ArrowRight /></a></Button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
          <h2 className="text-2xl font-display font-bold mb-6">Plan your visit from {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <a href={nearbyCityDirections(city.name)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-primary">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span><strong className="block">{decemberVenue.name}</strong><span className="text-muted-foreground">{decemberVenue.address}</span></span>
              </a>
              <p className="text-muted-foreground leading-relaxed">Set aside the full day, 10:00 AM to 6:00 PM. Check your trip from {city.name} before leaving and review the parking details for arrival.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline"><a href={nearbyCityDirections(city.name)} target="_blank" rel="noopener noreferrer"><MapPin />Get directions</a></Button>
                <Button asChild variant="outline"><Link to="/aspire/parking"><Car />Parking details</Link></Button>
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="text-lg font-display font-semibold">Practical skills, without the cost</h3>
              <p className="text-muted-foreground leading-relaxed">Practice with AI tools and learn responsible ways to use them in your work. Registration is free for attendees from {city.name} and across the Tulsa area.</p>
              <p className="flex items-center gap-3"><Baby className="w-5 h-5 text-primary shrink-0" />Free on-site childcare</p>
              <p className="flex items-center gap-3"><Laptop className="w-5 h-5 text-primary shrink-0" />Laptops available to borrow at no cost</p>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-10">
          <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
            <div><h2 className="text-xl font-display font-semibold">Make December 5 your next step</h2><p className="text-muted-foreground mt-2">One workshop. Real skills to take back to {city.name}.</p></div>
            <Button asChild size="lg"><a href={event.directRegistrationUrl} target="_blank" rel="noopener noreferrer">Register for free<ArrowRight /></a></Button>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-5 py-6"><Button asChild variant="link" className="px-0"><Link to="/aspire/events/december-2026">View full workshop details<ArrowRight /></Link></Button></div>
      </main>
      <Footer />
    </div>
  );
}