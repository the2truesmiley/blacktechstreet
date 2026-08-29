# Make the September 19 ASPIRE page convert

Goal: turn `/aspire/events/september-2026` into a high-converting registration page, with the long Tally form as the least painful part of the experience.

## What's hurting conversion today

- The page never says **free** above the fold. "Free" is the single strongest conversion lever for a workshop and it only appears buried in the childcare/expect copy.
- The only registration path is a modal with a ~6,000px Tally form. Long forms inside a modal feel endless: no progress signal, no page scroll position, easy to abandon.
- One CTA in the hero, then nothing until the bottom of a very long page. No sticky CTA on mobile.
- Heavy always-on animation (pulsing glows, shimmer sweeps, floating blurs on nearly every section) competes with the CTA instead of pointing at it.
- No scarcity/urgency beyond the countdown clock, no social proof near the CTA, no objection handling (cost, laptop, childcare, time commitment) at the point of decision.

## Conversion plan

### 1. Hero rebuilt around the offer
- Order: eyebrow "September 19, 2026 · Tulsa" → H1 "Free full-day AI workshop" → one-line outcome subhead → CTA → trust row.
- A single high-contrast **Free · No cost · Laptops provided** trust row directly under the CTA (small icons, no boxes).
- Keep the countdown, but shrink it so it supports the CTA instead of splitting attention 50/50.
- Secondary text link under the CTA: "Takes about 3 minutes" — sets expectation for the long form.

### 2. Button and color strategy
- Keep emerald as the brand accent, but make the primary CTA the **only** emerald-filled button on the page. Everything else (Parking Details, Jovie, Contact) becomes outline/ghost/text so there is exactly one visual "click here."
- CTA sizing: full-width on mobile, auto width desktop, 48px+ tap target, solid fill, no shimmer sweep (movement reads as decoration, not affordance). Keep a subtle hover lift only.
- Consistent CTA label everywhere: "Reserve my free spot".

### 3. CTA placement (repeat the ask)
- Hero CTA.
- Inline CTA after "What to Expect".
- Inline CTA after Testimonials (peak trust moment).
- Final CTA band above the footer, replacing the current "Questions?" section's visual weight (contact drops to a text link beneath).
- **Sticky bottom CTA bar on mobile** that appears after the hero scrolls out and hides when the registration form/modal is open.

### 4. Fix the long-form experience
- Move registration to a dedicated route **`/aspire/events/september-2026/register`** rendering the Tally form full-page (still keeping the modal for users who prefer it is unnecessary — all CTAs point at the route). Full-page means real scrolling, real back button, working browser autofill, and no nested-scroll trap on iOS.
- Above the form: a short "3 steps · about 3 minutes · you'll get a confirmation email" reassurance strip plus the event date/location so the context isn't lost.
- Keep `dynamicHeight=1` height forwarding and keep the "Open the form in a new tab" escape hatch.
- Old modal entry points redirect/route to the new page; the modal component stays for other event pages until they're migrated.

### 5. Objection handling near the decision
- Compact FAQ accordion right above the final CTA: Is it really free? Do I need a laptop? Do I need experience? Childcare? What if I can't stay all day? Parking?
- Move one strong testimonial + the "free childcare" badge adjacent to the hero CTA rather than 3 sections down.

### 6. Trim the noise
- Remove infinite pulsing/shimmer loops on non-CTA elements; keep entrance reveals only.
- Respect `prefers-reduced-motion`.

## Debug pass (after implementation)

1. TypeScript check and production build.
2. Playwright run at 390 / 768 / 1440: screenshot each section, assert hero CTA, sticky mobile bar, every inline CTA, and the register route all reach the Tally form with a reachable Submit button.
3. Crawl every link/anchor on the page (internal routes, `mailto:`, Google Maps, Jovie, parking, tally.so) and report any 404/dead/stagnant target.
4. Console + network error capture on each viewport.
5. Verify redirects for the legacy September 26 URLs still land on this page.
6. Confirm SEO title/description/canonical and the Event JSON-LD reflect September 19 and the free price (`offers.price: 0`).

## Technical notes

- Files touched: `src/pages/AspireEventSeptember2026.tsx`, a new `src/pages/AspireEventSeptember2026Register.tsx`, a new sticky CTA component under `src/components/events/`, route additions in `src/App.tsx`, and possibly `src/components/seo/EventJsonLd.tsx` for the free-price offer.
- No backend or data-model changes; `src/data/aspireEvents.ts` already carries both the embed and direct Tally URLs.
