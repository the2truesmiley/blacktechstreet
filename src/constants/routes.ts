/**
 * Route Constants
 * 
 * This file documents routes that must remain stable and should NOT be renamed.
 * Some routes are used in physical marketing materials (QR codes, printed flyers)
 * and changing them would break existing links.
 */

export const PERMANENT_ROUTES = {
  /**
   * ASPIRE Events Page
   * 
   * ⚠️ DO NOT CHANGE THIS PATH
   * 
   * This route is printed on QR codes for workshop registration.
   * Used in physical marketing materials since February 2026.
   * 
   * Full URL: https://blacktechstreet.ai/aspire/events
   */
  ASPIRE_EVENTS: '/aspire/events',

  /**
   * ASPIRE June 2026 Event Landing Page
   * 
   * ⚠️ DO NOT CHANGE THIS PATH
   * 
   * Dedicated landing page for the June 27, 2026 workshop.
   * May be used in physical/digital marketing materials.
   * 
   * Full URL: https://blacktechstreet.ai/aspire/events/june-2026
   */
  ASPIRE_EVENT_JUNE_2026: '/aspire/events/june-2026',

  /**
   * ASPIRE September 2026 Event Landing Page
   * 
   * ⚠️ DO NOT CHANGE THIS PATH
   * 
   * Dedicated landing page for the September 26, 2026 workshop.
   * May be used in physical/digital marketing materials.
   * 
   * Full URL: https://blacktechstreet.ai/aspire/events/september-2026
   */
  ASPIRE_EVENT_SEPTEMBER_2026: '/aspire/events/september-2026',
} as const;

/**
 * Standard routes that can be changed if needed
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  PARTNERS: '/partners',
  ASPIRE: '/aspire',
} as const;
