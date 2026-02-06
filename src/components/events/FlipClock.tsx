import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import './FlipClock.css';

interface FlipCardProps {
  value: number;
  label: string;
}

const FlipCard = memo(function FlipCard({ value, label }: FlipCardProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCurrentValue(value);
      setPreviousValue(value);
      return;
    }

    if (value !== currentValue) {
      // Start the flip animation
      setPreviousValue(currentValue);
      setIsFlipping(true);
      
      // Update the displayed value mid-animation
      const updateTimer = setTimeout(() => {
        setCurrentValue(value);
      }, 300); // Half of the animation duration

      // End the animation
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
      }, 600);

      return () => {
        clearTimeout(updateTimer);
        clearTimeout(endTimer);
      };
    }
  }, [value, currentValue]);

  const formatValue = (val: number) => String(val).padStart(2, '0');

  return (
    <div className="flip-clock-item">
      <div className="flip-clock-card">
        {/* Static top half - shows current value */}
        <div className="flip-card-static-top">
          <span className="flip-card-number">{formatValue(currentValue)}</span>
        </div>
        
        {/* Static bottom half - shows current value */}
        <div className="flip-card-static-bottom">
          <span className="flip-card-number">{formatValue(currentValue)}</span>
        </div>
        
        {/* Animated top flap - flips down, starts showing old value, ends showing new */}
        <div className={cn("flip-card-flap-top", isFlipping && "flipping")}>
          <span className="flip-card-number">{formatValue(isFlipping ? previousValue : currentValue)}</span>
        </div>
        
        {/* Animated bottom flap - flips up to reveal, shows new value */}
        <div className={cn("flip-card-flap-bottom", isFlipping && "flipping")}>
          <span className="flip-card-number">{formatValue(currentValue)}</span>
        </div>
        
        {/* Center divider */}
        <div className="flip-card-divider" />
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