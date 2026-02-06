import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import './FlipClock.css';

interface FlipCardProps {
  value: number;
  label: string;
}

// Simplified flip card - no complex animations that cause stacking
const FlipCard = memo(function FlipCard({ value, label }: FlipCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 300);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const formattedValue = String(value).padStart(2, '0');

  return (
    <div className="flip-clock-item">
      <div className={cn("flip-clock-card", isFlipping && "flipping")}>
        {/* Top half - shows top portion of number */}
        <div className="flip-clock-top">
          <span>{formattedValue}</span>
        </div>
        
        {/* Bottom half - shows bottom portion of number */}
        <div className="flip-clock-bottom">
          <span>{formattedValue}</span>
        </div>
      </div>
      <span className="flip-clock-label">{label}</span>
    </div>
  );
});

interface FlipClockProps {
  targetDate: Date;
  className?: string;
}

export function FlipClock({ targetDate, className }: FlipClockProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flip-clock", className)}>
      <FlipCard value={timeLeft.days} label="Days" />
      <FlipCard value={timeLeft.hours} label="Hours" />
      <FlipCard value={timeLeft.minutes} label="Mins" />
      <FlipCard value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function calculateTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = Math.max(0, target - now);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
