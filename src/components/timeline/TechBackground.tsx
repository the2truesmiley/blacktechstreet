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
  layer: number;
}

function createDrop(canvasWidth: number, canvasHeight: number, layer: number): Drop {
  const length = 8 + Math.floor(Math.random() * 18);
  const chars = Array.from({ length }, () =>
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  );
  return {
    x: Math.random() * canvasWidth,
    y: -(Math.random() * canvasHeight * 0.5 + 50),
    speed: (0.4 + Math.random() * 1.2) * (0.5 + layer * 0.35),
    chars,
    length,
    opacity: 0.12 + layer * 0.15 + Math.random() * 0.1,
    mutateTimer: Math.random() * 10,
    layer,
  };
}

export function TechBackground({ isVisible }: TechBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<Drop[]>([]);
  const lastTimeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.scrollWidth || window.innerWidth;
    const h = parent.scrollHeight || document.documentElement.scrollHeight;

    // Skip if size hasn't actually changed
    if (sizeRef.current.w === w && sizeRef.current.h === h) return;
    sizeRef.current = { w, h };

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Clear canvas on resize to avoid artifacts
      ctx.clearRect(0, 0, w, h);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    resize();

    const { w, h } = sizeRef.current;

    // Fewer drops for performance — 60 max, biased toward dimmer layers
    const totalDrops = Math.min(Math.floor(window.innerWidth / 22), 60);
    const drops: Drop[] = [];
    for (let i = 0; i < totalDrops; i++) {
      const layer = i < totalDrops * 0.4 ? 0 : i < totalDrops * 0.75 ? 1 : 2;
      drops.push(createDrop(w, h, layer));
    }
    dropsRef.current = drops;

    // Read primary HSL once
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHSL = computedStyle.getPropertyValue('--primary').trim();

    const fontSizes = [10, 13, 16];
    let frameCount = 0;

    function draw(timestamp: number) {
      if (!ctx || !canvas) return;

      // First frame init
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((timestamp - lastTimeRef.current) / 16.667, 3);
      lastTimeRef.current = timestamp;
      frameCount++;

      const { w, h } = sizeRef.current;

      // Full clear every frame — no ghost artifacts, crisp rendering
      ctx.clearRect(0, 0, w, h);

      // Disable shadow globally — huge perf win
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      for (const drop of dropsRef.current) {
        const fontSize = fontSizes[drop.layer];
        ctx.font = `${fontSize}px "Courier New", monospace`;

        // Mutate characters less frequently (every ~8 frames worth of time)
        drop.mutateTimer += dt;
        if (drop.mutateTimer > 8) {
          drop.mutateTimer = 0;
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }

        for (let i = 0; i < drop.length; i++) {
          const charY = drop.y + i * (fontSize + 2);
          if (charY < -fontSize || charY > h + fontSize) continue;

          const progress = i / drop.length;

          if (i === 0) {
            // Lead character — brighter, simulated glow via double-draw
            const leadOpacity = Math.min(drop.opacity + 0.45, 0.95);
            ctx.globalAlpha = leadOpacity;
            ctx.fillStyle = `hsl(${primaryHSL})`;
            ctx.fillText(drop.chars[i], drop.x, charY);
            // Simulated glow: draw again slightly larger with low alpha
            ctx.globalAlpha = leadOpacity * 0.3;
            ctx.fillText(drop.chars[i], drop.x - 0.5, charY);
            ctx.fillText(drop.chars[i], drop.x + 0.5, charY);
          } else if (i < 3) {
            ctx.globalAlpha = drop.opacity * (1 - progress * 0.25);
            ctx.fillStyle = `hsl(${primaryHSL})`;
            ctx.fillText(drop.chars[i], drop.x, charY);
          } else {
            const fadeOpacity = drop.opacity * (1 - progress * 0.9);
            ctx.globalAlpha = Math.max(fadeOpacity, 0.02);
            ctx.fillStyle = `hsl(${primaryHSL})`;
            ctx.fillText(drop.chars[i], drop.x, charY);
          }
        }

        // Move
        drop.y += drop.speed * dt;

        // Reset when off screen
        if (drop.y > h + drop.length * 20) {
          const { w: cw, h: ch } = sizeRef.current;
          Object.assign(drop, createDrop(cw, ch, drop.layer));
          drop.y = -(Math.random() * 150 + 30);
        }
      }

      // Reset alpha
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(draw);
    }

    // Clear before first frame
    ctx.clearRect(0, 0, w, h);
    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(draw);

    // Resize only on window resize — no MutationObserver (avoids constant redraws)
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    // One-time delayed resize to catch content that loads after mount
    const resizeTimeout = setTimeout(resize, 1000);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
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

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--background) / 0.5) 100%)',
        }}
      />

      {/* Ambient glow spots — static, no repaints */}
      <div className="absolute top-[15%] left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      <div className="absolute top-[50%] right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[80px]" />
      <div className="absolute top-[80%] left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />

      {/* Scan lines — pure CSS, no JS cost */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  );
}
