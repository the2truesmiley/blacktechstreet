import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import logoCircuit from '@/assets/logo_b_circuit.png';

// Hero slideshow photos — curated 12-shot selection
// Tells the full BTS story: leadership → scale → teaching → community → achievement → mentorship
import heroImg1  from '@/assets/gallery/tyrance-speaking.jpg';
import heroImg2  from '@/assets/gallery/jun-2025-attendees-auditorium.jpg';
import heroImg3  from '@/assets/gallery/sep-2025-aspire-presenting.jpg';
import heroImg4  from '@/assets/gallery/sep-2025-women-collaborating.jpg';
import heroImg5  from '@/assets/gallery/dec-2025-tyrance-presenting.jpg';
import heroImg6  from '@/assets/gallery/dec-2025-participants-learning.jpg';
import heroImg7  from '@/assets/gallery/jan-2026-students-learning-001.jpg';
import heroImg8  from '@/assets/gallery/sep-2025-group-laptops.jpg';
import heroImg9  from '@/assets/gallery/jan-2026-cert-group-001.jpg';
import heroImg10 from '@/assets/gallery/feb-2026-workshop-coaching.jpg';
import heroImg11 from '@/assets/gallery/feb-2026-group-certificates.jpg';
import heroImg12 from '@/assets/gallery/feb-2026-students-collaborating.jpg';

interface HeroSlide {
  src: string;
  position: string;
  kenBurns: { scaleStart: number; scaleEnd: number; xStart: string; xEnd: string; yStart: string; yEnd: string };
}

const heroSlides: HeroSlide[] = [
  { src: heroImg1,  position: 'center 20%', kenBurns: { scaleStart: 1.08, scaleEnd: 1.0,  xStart: '0%',  xEnd: '1%',   yStart: '1%',  yEnd: '0%'   } },
  { src: heroImg2,  position: 'center 30%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.07, xStart: '1%',  xEnd: '-1%',  yStart: '0%',  yEnd: '1%'   } },
  { src: heroImg3,  position: 'center 22%', kenBurns: { scaleStart: 1.06, scaleEnd: 1.0,  xStart: '-1%', xEnd: '0%',   yStart: '1%',  yEnd: '0%'   } },
  { src: heroImg4,  position: 'center 35%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.08, xStart: '0%',  xEnd: '-1%',  yStart: '0%',  yEnd: '1%'   } },
  { src: heroImg5,  position: 'center 18%', kenBurns: { scaleStart: 1.08, scaleEnd: 1.0,  xStart: '-1%', xEnd: '1%',   yStart: '1%',  yEnd: '0%'   } },
  { src: heroImg6,  position: 'center 32%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.07, xStart: '1%',  xEnd: '0%',   yStart: '0%',  yEnd: '-1%'  } },
  { src: heroImg7,  position: 'center 38%', kenBurns: { scaleStart: 1.07, scaleEnd: 1.0,  xStart: '0%',  xEnd: '-1%',  yStart: '-1%', yEnd: '1%'   } },
  { src: heroImg8,  position: 'center 38%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.08, xStart: '-1%', xEnd: '1%',   yStart: '1%',  yEnd: '0%'   } },
  { src: heroImg9,  position: 'center 22%', kenBurns: { scaleStart: 1.08, scaleEnd: 1.0,  xStart: '1%',  xEnd: '-1%',  yStart: '0%',  yEnd: '1%'   } },
  { src: heroImg10, position: 'center 28%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.07, xStart: '0%',  xEnd: '1%',   yStart: '-1%', yEnd: '0%'   } },
  { src: heroImg11, position: 'center 22%', kenBurns: { scaleStart: 1.06, scaleEnd: 1.0,  xStart: '-1%', xEnd: '0%',   yStart: '1%',  yEnd: '-1%'  } },
  { src: heroImg12, position: 'center 38%', kenBurns: { scaleStart: 1.0,  scaleEnd: 1.08, xStart: '1%',  xEnd: '-1%',  yStart: '0%',  yEnd: '1%'   } },
];

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
const binaryChars = '01';

function MatrixRain() {
  const columns = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      chars: [...Array(10)].map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join('\n'),
      left: `${i * 5 + Math.random() * 2}%`,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 8,
      fontSize: i % 4 === 0 ? 'text-sm' : 'text-xs',
      opacity: 0.15 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className={`absolute top-0 text-primary font-mono ${col.fontSize} leading-tight whitespace-pre`}
          style={{ left: col.left, opacity: col.opacity }}
          initial={{ y: '-100%' }}
          animate={{ y: '100vh' }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: col.delay,
          }}
        >
          {col.chars}
        </motion.div>
      ))}
    </div>
  );
}

// MorphingChar removed — replaced with static text columns for performance

