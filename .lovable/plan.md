
# ASPIRE Events Calendar & Signup Page

Creating a dedicated events page at `/aspire/events` with an interactive 2026 calendar, event cards for all 4 workshops, and placeholder registration links ready for your specific Tally form URLs.

---

## Overview

Build a visually striking events page that:
- Displays an interactive 12-month calendar with ASPIRE event dates highlighted
- Shows detailed event cards with registration CTAs
- Includes a modal with embedded Tally form for registration
- Matches the site's dark theme with emerald accents

---

## Event Data

| Date | Day | Time | Location | Registration Link |
|------|-----|------|----------|-------------------|
| March 28, 2026 | Saturday | 10:00 AM - 6:00 PM | LU-Tulsa | Placeholder (you'll provide) |
| June 27, 2026 | Saturday | 10:00 AM - 6:00 PM | LU-Tulsa | Placeholder (you'll provide) |
| September 26, 2026 | Saturday | 10:00 AM - 6:00 PM | LU-Tulsa | Placeholder (you'll provide) |
| December 5, 2026 | Saturday | 10:00 AM - 6:00 PM | LU-Tulsa | Placeholder (you'll provide) |

---

## Page Layout

```text
+----------------------------------------------------------+
|  TopNavBar                                               |
+----------------------------------------------------------+
|                                                          |
|   ASPIRE 2026 EVENTS                                     |
|   GenAI Fluency & Responsible Innovation Workshops       |
|   [4 Workshops] [All Saturdays] [10AM-6PM @ LU-Tulsa]   |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|   +----------------------------------------------------+ |
|   |           INTERACTIVE 2026 CALENDAR                | |
|   |  +------+  +------+  +------+  +------+            | |
|   |  | JAN  |  | FEB  |  | MAR* |  | APR  |  ...       | |
|   |  +------+  +------+  +------+  +------+            | |
|   |  +------+  +------+  +------+  +------+            | |
|   |  | MAY  |  | JUN* |  | JUL  |  | AUG  |  ...       | |
|   |  +------+  +------+  +------+  +------+            | |
|   |  +------+  +------+  +------+  +------+            | |
|   |  | SEP* |  | OCT  |  | NOV  |  | DEC* |            | |
|   |  +------+  +------+  +------+  +------+            | |
|   |            (* = months with events)                 | |
|   +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|   UPCOMING WORKSHOPS                                     |
|   +------------------+  +------------------+             |
|   | MAR 28           |  | JUN 27           |             |
|   | Saturday         |  | Saturday         |             |
|   | 10AM - 6PM       |  | 10AM - 6PM       |             |
|   | @ LU-Tulsa       |  | @ LU-Tulsa       |             |
|   | [Register Now]   |  | [Register Now]   |             |
|   +------------------+  +------------------+             |
|   +------------------+  +------------------+             |
|   | SEP 26           |  | DEC 5            |             |
|   | Saturday         |  | Saturday         |             |
|   | 10AM - 6PM       |  | 10AM - 6PM       |             |
|   | @ LU-Tulsa       |  | @ LU-Tulsa       |             |
|   | [Register Now]   |  | [Register Now]   |             |
|   +------------------+  +------------------+             |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|   WHAT TO EXPECT                                         |
|   - Full-day immersive experience                        |
|   - Hands-on AI tool training                            |
|   - Networking with community leaders                    |
|   - Childcare options available (ask during signup)      |
|                                                          |
+----------------------------------------------------------+
|   [Questions? Contact Us]                                |
+----------------------------------------------------------+
|  Footer                                                  |
+----------------------------------------------------------+
```

---

## New Files

| File | Purpose |
|------|---------|
| `src/pages/AspireEvents.tsx` | Main events page with hero, calendar, event cards, and info sections |
| `src/components/events/EventCalendar.tsx` | Custom year-view calendar component showing all 12 months with event highlights |
| `src/components/events/EventCard.tsx` | Reusable event card with date, time, location, and CTA |
| `src/components/events/RegistrationModal.tsx` | Dialog modal with embedded Tally form iframe |
| `src/data/aspireEvents.ts` | Event data with dates, times, and placeholder registration links |

---

## Technical Details

### Event Data Structure

```typescript
// src/data/aspireEvents.ts
export interface AspireEvent {
  id: string;
  date: Date;
  title: string;
  time: string;
  location: string;
  locationFull: string;
  registrationUrl: string; // Placeholder - you'll update these
  status: 'upcoming' | 'registration-open' | 'sold-out';
}

export const aspireEvents2026: AspireEvent[] = [
  {
    id: 'march-2026',
    date: new Date(2026, 2, 28), // March 28, 2026
    title: 'ASPIRE GenAI Fluency Workshop',
    time: '10:00 AM - 6:00 PM',
    location: 'LU-Tulsa',
    locationFull: 'Langston University - Tulsa Campus',
    registrationUrl: 'https://tally.so/r/PLACEHOLDER_MARCH',
    status: 'registration-open'
  },
  // ... 3 more events
];
```

### Calendar Component

Using the existing `react-day-picker` library with customizations:
- Year-at-a-glance view (4x3 grid of months)
- Event dates highlighted with emerald glow and pulse animation
- Clickable event dates that scroll to corresponding event card
- Navigation to switch between single-month and year views

### Registration Modal

- Uses existing Radix Dialog component
- Embeds Tally form via iframe with transparent background
- Responsive sizing (90% width on mobile, max 600px on desktop)
- Event-specific URL passed as prop

### Visual Design

- Event dates: Emerald background with glow effect
- Event cards: Glass-morphism with hover animations
- Month grid: Dark cards with subtle borders
- Status badges: Registration open (emerald), Upcoming (amber), Sold out (red)

---

## Files Modified

| File | Changes |
|------|---------|
| `src/App.tsx` | Add route `/aspire/events` |
| `src/components/timeline/TopNavBar.tsx` | Add "2026 Events" link under Programs dropdown |
| `src/pages/AspireEvents.tsx` | New page (created) |
| `src/components/events/EventCalendar.tsx` | New component (created) |
| `src/components/events/EventCard.tsx` | New component (created) |
| `src/components/events/RegistrationModal.tsx` | New component (created) |
| `src/data/aspireEvents.ts` | New data file (created) |

---

## Navigation Update

The Programs dropdown in TopNavBar will be updated:

```typescript
{
  label: 'Programs',
  children: [
    { label: 'ASPIRE', href: '/aspire' },
    { label: '2026 Events', href: '/aspire/events' }, // New link
  ]
}
```

---

## After Build: Your Action Items

Once the page is built, you'll need to provide the 4 individual Tally form links for each event:
1. March 28, 2026 workshop link
2. June 27, 2026 workshop link
3. September 26, 2026 workshop link
4. December 5, 2026 workshop link

I'll update the placeholder URLs in `src/data/aspireEvents.ts` with your actual links.
