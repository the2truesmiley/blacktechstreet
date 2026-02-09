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
