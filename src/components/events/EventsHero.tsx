import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Baby, ChevronDown } from 'lucide-react';
import logoCircuit from '@/assets/logo_b_circuit.png';

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01';

function MatrixRain() {
  const columns = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      chars: [...Array(6)].map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
      left: `${i * 6.5 + Math.random() * 2}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: i % 2 === 0 ? '3px' : '2px',
            height: i % 2 === 0 ? '3px' : '2px',
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-8, 8, -8],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function ScanningLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

interface EventsHeroProps {
  hideBadges?: string[];
}

export function EventsHero({ hideBadges = [] }: EventsHeroProps) {
  const scrollToContent = () => {
    document.getElementById('events-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-5 pb-12 pt-28 overflow-hidden">
      <MatrixRain />
      <ScanningLine />
      <FloatingParticles />
      
      {/* Subtle gradient overlay - transparent enough to show Matrix effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 text-center lg:text-left"
        >

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight leading-tight mb-6"
            animate={{
              textShadow: [
                '0 0 0 transparent',
                '0 0 20px hsl(var(--primary) / 0.2)',
                '0 0 0 transparent',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ASPIRE{' '}
            <span className="text-primary">2026</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-medium">
              GenAI Fluency & Responsible Innovation
            </span>
          </motion.h1>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8"
          >
            {!hideBadges.includes('workshops') && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/50">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Workshops</span>
              </div>
            )}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=914+N+Greenwood+Ave,+Tulsa,+OK+74106"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 hover:border-primary/40 transition-colors cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Langston Tulsa</span>
            </a>
            <a 
              href="#childcare"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 hover:border-primary/40 transition-colors cursor-pointer group"
            >
              <Baby className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Childcare Provided</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Logo with effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.7, 
            delay: 0.15,
            type: 'spring',
            stiffness: 180,
          }}
          className="relative w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 flex-shrink-0"
        >
          {/* Pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{
                margin: `${-10 - i * 15}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.5, 0.25],
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
                'drop-shadow(0 0 10px hsl(var(--primary) / 0.3))',
                'drop-shadow(0 0 30px hsl(var(--primary) / 0.7))',
                'drop-shadow(0 0 10px hsl(var(--primary) / 0.3))',
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
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>

      <div id="events-content" className="absolute bottom-0" />
    </section>
  );
}
