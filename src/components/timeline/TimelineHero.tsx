import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import logoCircuit from '@/assets/logo_b_circuit.png';

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

export function TimelineHero() {
  const scrollToContent = () => {
    document.getElementById('timeline-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-6 pt-20 overflow-hidden">
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-tight mb-4"
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
              Creating the Blueprint for an
              <br />
              <span className="text-primary">AI-Powered Society</span>
            </motion.span>
          </motion.h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
            Practical fluency. Responsible use. Real-world application.
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

        {/* Right side - Large B Logo with Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
          }}
          className="relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 flex-shrink-0"
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

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>

      <div id="timeline-start" className="absolute bottom-0" />
    </section>
  );
}
