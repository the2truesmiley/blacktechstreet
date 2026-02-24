import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { testimonials } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold">
          <span className="text-primary">Testimonials</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-2xl" />
        
        {/* Main testimonial card */}
        <div className="relative bg-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          {/* Quote icon with sparkle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Quote className="h-12 w-12 md:h-16 md:w-16 text-primary/20" />
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Testimonial content */}
          <div className="relative min-h-[200px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <p className="text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed mb-6 italic max-w-2xl mx-auto">
                  "{testimonials[activeIndex].quote}"
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-primary/60" />
                  <span className="text-lg font-display font-semibold text-primary">
                    {testimonials[activeIndex].author}
                  </span>
                  <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-primary/60" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "transition-all duration-300",
                    activeIndex === index
                      ? "w-8 h-2 bg-primary rounded-full"
                      : "w-2 h-2 bg-primary/30 rounded-full hover:bg-primary/50"
                  )}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mini quote cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8"
      >
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <motion.button
            key={testimonial.author}
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveIndex(index);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "p-4 rounded-xl border text-left transition-all duration-300",
              activeIndex === index
                ? "bg-primary/10 border-primary/40"
                : "bg-card/40 border-border/30 hover:border-primary/20"
            )}
          >
            <Quote className="h-4 w-4 text-primary/40 mb-2" />
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {testimonial.quote.slice(0, 60)}...
            </p>
            <span className="text-xs font-medium text-primary">{testimonial.author}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
