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
      // Store the old value and start flipping
      setPreviousValue(currentValue);
      setIsFlipping(true);
      
      // Update to new value partway through animation
      const updateTimer = setTimeout(() => {
        setCurrentValue(value);
      }, 300); // Halfway through the 600ms animation

      // End the flip animation
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
        setPreviousValue(value);
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
        {/* Static top half - always shows current number */}
        <div className="flip-card-top">
          <span>{formatValue(currentValue)}</span>
        </div>
        
        {/* Static bottom half - always shows current number */}
        <div className="flip-card-bottom">
          <span>{formatValue(currentValue)}</span>
        </div>

        {/* Animated top flap - flips DOWN showing old → new */}
        <div className={cn("flip-card-flap-top", isFlipping && "flipping")}>
          <div className="flap-face flap-front">
            <span>{formatValue(previousValue)}</span>
          </div>
          <div className="flap-face flap-back">
            <span>{formatValue(currentValue)}</span>
          </div>
        </div>

        {/* Animated bottom flap - flips DOWN from hidden to visible */}
        <div className={cn("flip-card-flap-bottom", isFlipping && "flipping")}>
          <div className="flap-face flap-front">
            <span>{formatValue(currentValue)}</span>
          </div>
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
