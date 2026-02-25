

## Plan: "BTS In The News" Page

### Overview
Create a new `/news` page showcasing 44 press articles about Black Tech Street, organized by year in reverse chronological order (newest first). The page will follow the same design patterns as the Partners page (TopNavBar, Footer, dark theme, motion animations).

### Data
- 44 articles spanning 2021-2025
- Each has: headline, source, author, summary, URL, date, source type (National/Local)
- Split evenly: 22 National, 22 Local

### Page Design

**Hero Section**: "BTS In The News" headline with article count stat and brief intro text.

**Filter Bar**: Toggle between All / National / Local sources, plus year filter pills (2025, 2024, 2023, 2022, 2021).

**Article Cards**: Each card shows:
- Source badge (e.g. "CNN" with National/Local tag)
- Headline as the card title
- Date
- Summary text (truncated with expand)
- "Read Article" link opening the URL in a new tab

Articles grouped by year with year divider headers, newest first.

### Technical Details

**New files:**
1. `src/data/newsArticles.ts` - Typed array of all 44 articles parsed from the uploaded markdown
2. `src/pages/News.tsx` - The page component

**Modified files:**
1. `src/App.tsx` - Add `/news` route
2. `src/components/timeline/TopNavBar.tsx` - Add "In The News" nav link (under a new or existing dropdown)
3. `src/constants/routes.ts` - Add NEWS route

**Component structure for News.tsx:**
- Uses TopNavBar + Footer for consistency
- Framer Motion animations matching Partners page style
- Filter state for source type and year
- Cards use the existing dark card styling (`bg-card/50`, `border-border/30`)
- External links open in new tabs with `rel="noopener noreferrer"`

**Nav placement:** Add "In The News" as a top-level nav item, or nest it. Given the existing nav structure (About Us, Programs dropdown, People dropdown, Gallery, Contact), adding it as a top-level "News" link keeps it simple.

### Steps
1. Create `src/data/newsArticles.ts` with all 44 articles as typed data
2. Create `src/pages/News.tsx` with hero, filters, and article cards
3. Add lazy-loaded route in `src/App.tsx`
4. Add "News" link to TopNavBar
5. Add route constant

