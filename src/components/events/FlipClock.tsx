import { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import './FlipClock.css';

interface FlipCardProps {
  value: number;
  label: string;
}

const FlipCard = memo(function FlipCard({ value, label }: FlipCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [flipKey, setFlipKey] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayValue(value);
      setPreviousValue(value);
      return;
    }

    if (value !== displayValue) {
      // Store the old value for the flip animation
      setPreviousValue(displayValue);
      // Update to new value
      setDisplayValue(value);
      // Trigger new flip animation by changing key
      setFlipKey(prev => prev + 1);
    }
  }, [value, displayValue]);

  const formatValue = (val: number) => String(val).padStart(2, '0');

  return (
    <div className="flip-clock-item">
      <div className="flip-clock-card">
        {/* Layer 1: Static back showing NEW value (revealed after flip) */}
        <div className="flip-card-upper-back">
          <span className="flip-card-number">{formatValue(displayValue)}</span>
        </div>
        <div className="flip-card-lower-back">
          <span className="flip-card-number">{formatValue(displayValue)}</span>
        </div>
        
        {/* Layer 2: Upper flap - shows OLD value, flips DOWN and away */}
        <div 
          key={`upper-${flipKey}`}
          className={cn("flip-card-upper-flap", flipKey > 0 && "animate-flip-down")}
        >
          <span className="flip-card-number">{formatValue(previousValue)}</span>
        </div>
        
        {/* Layer 3: Lower flap - shows NEW value, flips DOWN into view */}
        <div 
          key={`lower-${flipKey}`}
          className={cn("flip-card-lower-flap", flipKey > 0 && "animate-flip-reveal")}
        >
          <span className="flip-card-number">{formatValue(displayValue)}</span>
        </div>
        
        {/* Center divider line */}
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