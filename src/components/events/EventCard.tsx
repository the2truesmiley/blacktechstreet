import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AspireEvent } from '@/data/aspireEvents';

interface EventCardProps {
  event: AspireEvent;
  index: number;
  onRegister: (event: AspireEvent) => void;
}

export function EventCard({ event, index, onRegister }: EventCardProps) {
  const statusConfig = {
    'registration-open': {
      label: 'Registration Open',
      className: 'bg-primary/20 text-primary border-primary/30'
    },
    'upcoming': {
      label: 'Upcoming',
      className: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    'sold-out': {
      label: 'Sold Out',
      className: 'bg-destructive/20 text-destructive border-destructive/30'
    }
  };

  const status = statusConfig[event.status];

  return (
    <motion.div
      id={event.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-card/70 backdrop-blur-sm border border-border/40",
        "hover:border-primary/50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        {/* Status Badge */}
        <Badge variant="outline" className={cn("text-xs", status.className)}>
          {status.label}
        </Badge>

        {/* Date Display */}
        <div className="space-y-1">
          <div className="text-4xl font-display font-bold text-foreground">
            {format(event.date, 'MMM d')}
          </div>
          <div className="text-lg text-muted-foreground">
            {format(event.date, 'EEEE, yyyy')}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{event.locationFull}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{event.title}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            onClick={() => onRegister(event)}
            disabled={event.status === 'sold-out'}
            className="w-full"
            size="lg"
          >
            {event.status === 'sold-out' ? 'Sold Out' : 'Register Now'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
