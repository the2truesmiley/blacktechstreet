import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Camera, Calendar, Loader2 } from 'lucide-react';
import { useGalleryPhotos, useGalleryTags, filterPhotosByTag } from '@/hooks/useGalleryPhotos';
import { format } from 'date-fns';
import { useSEO } from '@/hooks/useSEO';

export default function Gallery() {
  useSEO({
    title: 'Gallery | Black Tech Street',
    description: 'Photos from Black Tech Street workshops, events, and community gatherings in Greenwood, Tulsa.',
    canonical: 'https://blacktechstreet.com/gallery',
  });

  const [activeTag, setActiveTag] = useState('All');
  const { data: photos, isLoading, error } = useGalleryPhotos();
  const tags = useGalleryTags(photos);
  const filteredPhotos = filterPhotosByTag(photos, activeTag);

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

      {/* Tag Filter */}
      <section className="px-5 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/60 border border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-5 pb-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-muted-foreground">
              Failed to load gallery photos
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                  layout
                >
                  <div className={cn(
                    "relative aspect-[4/3] rounded-2xl overflow-hidden",
                    "bg-secondary/50 border border-border/40",
                    "hover:border-primary/50 transition-all duration-500"
                  )}>
                    {/* Image */}
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Subtle gradient only on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content overlay — visible only on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(item.event_date), 'MMMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
