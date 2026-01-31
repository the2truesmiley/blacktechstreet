
# Homepage Enhancement Plan (Matrix Theme Preserved)

Keeping the signature Matrix aesthetic while integrating the new layout from the reference design.

---

## Overview

Enhance the homepage hero to match the reference layout while preserving all Matrix-themed effects (falling characters, scanning lines, particles, pulsing rings). Update the Social section to a two-column layout.

---

## Changes

### 1. Enhanced Hero Section (Matrix Theme + New Layout)
**File:** `src/components/timeline/TimelineHero.tsx`

**Preserved Matrix Effects:**
- MatrixRain (falling katakana/binary characters)
- ScanningLines (horizontal + vertical scanning lines)
- FloatingParticles (12 pulsing emerald particles)
- PulsingRings (concentric circles)

**New Layout Changes:**
- Expand hero to full viewport height (`min-h-screen`)
- **Two-column layout** for content:
  - **Left side**: Full mission statement headline + "Get Involved" CTA button
  - **Right side**: Large B logo with pulsing glow (repositioned/enlarged)
- Update headline from "Black Tech Street" to:
  > "Creating The Blueprint For An AI-Powered Society On The Grounds Of Historic Greenwood"
- Add prominent "Get Involved" CTA button with glass-morphism style
- Logo size increased from 112px to ~200px

**Visual Structure:**
```text
┌─────────────────────────────────────────────────────────────┐
│  [Matrix Rain + Scanning Lines + Particles + Rings]         │
│                                                             │
│  Creating The Blueprint For                                 │
│  An AI-Powered Society            ┌────────────────────┐    │
│  On The Grounds Of                │        ████        │    │
│  Historic Greenwood               │      ████████      │    │
│                                   │    ████  ████      │    │
│  ┌──────────────────┐             │    ████████        │    │
│  │  Get Involved    │             │  (large B logo     │    │
│  └──────────────────┘             │   with glow)       │    │
│                                   └────────────────────┘    │
│                  [Scroll Indicator]                         │
└─────────────────────────────────────────────────────────────┘
```

### 2. Two-Column Social/Mission Section
**File:** `src/components/timeline/SocialSection.tsx`

- Restructure to a **two-column responsive grid**:
  - **Left column**: Instagram embed (compact)
  - **Right column**: Mission statement with highlighted "revitalizes" keyword
- Text content:
  > "Black Tech Street **revitalizes** Historic Black Wall Street through tech and innovation. ASPIRE builds AI fluency, fosters innovation, and empowers individuals to lead in an AI-driven future."
- Green highlight box around "revitalizes"

**Layout:**
```text
┌─────────────────────────────────────────────────────────────┐
│  ┌────────────────────┐    ┌──────────────────────────────┐ │
│  │                    │    │ Black Tech Street            │ │
│  │    Instagram       │    │ [revitalizes] Historic       │ │
│  │    Embed           │    │ Black Wall Street through    │ │
│  │                    │    │ tech and innovation...       │ │
│  │                    │    │                              │ │
│  └────────────────────┘    └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3. Container Width Adjustment
**File:** `src/pages/Index.tsx`

- Increase main content `max-width` from `max-w-2xl` to `max-w-5xl` to accommodate wider two-column layouts

---

## Technical Details

### Hero Responsive Behavior
- **Desktop (lg+)**: Side-by-side layout, logo on right
- **Tablet (md)**: Stacked with smaller logo above
- **Mobile**: Full-width stacked, centered content

### CTA Button Styling
- Glass-morphism background (`bg-white/10 backdrop-blur`)
- Primary border accent
- Hover scale effect with glow
- Links to contact/involvement section

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/timeline/TimelineHero.tsx` | New two-column layout, larger logo, mission headline, CTA button (all Matrix effects preserved) |
| `src/components/timeline/SocialSection.tsx` | Two-column grid with Instagram + mission text |
| `src/pages/Index.tsx` | Wider container (`max-w-5xl`) |

---

## Preserved Design Elements

| Element | Status |
|---------|--------|
| Matrix Rain (20 columns, katakana + binary) | Kept |
| Scanning Lines (horizontal + vertical) | Kept |
| Floating Particles (12 emerald particles) | Kept |
| Pulsing Rings (3 concentric circles) | Kept |
| Logo Glow Animation | Kept (enhanced size) |
| Emerald (#10b981) accent color | Kept |
