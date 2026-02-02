import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { aspireEvents2026, getEventByDate } from '@/data/aspireEvents';

interface EventCalendarProps {
  onEventClick: (eventId: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function EventCalendar({ onEventClick }: EventCalendarProps) {
  const [viewMode, setViewMode] = useState<'year' | 'month'>('year');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));

  const eventDates = aspireEvents2026.map(e => e.date);

  const isEventDate = (date: Date) => {
    return eventDates.some(eventDate => isSameDay(eventDate, date));
  };

  const handleDateClick = (date: Date) => {
    const event = getEventByDate(date);
    if (event) {
      onEventClick(event.id);
    }
  };

  const renderMonthGrid = (monthDate: Date, compact = false) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const startDay = getDay(start);

    // Create empty cells for days before the month starts
    const emptyCells = Array(startDay).fill(null);

    return (
      <div className={cn(
        "bg-card/50 backdrop-blur-sm rounded-lg border border-border/40 p-3",
        compact ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "font-display font-semibold text-foreground mb-2",
          compact ? "text-sm" : "text-lg"
        )}>
          {format(monthDate, compact ? 'MMM' : 'MMMM yyyy')}
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map(day => (
            <div 
              key={day} 
              className={cn(
                "text-center text-muted-foreground font-medium",
                compact ? "text-[10px]" : "text-xs"
              )}
            >
              {compact ? day[0] : day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className={compact ? "h-5" : "h-8"} />
          ))}
          {days.map(day => {
            const hasEvent = isEventDate(day);
            return (
              <button
                key={day.toISOString()}
                onClick={() => hasEvent && handleDateClick(day)}
                disabled={!hasEvent}
                className={cn(
                  "flex items-center justify-center rounded-md transition-all duration-200",
                  compact ? "h-5 w-5 text-[10px]" : "h-8 w-8 text-sm",
                  hasEvent 
                    ? "bg-primary text-primary-foreground font-bold cursor-pointer hover:bg-primary/80 shadow-md shadow-primary/30 animate-pulse"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Year view - 4x3 grid of all months
  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1));

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {months.map((month, index) => (
          <motion.div
            key={month.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {renderMonthGrid(month, true)}
          </motion.div>
        ))}
      </div>
    );
  };

  // Single month view with navigation
  const renderMonthView = () => {
    return (
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-display font-semibold text-lg">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {renderMonthGrid(currentMonth)}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={viewMode === 'year' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('year')}
        >
          Year View
        </Button>
        <Button
          variant={viewMode === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('month')}
        >
          Month View
        </Button>
      </div>

      {/* Calendar Legend */}
      <div className="flex justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary shadow-md shadow-primary/30" />
          <span>ASPIRE Workshop</span>
        </div>
      </div>

      {/* Calendar */}
      {viewMode === 'year' ? renderYearView() : renderMonthView()}
    </div>
  );
}
