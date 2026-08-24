import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { Camera, Calendar, Loader2, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGalleryPhotos, useGalleryTags, filterPhotosByTag } from '@/hooks/useGalleryPhotos';
import { format } from 'date-fns';
import { useSEO } from '@/hooks/useSEO';
import { thumbUrl } from '@/lib/imageUrl';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Gallery() {
  useSEO({
    title: 'Gallery | Black Tech Street',
    description: 'Photos from Black Tech Street workshops, events, and community gatherings in Greenwood, Tulsa.',
    canonical: 'https://blacktechstreet.ai/gallery',
  });

  const [activeTag, setActiveTag] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data: photos, isLoading, error } = useGalleryPhotos();
  const tags = useGalleryTags(photos);
  const filteredPhotos = filterPhotosByTag(photos, activeTag);
  const activePhoto = activeIndex === null ? null : filteredPhotos[activeIndex] ?? null;

  const step = (delta: number) => {
    if (activeIndex === null || filteredPhotos.length === 0) return;
    const next = (activeIndex + delta + filteredPhotos.length) % filteredPhotos.length;
    setActiveIndex(next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      
      <main className="relative">
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
                  viewport={{ once: true, margin: '150px 0px' }}
                  transition={{ delay: Math.min(index, 6) * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                  layout
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View photo: ${item.title}`}
                    className={cn(
                      "relative block w-full aspect-[4/3] rounded-2xl overflow-hidden text-left",
                      "bg-secondary/50 border border-border/40 cursor-zoom-in",
                      "hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      "transition-all duration-500"
                    )}
                  >
                    {/* Image */}
                    <img
                      src={thumbUrl(item.image_url, 800)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Subtle gradient only on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Zoom affordance */}
                    <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </span>

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
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>

      {/* Lightbox */}
      <Dialog open={activePhoto !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-5xl border-border/40 bg-background/95 p-3 sm:p-4">
          {activePhoto && (
            <>
              <DialogTitle className="sr-only">{activePhoto.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Photo from {format(new Date(activePhoto.event_date), 'MMMM d, yyyy')}
              </DialogDescription>

              <div className="relative flex items-center justify-center">
                <img
                  src={thumbUrl(activePhoto.image_url, 1600, 80)}
                  alt={activePhoto.title}
                  className="max-h-[75vh] w-auto rounded-xl object-contain"
                />

                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="px-1 pt-3">
                <h2 className="font-display text-base font-semibold text-foreground">
                  {activePhoto.title}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(activePhoto.event_date), 'MMMM d, yyyy')}
                  {activePhoto.location ? ` · ${activePhoto.location}` : ''}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="relative z-10 px-5 max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
}
