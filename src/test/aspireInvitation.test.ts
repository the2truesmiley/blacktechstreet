import { describe, expect, it } from 'vitest';
import { ASPIRE_INVITATION_ENABLED, ASPIRE_INVITATION_DELAY, shouldShowAspireInvitation, canOpenAspireInvitation } from '@/lib/aspireInvitation';

describe('December workshop invitation', () => {
  const beforeWorkshop = Date.parse('2026-11-23T04:18:00Z');
  it('enables the approved campaign', () => {
    expect(ASPIRE_INVITATION_ENABLED).toBe(true);
    expect(shouldShowAspireInvitation(beforeWorkshop, false, ASPIRE_INVITATION_ENABLED)).toBe(true);
  });
  it('allows eight seconds of browsing before the first invitation', () => {
    expect(ASPIRE_INVITATION_DELAY).toBe(8000);
  });
  it('does not interrupt entering data', () => {
    expect(canOpenAspireInvitation(true, true)).toBe(false);
    expect(canOpenAspireInvitation(true, false)).toBe(true);
  });
  it('does not open in a hidden tab', () => {
    expect(canOpenAspireInvitation(false, false)).toBe(false);
  });
  it('shows once and suppresses returning visitors for the campaign', () => {
    expect(shouldShowAspireInvitation(beforeWorkshop, false, true)).toBe(true);
    expect(shouldShowAspireInvitation(beforeWorkshop, true, true)).toBe(false);
  });
  it('ends at the December 5 workshop start in Tulsa', () => {
    expect(shouldShowAspireInvitation(Date.parse('2026-12-05T09:59:59-06:00'), false, true)).toBe(true);
    expect(shouldShowAspireInvitation(Date.parse('2026-12-05T10:00:00-06:00'), false, true)).toBe(false);
  });
});