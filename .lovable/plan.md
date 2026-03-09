

# Plan: Three Codebase Improvements

## 1. Extract Reusable PartnerCard Component

The community partners section in `Partners.tsx` (lines 289-337) has ~50 lines of nearly identical markup duplicated for linked vs non-linked partners. Extract a shared `PartnerCard` component.

**New file:** `src/components/partners/PartnerCard.tsx`
- Accepts `name`, `logo`, `needsLightBg`, `link?`, `nofollow?`
- Renders the card with conditional `<a>` wrapper when `link` is provided
- Reuse for community, core, and research partner sections where markup overlaps

**Modified:** `src/pages/Partners.tsx`
- Import and use `PartnerCard` in all four partner grid sections (strategic, core, community, research)
- Remove duplicated card markup

---

## 2. Replace `window.location.href` with React Router Navigation

Currently, internal links in `TopNavBar.tsx`, `Footer.tsx`, and `TimelineHero.tsx` use `window.location.href`, causing full page reloads instead of SPA transitions.

**Modified files:**
- `src/components/timeline/TopNavBar.tsx` — Import `useNavigate` from `react-router-dom`. In `handleNavClick`, replace `window.location.href = href` with `navigate(href)` for internal routes. Keep `window.location.href` only for `mailto:` links. Replace the logo click (`window.location.href = '/'`) with `navigate('/')`.
- `src/components/timeline/Footer.tsx` — Same pattern: import `useNavigate`, use it for internal `/` routes, keep `window.location.href` for `mailto:`.
- `src/components/timeline/TimelineHero.tsx` — Replace `window.location.href = '/contact'` with `navigate('/contact')`.

---

## 3. Standardize SEO with `useSEO` Hook

Currently only `News.tsx` and `AspireEvents.tsx` use the `useSEO` hook. Other pages either use manual `document.title` or have no SEO setup at all.

**Modified files** (add `useSEO` import and call, remove manual `document.title` logic):

| Page | Current | Change |
|------|---------|--------|
| `Index.tsx` | Manual `useEffect` with `document.title` + meta tag updates (~30 lines) | Replace with `useSEO({...})` |
| `AboutUs.tsx` | No title set | Add `useSEO({title: 'About Us \| Black Tech Street', ...})` |
| `Contact.tsx` | Manual `document.title` | Replace with `useSEO({...})` |
| `Gallery.tsx` | No title/meta | Add `useSEO({...})` |
| `Partners.tsx` | No title/meta | Add `useSEO({...})` |
| `Aspire.tsx` | Manual `document.title` | Replace with `useSEO({...})` |
| `AspireEventJune2026.tsx` | No title set | Add `useSEO({...})` |
| `AspireEventSeptember2026.tsx` | Manual `document.title` | Replace with `useSEO({...})` |
| `AspireEventDecember2026.tsx` | Manual `document.title` | Replace with `useSEO({...})` |

Each call will include `title`, `description`, and `canonical` for proper SEO coverage.

