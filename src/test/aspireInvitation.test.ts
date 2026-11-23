import { describe, expect, it } from 'vitest';
import { ASPIRE_INVITATION_ENABLED, shouldShowAspireInvitation } from '@/lib/aspireInvitation';

describe('December workshop invitation', () => {
  const beforeWorkshop = Date.parse('2026-11-23T04:18:00Z');
  it('stays disabled pending preview approval', () => {
    expect(ASPIRE_INVITATION_ENABLED).toBe(false);
    expect(shouldShowAspireInvitation(beforeWorkshop, false, ASPIRE_INVITATION_ENABLED)).toBe(false);
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