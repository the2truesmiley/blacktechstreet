## Problem

When Josephine's or Allen's card is expanded on desktop, the bio runs many lines tall in the right column while the headshot stays short on the left. This leaves a large empty space below the photo and makes the card feel unbalanced.

## Fix

In `src/components/timeline/TeamSection.tsx`, change the card layout so that when expanded on desktop, the bio text wraps under the headshot instead of staying in a narrow right column.

Approach: keep the current side-by-side layout for the collapsed state (name, title, short bio next to photo), but when `isExpanded` is true, render the expanded bio as a full-width block below the avatar+header row. This uses the entire card width for long-form text and eliminates the lopsided empty space next to the photo.

Specifically:
- Wrap the existing flex row in a column container
- Keep avatar + name/title/LinkedIn + short bio in the top row (as today)
- Move the `AnimatePresence` expanded bio block out of the right column and place it below the row, spanning full card width with appropriate top padding
- Keep the chevron indicator behavior unchanged

No copy or data changes. No changes to mobile layout (already stacks vertically).
