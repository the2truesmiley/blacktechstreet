import { useEffect, useRef, useCallback } from 'react';

interface TechBackgroundProps {
  isVisible: boolean;
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF∞≈≠∑∏∫δλφψΩ';

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
  mutateTimer: number;
  layer: number; // 0 = far/dim, 1 = mid, 2 = near/bright
}

function createDrop(canvasWidth: number, canvasHeight: number, layer: number): Drop {
  const fontSize = layer === 0 ? 10 : layer === 1 ? 14 : 18;
  const length = 8 + Math.floor(Math.random() * 22);
  const chars = Array.from({ length }, () =>
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  );
  return {
    x: Math.random() * canvasWidth,
    y: -(Math.random() * canvasHeight),
    speed: (0.5 + Math.random() * 1.5) * (0.5 + layer * 0.4),
    chars,
    length,
    opacity: 0.15 + layer * 0.2 + Math.random() * 0.15,
    mutateTimer: 0,
    layer,
  };
}

export function TechBackground({ isVisible }: TechBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<Drop[]>([]);
  const lastTimeRef = useRef(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.scrollWidth || window.innerWidth;
    const h = parent.scrollHeight || document.documentElement.scrollHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resize();

    // Initialize drops across 3 layers
    const totalDrops = Math.min(Math.floor(window.innerWidth / 12), 120);
    const drops: Drop[] = [];
    for (let i = 0; i < totalDrops; i++) {
      const layer = i < totalDrops * 0.3 ? 0 : i < totalDrops * 0.7 ? 1 : 2;
      drops.push(createDrop(canvas.width / 2, canvas.height / 2, layer));
    }
    dropsRef.current = drops;

    // Get the primary color from CSS
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHSL = computedStyle.getPropertyValue('--primary').trim();

    const fontSizes = [10, 14, 18];

    function draw(timestamp: number) {
      if (!ctx || !canvas) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 16.667, 3); // normalize to ~60fps, cap
      lastTimeRef.current = timestamp;

      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      // Fade trail effect — creates the iconic "afterglow"
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, w, h);

      for (const drop of dropsRef.current) {
        const fontSize = fontSizes[drop.layer];
        ctx.font = `${fontSize}px "Courier New", monospace`;

        // Mutate random characters periodically for "living" effect
        drop.mutateTimer += dt;
        if (drop.mutateTimer > 3 + Math.random() * 5) {
          drop.mutateTimer = 0;
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }

        // Draw each character in the column
        for (let i = 0; i < drop.length; i++) {
          const charY = drop.y + i * (fontSize + 2);
          if (charY < -fontSize || charY > h + fontSize) continue;

          const progress = i / drop.length;

          if (i === 0) {
            // Lead character — bright white-green glow
            ctx.fillStyle = `hsla(${primaryHSL} / ${drop.opacity + 0.4})`;
            ctx.shadowColor = `hsl(${primaryHSL})`;
            ctx.shadowBlur = 15 + drop.layer * 5;
          } else if (i < 3) {
            // Near-head characters — bright primary
            ctx.fillStyle = `hsla(${primaryHSL} / ${drop.opacity * (1 - progress * 0.3)})`;
            ctx.shadowColor = `hsl(${primaryHSL})`;
            ctx.shadowBlur = 6;
          } else {
            // Trail characters — fade out
            const fadeOpacity = drop.opacity * (1 - progress * 0.85);
            ctx.fillStyle = `hsla(${primaryHSL} / ${Math.max(fadeOpacity, 0.03)})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(drop.chars[i], drop.x, charY);
        }

        // Reset shadow after each drop
        ctx.shadowBlur = 0;

        // Move drop
        drop.y += drop.speed * dt;

        // Reset when off screen
        if (drop.y > h + drop.length * 20) {
          Object.assign(drop, createDrop(w, h, drop.layer));
          drop.y = -(Math.random() * 200 + 50);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
    };
    window.addEventListener('resize', handleResize);

    // Also observe body for height changes (content loading)
    const observer = new MutationObserver(handleResize);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isVisible, resize]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ minHeight: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Subtle vignette overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.6) 100%)',
        }}
      />

      {/* Ambient glow spots */}
      <div className="absolute top-[15%] left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="absolute top-[45%] right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[80px]" />
      <div className="absolute top-[75%] left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]" />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  );
}
