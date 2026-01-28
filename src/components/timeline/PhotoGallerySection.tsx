import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import speakerPresentation from '@/assets/speaker_presentation.jpg';
import teamGroupPhoto from '@/assets/team_group_photo.jpg';

const galleryItems = [
  { id: 1, title: 'Leadership Presentation', image: speakerPresentation },
  { id: 2, title: 'Community Gathering', image: teamGroupPhoto },
  { id: 3, title: 'ASPIRE Workshop', image: speakerPresentation },
  { id: 4, title: 'Hack the Future', image: teamGroupPhoto },
  { id: 5, title: 'Certificate Ceremony', image: speakerPresentation },
  { id: 6, title: 'Tech Summit', image: teamGroupPhoto },
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
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Corner accent */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
