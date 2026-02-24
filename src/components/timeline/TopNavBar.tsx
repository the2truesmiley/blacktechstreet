import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoCircuit from '@/assets/logo_b_circuit.png';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; isEmail?: boolean }[];
}

const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { 
    label: 'Programs', 
    children: [
      { label: 'ASPIRE', href: '/aspire' },
      { label: '2026 Events', href: '/aspire/events' },
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
  largerLogo?: boolean;
}

export function TopNavBar({ largerLogo = false }: TopNavBarProps) {
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

  const handleNavClick = (href: string, isEmail?: boolean) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    
    if (isEmail) {
      window.location.href = href;
      return;
    }
    
    // Handle internal page navigation
    if (href.startsWith('/')) {
      window.location.href = href;
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
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(16,185,129,0.06)]"
            : "bg-background/60 backdrop-blur-md"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
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
              <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={logoCircuit} 
                alt="Black Tech Street"
                className={cn("relative object-contain group-hover:scale-105 transition-transform duration-300", largerLogo ? "w-[52px] h-[52px]" : "w-10 h-10")}
              />
            </div>
            <span className="font-display font-bold text-foreground text-xl hidden sm:block tracking-tight">
              Black Tech Street
            </span>
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
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-[15px] font-medium px-4 py-2 rounded-lg hover:bg-secondary/40 group"
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.href!)}
                    className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 text-[15px] font-medium px-4 py-2 rounded-lg hover:bg-secondary/40 group"
                  >
                    {item.label}
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
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
                      <div className="bg-background/95 backdrop-blur-xl border border-border/40 rounded-xl shadow-xl overflow-hidden p-1">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href, child.isEmail)}
                            className={cn(
                              "block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors duration-200",
                              "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
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
            className="md:hidden p-2.5 rounded-lg bg-secondary/50 border border-border/40 text-foreground hover:bg-secondary transition-colors"
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
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/40 md:hidden max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileExpanded(item.label)}
                        className="flex items-center justify-between w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 text-base font-medium py-2"
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
                                    "text-muted-foreground hover:text-foreground",
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
                      className="text-left text-muted-foreground hover:text-foreground transition-colors duration-200 text-base font-medium py-2"
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
