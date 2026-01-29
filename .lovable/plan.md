

# Plan: Update Navigation to Match Mega-Menu Screenshot

## Overview
Update the TopNavBar to match the reference screenshot with a mega-menu style navigation featuring dropdown columns for About Us, Programs, People, and Contact sections.

## Current vs. Target

| Current | Target (Screenshot) |
|---------|---------------------|
| Simple horizontal links: About Us, Programs, Contact | Multi-column mega-menu dropdowns |
| No dropdowns | About Us, Programs (with ASPIRE), People (Partners, Team), Contact (email, Contact Us) |
| Logo + text on left | Same - logo + "Black Tech Street" text on left |

## Implementation Details

### File: `src/components/timeline/TopNavBar.tsx`

**Changes:**

1. **Update navigation structure** to include dropdown menus with sub-items:
   - **About Us** - single link (no dropdown)
   - **Programs** - dropdown with "ASPIRE" sub-item
   - **People** - dropdown with "Partners" and "Team" sub-items
   - **Contact** - dropdown with "contact@blacktechstreet.com" (email link) and "Contact Us" link

2. **Add hover-triggered dropdowns** using React state or CSS hover:
   - Glass-morphism dropdown panels with dark background
   - Smooth fade-in animation using Framer Motion
   - High z-index to ensure visibility over other content

3. **Update mobile menu** to include all sub-items in an accordion-style expandable format

4. **Styling:**
   - Dropdown background: `bg-background/95 backdrop-blur-lg`
   - Border: `border border-border/40`
   - Sub-items: muted text that highlights on hover
   - Email link styled differently (potentially with mailto: link)

### Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] Black Tech Street     About Us    Programs▼    People▼    Contact▼  │
└─────────────────────────────────────────────────────────────────────────────┘
                                             │            │           │
                                             │            │           │
                                           ┌─┴─┐       ┌──┴──┐     ┌──┴──────────────────┐
                                           │ASPIRE│    │Partners│  │contact@blacktech...│
                                           └─────┘    │Team    │  │Contact Us          │
                                                      └────────┘  └─────────────────────┘
```

### Technical Implementation

**Dropdown Component:**
- Use hover state (`onMouseEnter`/`onMouseLeave`) for desktop
- AnimatePresence for smooth enter/exit animations
- Positioned absolutely below the nav item

**Mobile Menu:**
- Convert dropdowns to collapsible sections
- Tap to expand/collapse sub-items
- Chevron icon to indicate expandable sections

**Links:**
- "About Us" scrolls to `#about-section`
- "ASPIRE" - placeholder link (can scroll to gallery or programs)
- "Partners" - placeholder link
- "Team" - scrolls to `#team-section`
- "Contact Us" - scrolls to `#contact-section`
- Email - opens `mailto:contact@blacktechstreet.com`

