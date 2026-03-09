import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logoGlow from '@/assets/logo_bts_dark_glow.png';
import logoCircuit from '@/assets/logo_b_circuit.png';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; isEmail?: boolean }[];
}

const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { 
    label: 'G-ACE', 
    children: [
      { label: 'ASPIRE', href: '/aspire' },
      { label: '2026 ASPIRE Workshops', href: '/aspire/events' },
    ]
  },
  { 
    label: 'People', 
    children: [
      { label: 'Partners', href: '/partners' },
      { label: 'Team', href: '/about#team-section' },
    ]
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

interface TopNavBarProps {
  variant?: 'home' | 'default';
}

// ─── Animated matrix canvas scoped to the nav bar ────────────────────────────

const NAV_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF∞≈≠∑∏∫δλφψΩ';

interface NavDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
  mutateTimer: number;
}

function createNavDrop(w: number, h: number): NavDrop {
  const length = 3 + Math.floor(Math.random() * 6);
  return {
    x: Math.random() * w,
    y: -(Math.random() * h + 10),
    speed: 0.5 + Math.random() * 1.2,
    chars: Array.from({ length }, () => NAV_CHARS[Math.floor(Math.random() * NAV_CHARS.length)]),
    length,
    opacity: 0.18 + Math.random() * 0.22,
    mutateTimer: Math.random() * 8,
  };
}

