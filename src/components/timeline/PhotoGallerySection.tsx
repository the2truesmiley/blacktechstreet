import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryItems = [
  { id: 1, title: 'ASPIRE Workshop', description: 'GenAI Fluency Lab Session' },
  { id: 2, title: 'Community Gathering', description: 'Tech professionals networking' },
  { id: 3, title: 'NVIDIA Partnership', description: 'MOU signing ceremony' },
  { id: 4, title: 'Hack the Future', description: 'AI challenge participants' },
  { id: 5, title: 'Certificate Ceremony', description: 'Program graduates celebration' },
  { id: 6, title: 'White House Visit', description: 'National Cyber Director event' },
];

export function PhotoGallerySection() {
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item, index) => (
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
            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Image className="w-6 h-6 text-primary/60" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Corner accent */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

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
