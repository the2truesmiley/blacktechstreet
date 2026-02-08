import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Camera, Calendar, MapPin } from 'lucide-react';
import aspireCertificateCeremony from '@/assets/gallery/aspire-certificate-ceremony.jpg';
import eventEntrance from '@/assets/gallery/event-entrance.png';
import communityGathering from '@/assets/gallery/community-gathering.jpg';
import tyranceSpeaking from '@/assets/gallery/tyrance-speaking.jpg';
import aspireWorkshop from '@/assets/gallery/aspire-workshop.jpg';

const galleryItems = [
  { id: 1, title: 'ASPIRE Certificate Ceremony', category: 'ASPIRE', date: '2024', location: 'Langston University', image: aspireCertificateCeremony },
  { id: 2, title: 'Event Arrival', category: 'Events', date: '2024', location: 'Greenwood, Tulsa', image: eventEntrance },
  { id: 3, title: 'Community Gathering', category: 'Community', date: '2024', location: 'Greenwood, Tulsa', image: communityGathering },
  { id: 4, title: 'Leadership Keynote', category: 'Events', date: '2024', location: 'Greenwood, Tulsa', image: tyranceSpeaking },
  { id: 5, title: 'ASPIRE Workshop Session', category: 'ASPIRE', date: '2024', location: 'Langston University', image: aspireWorkshop },
];

const categories = ['All', 'Events', 'ASPIRE', 'Community'];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Photo Gallery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Our Community</span>{' '}
              <span className="text-primary">in Action</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Capturing moments from our workshops, events, and community gatherings 
              as we rebuild Historic Black Wall Street.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-5 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/60 border border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-5 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className={cn(
                  "relative aspect-[4/3] rounded-2xl overflow-hidden",
                  "bg-secondary/50 border border-border/40",
                  "hover:border-primary/50 transition-all duration-500"
                )}>
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
