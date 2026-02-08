import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGalleryPhotos } from '@/hooks/useGalleryPhotos';
import { Loader2 } from 'lucide-react';

export function PhotoGallerySection() {
  const { data: photos, isLoading } = useGalleryPhotos();
  
  // Show latest 6 photos on home page
  const displayPhotos = photos?.slice(0, 6) || [];

  return (
    <section id="gallery-section" className="py-16 border-b border-border/30">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-display font-bold text-center mb-10 text-foreground"
      >
        Our Community in Action
      </motion.h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayPhotos.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "group relative aspect-square rounded-xl overflow-hidden cursor-pointer",
                "bg-secondary/50 border border-border/40",
                "hover:border-primary/50 transition-all duration-300"
              )}
            >
              {/* Image */}
              <img
                src={item.image_url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <span className="text-xs text-muted-foreground">{new Date(item.event_date).toLocaleDateString()}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted-foreground text-sm mt-6"
      >
        Photos from our workshops, events, and community gatherings
      </motion.p>
    </section>
  );
}
