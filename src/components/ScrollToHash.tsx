import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not scroll to `#hash` targets on navigation. This waits a
 * couple of frames for the destination page to mount, then scrolls the section
 * into view. Without it, links like /about#team-section land at the top.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) window.setTimeout(tryScroll, 100);
    };

    const raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
