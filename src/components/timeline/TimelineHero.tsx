import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import logoCircuit from '@/assets/logo_b_circuit.png';

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

function MatrixRain() {
  const columns = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      chars: [...Array(8)].map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
      left: `${i * 5 + Math.random() * 2}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 text-primary font-mono text-xs leading-tight"
          style={{ left: col.left }}
          initial={{ y: '-100%' }}
          animate={{ y: '100vh' }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: col.delay,
          }}
        >
          {col.chars.map((char, i) => (
            <motion.div
              key={i}
              className="opacity-70"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function PulsingRings({ className }: { className?: string }) {
  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className || 'inset-0'}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          style={{
            width: `${200 + i * 80}px`,
            height: `${200 + i * 80}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function ScanningLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Vertical scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
      />
    </div>
  );
}

export function TimelineHero() {
  const scrollToContent = () => {
    document.getElementById('timeline-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-6 pt-20 overflow-hidden">
      <MatrixRain />
      <ScanningLines />
      <FloatingParticles />
      
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-tight mb-8"
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
              Creating The Blueprint For An{' '}
              <span className="text-primary">AI-Powered Society</span>{' '}
              On The Grounds Of Historic Greenwood
            </motion.span>
          </motion.h1>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={scrollToContact}
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
