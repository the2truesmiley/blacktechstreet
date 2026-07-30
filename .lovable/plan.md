## Goal

A co-branded Black Tech Street × NVIDIA landing page at `/aspire-nvidia` that both drives registration and lays out the full run of show for the October 10, 2026 Skills Building Workshop.

## Page structure

1. **Hero** — Black Tech Street logo first, NVIDIA logo alongside (same treatment as the TYPROS page). H1: "ASPIRE Skills Building Workshop", subhead "Build the skill. Apply it to your own work. Walk out with it running."
2. **Status row** — "Now Accepting Registrations" in emerald, "Free Training" white pill.
3. **Event facts** — Saturday, October 10, 2026 · 10:00 AM – 2:00 PM · Langston University, Tulsa · 150 seats · Bring your own laptop, use any chatbot.
4. **Primary CTA** — "Reserve your seat", smooth-scrolls to the registration section.
5. **Leads** — Michael Boone (NVIDIA, skills build) and Tyrance Billingsley II, Founder & CEO (Black Tech Street, application portion).
6. **Day overview** — short framing paragraph from the run of show.
7. **Run of show timeline** — vertical timeline with each block (9:15 doors, 10:00 welcome + live build, 10:15 skills build, 11:35 break, 11:50 application, 1:20 presentations, 1:45 close), each with its bullets and lead label.
8. **The five exercises** — cards for Feed It the Truth, Question It Before You Trust It, Build the Routine, Put a Number On It, Make It Teachable, each with duration and description.
9. **What every participant leaves with** — four-item list.
10. **Registration section** — Tally embed slot. Since the form ID isn't ready yet, this ships with a placeholder card ("Registration opens soon") and the same skeleton/timeout/retry/success plumbing the TYPROS page uses, wired behind a single `TALLY_FORM_ID` constant. Drop in the ID later and the form goes live.
11. **Footer band** — Black Tech Street logo with "Powered by Black Tech Street".

## Technical notes

- New file `src/pages/AspireNvidia.tsx`, route `/aspire-nvidia` added in `src/App.tsx`.
- NVIDIA logo: generate a clean NVIDIA wordmark asset into `src/assets/` (transparent PNG) unless you'd rather upload the official one — say the word and I'll swap it.
- Reuses existing site conventions: `TopNavBar`, `TechBackground`, scroll progress bar, framer-motion staggered entrances, emerald accent, Space Grotesk headings.
- `useSEO` with title under 60 chars and a self-referencing canonical on `blacktechstreet.ai`.
- Event JSON-LD via the existing `EventJsonLd` component for the Oct 10 workshop.
- All colors via existing semantic tokens; no hardcoded color utilities.

## Open item

Send the Tally embed URL when it's ready and I'll wire it into `TALLY_FORM_ID`.
