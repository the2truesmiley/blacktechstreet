/** Shared visible focus ring for every link and button on the Thought Leadership page. */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * One heading scale for the page: same family, weight and tracking everywhere,
 * only the size steps down by level.
 */
export const headingBase = 'font-display font-semibold tracking-tight text-foreground';
export const headingLg = `${headingBase} text-3xl lg:text-4xl leading-tight`;
export const headingMd = `${headingBase} text-2xl md:text-3xl leading-tight`;
export const headingSm = `${headingBase} text-base leading-snug`;

/** Small uppercase green label used above the hero title and the featured panel. */
export const eyebrow = 'text-xs font-semibold uppercase tracking-[0.2em] text-primary';
