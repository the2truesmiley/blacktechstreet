
# Plan: Update Homepage Content (Keep Existing Hero)

## Overview
This plan adds the content from the website analysis document while **preserving the current Matrix-style hero section exactly as it is** - including the matrix rain, floating particles, pulsing rings, scanning lines, animated logo, and "Black Tech Street" title.

## What Stays the Same
- **Hero Section** - No changes. Matrix rain, particles, scanning lines, pulsing rings, animated B logo, "Black Tech Street" headline, and scroll indicator all remain untouched.

## What Gets Added/Modified

### 1. Top Navigation Bar
**New file:** `src/components/timeline/TopNavBar.tsx`

A fixed navigation bar at the top of the page:
- Transparent background with glass-morphism effect
- "Black Tech Street" logo/text on the left
- Navigation links on the right: **About Us**, **Programs**, **Contact**
- Becomes more solid on scroll
- Mobile hamburger menu for smaller screens

### 2. Simplified About Section + Instagram Placeholder
**Modify:** `src/components/timeline/TimelineAboutSection.tsx`

Streamline the current 5-block about section:
- Condense into a focused mission statement block
- Add an Instagram feed placeholder section showing @blacktechstreet with a 3x2 grid of placeholder images
- Side-by-side layout on desktop (mission left, Instagram right)

### 3. Photo Gallery Section
**New file:** `src/components/timeline/PhotoGallerySection.tsx`

A new section showcasing event photos:
- Responsive grid layout (2 columns mobile, 3-4 columns desktop)
- Placeholder image cards representing workshops, presentations, group photos
- Hover effects with glass-morphism styling
- Emerald accent on hover states

### 4. Final Call-to-Action Section
**New file:** `src/components/timeline/FinalCTASection.tsx`

A high-impact section near the bottom:
- Bold headline: **"THE FUTURE OF TECH STARTS HERE."**
- Two action buttons: **"Learn More"** and **"Contact Us"**
- Gradient background with subtle glow effects
- Centered layout with emerald accents

### 5. Enhanced Footer
**New file:** `src/components/timeline/Footer.tsx`

Replace the simple copyright line with:
- Black Tech Street logo
- Social media icons (Facebook, Instagram) with hover effects
- Copyright: "Black Tech Street © 2025. All rights reserved."
- Subtle gradient top border

### 6. Page Structure Update
**Modify:** `src/pages/Index.tsx`

New section order:
```text
┌─────────────────────────────────────┐
│         TopNavBar (fixed)           │
├─────────────────────────────────────┤
│     TimelineHero (unchanged)        │
│   Matrix rain, particles, logo,     │
│   "Black Tech Street" title         │
├─────────────────────────────────────┤
│     TableOfContents (pills)         │
├─────────────────────────────────────┤
│          TeamSection                │
├─────────────────────────────────────┤
│   TimelineAboutSection (updated)    │
│   + Instagram placeholder           │
├─────────────────────────────────────┤
│      PhotoGallerySection (new)      │
├─────────────────────────────────────┤
│         TimelineSection             │
├─────────────────────────────────────┤
│       TestimonialsSection           │
├─────────────────────────────────────┤
│      FinalCTASection (new)          │
├─────────────────────────────────────┤
│         Footer (enhanced)           │
└─────────────────────────────────────┘
```

---

## Technical Details

### New Files to Create
| File | Purpose |
|------|---------|
| `src/components/timeline/TopNavBar.tsx` | Fixed navigation with glass effect |
| `src/components/timeline/PhotoGallerySection.tsx` | Event photo grid |
| `src/components/timeline/FinalCTASection.tsx` | Final CTA with action buttons |
| `src/components/timeline/Footer.tsx` | Enhanced footer with social links |

### Files to Modify
| File | Changes |
|------|---------|
| `src/components/timeline/TimelineAboutSection.tsx` | Simplify content, add Instagram placeholder |
| `src/pages/Index.tsx` | Import new components, reorder sections |

### Design Consistency
All new components follow the existing design system:
- **Colors:** Dark background, emerald (#10b981) accents
- **Effects:** Glass-morphism (backdrop-blur, semi-transparent backgrounds)
- **Animations:** Framer Motion fade-in on scroll, hover effects
- **Typography:** Space Grotesk headings, Inter body text
- **Styling:** Consistent border-radius, shadows, glow effects

---

## Summary
The Matrix-style hero with all its effects (rain, particles, rings, scanning lines, animated logo) will remain completely unchanged. The updates focus on adding navigation, simplifying the about section, adding a photo gallery, creating a final CTA, and enhancing the footer to match the website analysis content structure.
