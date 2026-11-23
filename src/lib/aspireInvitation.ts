export const ASPIRE_INVITATION_KEY = 'bts:aspire-december-2026:seen';
export const ASPIRE_INVITATION_END = Date.parse('2026-12-05T10:00:00-06:00');

// Approved after review; new campaigns must start disabled.
export const ASPIRE_INVITATION_ENABLED = true;
export const ASPIRE_INVITATION_DELAY = 8000;

export function shouldShowAspireInvitation(now: number, seen: boolean, enabled: boolean) {
  return enabled && !seen && now < ASPIRE_INVITATION_END;
}

export function canOpenAspireInvitation(visible: boolean, enteringData: boolean) {
  return visible && !enteringData;
}