function DataBurst() {
  const bursts = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      chars: [...Array(20)].map(() => binaryChars[Math.floor(Math.random() * 2)]).join(''),
      top: `${15 + i * 15}%`,
      delay: i * 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          className="absolute left-0 text-primary/60 font-mono text-[10px] whitespace-nowrap"
          style={{ top: burst.top }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100vw', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            delay: burst.delay,
            repeatDelay: 5,
          }}
        >
          {burst.chars}
        </motion.div>
      ))}
    </div>
  );
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 9}%`,
            top: `${10 + (i % 5) * 18}%`,
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            background: 'hsl(var(--primary))',
            boxShadow: `0 0 8px hsl(var(--primary) / 0.5)`,
          }}
          animate={{
            y: [-30, 30, -30],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function PulsingRings({ className }: { className?: string }) {
  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className || 'inset-0'}`}>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/30"
          style={{
            width: `${180 + i * 70}px`,
            height: `${180 + i * 70}px`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.4, 0.15],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function ScanningLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Secondary horizontal line (offset) */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
          delay: 1.5,
        }}
      />
      
      {/* Vertical scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.4)' }}
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
      />

      {/* Diagonal sweep */}
      <motion.div
        className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent origin-left"
        style={{ rotate: '25deg', top: '50%' }}
        initial={{ x: '-100%' }}
        animate={{ x: '50%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
      />
    </div>
  );
}

function CircuitConnections() {
  const paths = useMemo(() => [
    { id: 1, d: 'M0,100 Q50,100 50,150 T100,150', delay: 0 },
    { id: 2, d: 'M100,0 Q100,50 150,50 T150,100', delay: 1 },
    { id: 3, d: 'M200,50 Q200,100 250,100 T250,150', delay: 2 },
  ], []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: path.delay,
            repeatDelay: 2,
          }}
        />
      ))}
    </svg>
  );
}
function HeroSlideshow({ onIndexChange }: { onIndexChange: (i: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onIndexChange(currentIndex);
  }, [currentIndex, onIndexChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.src}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.position }}
            initial={{
              scale: slide.kenBurns.scaleStart,
              x: slide.kenBurns.xStart,
              y: slide.kenBurns.yStart,
            }}
            animate={{
              scale: slide.kenBurns.scaleEnd,
              x: slide.kenBurns.xEnd,
              y: slide.kenBurns.yEnd,
            }}
            transition={{ duration: 7.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>
      {/* Gradient overlay — lighter than before so photos read through */}
      <div className="absolute inset-0 bg-background/55" />
      {/* Extra bottom vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
    </div>
  );
}

export function TimelineHero() {
  const [slideIndex, setSlideIndex] = useState(0);

  const scrollToContent = () => {
    document.getElementById('timeline-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-6 pt-24 md:pt-36 lg:pt-44 overflow-hidden">
      {/* Photo slideshow background */}
      <HeroSlideshow onIndexChange={setSlideIndex} />
      <GridOverlay />
      <MatrixRain />
      <ScanningLines />
      <DataBurst />
      <FloatingParticles />
      <CircuitConnections />
      
      {/* Two-column layout container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        
        {/* Left side - Mission Statement & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-tight mb-4 text-balance"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 0 transparent',
                  '0 0 10px hsl(var(--primary) / 0.3)',
                  '0 0 0 transparent',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Rebirthing Greenwood
              <br className="hidden sm:block" />
              {' '}as the Nation's Premiere
              <br className="hidden sm:block" />
              {' '}<span className="text-primary">AI Powered Economy</span>
            </motion.span>
          </motion.h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 font-medium tracking-wide">
            Community Wide Fluency &nbsp;·&nbsp; AI Powered Innovation &nbsp;·&nbsp; Real World Application
          </p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => { window.location.href = '/contact'; }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-primary/50 text-foreground font-medium text-lg hover:bg-primary/20 hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Get Involved
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right side - Large B Logo with Glow — hidden on mobile to keep hero clean */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
          }}
          className="relative hidden lg:flex lg:w-72 lg:h-72 flex-shrink-0"
        >
          {/* Pulsing rings behind logo */}
          <PulsingRings className="inset-0" />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Logo */}
          <motion.img 
            src={logoCircuit} 
            alt="Black Tech Street" 
            className="relative w-full h-full object-contain"
            animate={{
              filter: [
                'drop-shadow(0 0 15px hsl(var(--primary) / 0.4))',
                'drop-shadow(0 0 40px hsl(var(--primary) / 0.8))',
                'drop-shadow(0 0 15px hsl(var(--primary) / 0.4))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Slide progress dots + scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {heroSlides.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-primary"
              animate={{
                width: i === slideIndex ? 20 : 5,
                opacity: i === slideIndex ? 1 : 0.35,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ height: 5 }}
            />
          ))}
        </div>

        {/* Scroll chevron */}
        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </button>
      </motion.div>

      <div id="timeline-start" className="absolute bottom-0" />
    </section>
  );
}
