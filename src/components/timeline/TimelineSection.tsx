import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { timelineItems } from '@/data/timeline';
import { TimelineCard } from './TimelineCard';

export function TimelineSection() {
  // Group items by year
  const groupedItems = useMemo(() => {
    const groups: { year: number; items: typeof timelineItems }[] = [];
    let currentYear: number | null = null;
    
    [...timelineItems]
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach((item) => {
        if (item.year !== currentYear) {
          currentYear = item.year;
          groups.push({ year: item.year, items: [item] });
        } else {
          groups[groups.length - 1].items.push(item);
        }
      });
    
    return groups;
  }, []);

  return (
    <section id="timeline-section" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Timeline
        </h2>
      </motion.div>

      <div className="space-y-8">
        {groupedItems.map((group) => (
          <motion.div 
            key={group.year}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Year divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <span className="text-lg font-display font-bold text-primary">
                {group.year}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
            </div>

            {/* Timeline cards */}
            <div className="space-y-1">
              {group.items.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