function NavMatrixCanvas({ isHome, isScrolled }: { isHome: boolean; isScrolled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dropsRef = useRef<NavDrop[]>([]);
  const lastTimeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    if (sizeRef.current.w === w && sizeRef.current.h === h) return;
    sizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    // Only render the animated canvas on the home variant
    if (!isHome) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    resize();

    const { w, h } = sizeRef.current;
    const count = Math.min(Math.floor(w / 28), 48);
    dropsRef.current = Array.from({ length: count }, () => createNavDrop(w, h));

    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHSL = computedStyle.getPropertyValue('--primary').trim();

    function draw(ts: number) {
      if (!ctx || !canvas) return;
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = ts;
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const dt = Math.min((ts - lastTimeRef.current) / 16.667, 3);
      lastTimeRef.current = ts;

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      // Global opacity dims when scrolled so it doesn't compete with page content
      const globalDim = isScrolled ? 0.45 : 1;

      for (const drop of dropsRef.current) {
        ctx.font = `11px "Courier New", monospace`;

        drop.mutateTimer += dt;
        if (drop.mutateTimer > 8) {
          drop.mutateTimer = 0;
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = NAV_CHARS[Math.floor(Math.random() * NAV_CHARS.length)];
        }

        for (let i = 0; i < drop.length; i++) {
          const charY = drop.y + i * 13;
          if (charY < -13 || charY > h + 13) continue;
          const progress = i / drop.length;

          if (i === 0) {
            // Lead char — bright with simulated glow
            const leadAlpha = Math.min(drop.opacity + 0.5, 0.95) * globalDim;
            ctx.globalAlpha = leadAlpha;
            ctx.fillStyle = `hsl(${primaryHSL})`;
            ctx.fillText(drop.chars[i], drop.x, charY);
            ctx.globalAlpha = leadAlpha * 0.25;
            ctx.fillText(drop.chars[i], drop.x - 0.5, charY);
            ctx.fillText(drop.chars[i], drop.x + 0.5, charY);
          } else {
            const fadeAlpha = Math.max(drop.opacity * (1 - progress * 0.85) * globalDim, 0.01);
            ctx.globalAlpha = fadeAlpha;
            ctx.fillStyle = `hsl(${primaryHSL})`;
            ctx.fillText(drop.chars[i], drop.x, charY);
          }
        }

        drop.y += drop.speed * dt;

        if (drop.y > h + drop.length * 14) {
          const { w: cw, h: ch } = sizeRef.current;
          Object.assign(drop, createNavDrop(cw, ch));
          drop.y = -(Math.random() * 40 + 10);
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }

    ctx.clearRect(0, 0, w, h);
    lastTimeRef.current = 0;
    animRef.current = requestAnimationFrame(draw);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHome, resize]);

  // Re-read isScrolled each frame via a ref so we don't restart the animation
  const isScrolledRef = useRef(isScrolled);
  useEffect(() => { isScrolledRef.current = isScrolled; }, [isScrolled]);

  if (!isHome) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}

// ─── Main NavBar ──────────────────────────────────────────────────────────────

export function TopNavBar({ variant = 'default' }: TopNavBarProps) {
  const isHome = variant === 'home';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleNavClick = (href: string, isEmail?: boolean) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    
    if (isEmail || href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }
    
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isHome
            ? isScrolled
              ? "bg-background/90 backdrop-blur-xl border-b border-primary/30 shadow-[0_4px_30px_rgba(16,185,129,0.08)]"
              : "bg-background/60 backdrop-blur-sm border-b border-primary/25"
            : isScrolled
              ? "bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-sm"
              : "bg-background/80 backdrop-blur-md border-b border-border/10"
        )}
      >
        {/* ── Animated matrix canvas lives here, behind all nav content ── */}
        <NavMatrixCanvas isHome={isHome} isScrolled={isScrolled} />

        {/* Subtle left-to-right gradient sweep on the nav bar for depth */}
        {isHome && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isScrolled
                ? 'linear-gradient(90deg, hsl(var(--primary)/0.04) 0%, transparent 40%, hsl(var(--primary)/0.04) 100%)'
                : 'linear-gradient(90deg, hsl(var(--primary)/0.07) 0%, transparent 40%, hsl(var(--primary)/0.05) 100%)',
            }}
          />
        )}

        {/* Animated bottom border glow line (home only) */}
        {isHome && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary)/0.6) 30%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.6) 70%, transparent 100%)',
              boxShadow: '0 0 12px hsl(var(--primary)/0.5)',
            }}
            animate={{
              opacity: isScrolled ? [0.4, 0.7, 0.4] : [0.6, 1, 0.6],
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className={cn(
          "relative z-10 mx-auto flex items-center justify-between transition-all duration-500",
          isHome
            ? isScrolled
              ? "max-w-6xl px-5 py-2"
              : "max-w-7xl px-6 py-3"
            : "max-w-6xl px-5 py-2"
        )}>
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              {isHome && (
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              <AnimatePresence mode="wait" initial={false}>
                {isHome && !isScrolled ? (
                  <motion.img
                    key="glow"
                    src={logoGlow}
                    alt="Black Tech Street"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative object-contain w-[100px] md:w-[168px] h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <motion.img
                    key="circuit"
                    src={logoCircuit}
                    alt="Black Tech Street"
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.15 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative object-contain w-10 h-10 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </AnimatePresence>
            </div>
            {(!isHome || isScrolled) && (
              <span className="font-display font-bold text-foreground text-lg hidden sm:block tracking-tight">
                Black Tech Street
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 transition-colors duration-200 font-medium rounded-lg group",
                      isHome
                        ? isScrolled
                          ? "text-muted-foreground hover:text-foreground text-[15px] px-4 py-2 hover:bg-secondary/40"
                          : "text-white/80 hover:text-white text-lg px-5 py-2.5 hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground text-[15px] px-4 py-2 hover:bg-secondary/40"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "transition-transform duration-200",
                      isHome ? (isScrolled ? "w-3.5 h-3.5" : "w-4 h-4") : "w-3.5 h-3.5",
                      openDropdown === item.label && "rotate-180"
                    )} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href!)}
                    className={cn(
                      "relative transition-colors duration-200 font-medium rounded-lg group",
                      isHome
                        ? isScrolled
                          ? "text-muted-foreground hover:text-foreground text-[15px] px-4 py-2 hover:bg-secondary/40"
                          : "text-white/80 hover:text-white text-lg px-5 py-2.5 hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground text-[15px] px-4 py-2 hover:bg-secondary/40"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full",
                      isHome ? "bg-primary" : "bg-primary"
                    )} />
                  </button>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-1 min-w-[200px] z-50"
                    >
                      <div className={cn(
                        "backdrop-blur-xl border rounded-xl shadow-xl overflow-hidden p-1",
                        isHome
                          ? "bg-black/80 border-white/10"
                          : "bg-background/95 border-border/40"
                      )}>
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href, child.isEmail)}
                            className={cn(
                              "block w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200",
                              isHome
                                ? "text-sm text-white/70 hover:text-white hover:bg-white/10"
                                : "text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                              child.isEmail && "text-primary hover:text-primary"
                            )}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2.5 rounded-lg border transition-colors",
              isHome
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-secondary/50 border-border/40 text-foreground hover:bg-secondary"
            )}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed left-0 right-0 z-40 backdrop-blur-lg border-b md:hidden max-h-[calc(100vh-72px)] overflow-y-auto",
              isHome
                ? "top-[80px] bg-black/90 border-white/10"
                : "top-[60px] bg-background/95 border-border/40"
            )}
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileExpanded(item.label)}
                        className={cn(
                          "flex items-center justify-between w-full text-left transition-colors duration-200 text-base font-medium py-2",
                          isHome ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          mobileExpandedItems.includes(item.label) && "rotate-180"
                        )} />
                      </button>
                      <AnimatePresence>
                        {mobileExpandedItems.includes(item.label) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 flex flex-col gap-1">
                              {item.children.map((child) => (
                                <button
                                  key={child.label}
                                  onClick={() => handleNavClick(child.href, child.isEmail)}
                                  className={cn(
                                    "text-left text-sm py-2 transition-colors duration-200",
                                    isHome ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground",
                                    child.isEmail && "text-primary hover:text-primary"
                                  )}
                                >
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href!)}
                      className={cn(
                        "text-left transition-colors duration-200 text-base font-medium py-2",
                        isHome ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
