export const ASPIRE_INVITATION_KEY = 'bts:aspire-december-2026:seen';
export const ASPIRE_INVITATION_END = Date.parse('2026-12-05T10:00:00-06:00');

// Keep off until the invitation preview is approved.
export const ASPIRE_INVITATION_ENABLED = false;

export function shouldShowAspireInvitation(now: number, seen: boolean, enabled: boolean) {
  return enabled && !seen && now < ASPIRE_INVITATION_END;
}