import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { testimonials } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function EventTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Autoplay
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <div className="max-w-6xl mx-auto px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            What People Are Saying
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Hear from community members who have experienced the ASPIRE AI workshops firsthand.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav Buttons */}
          <button
            onClick={scrollPrev}
            className={cn(
              "absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "hover:bg-primary/10 hover:border-primary/30 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={scrollNext}
            className={cn(
              "absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "hover:bg-primary/10 hover:border-primary/30 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden mx-6 md:mx-8" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "relative p-6 rounded-xl h-full",
                      "bg-card/50 backdrop-blur-sm border border-border/40",
                      "group cursor-default"
                    )}
                  >
                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
                      }}
                    />
                    
                    {/* Quote icon */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Quote className="w-4 h-4 text-primary" />
                    </div>

                    <div className="relative pt-2">
                      <p className="text-foreground/90 text-sm leading-relaxed mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {testimonial.author}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
