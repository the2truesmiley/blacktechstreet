# Black Tech Street

A React/Vite single-page application for Black Tech Street, an organization rebirthing Historic Black Wall Street through AI-powered community education and events.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Server**: Express.js serving Vite in dev mode; static files in production
- **Routing**: React Router v6 (client-side SPA routing)
- **State/Data**: TanStack React Query; all gallery data is static local assets
- **Forms**: Tally.so embeds for contact forms

## Key Features

- Multi-page site: Home, About, ASPIRE program, Events, Gallery, Partners, Contact, News
- Gallery page with 70+ photos, filterable by tag (all stored locally in `src/assets/gallery/`)
- ASPIRE events with registration modals
- Tally.so contact form embed (no backend required for the embed itself)
- SEO meta management via `useSEO` hook

## Project Structure

```
src/
  pages/       – Page-level React components
  components/  – Reusable UI components (timeline/, events/, ui/)
  hooks/       – Custom React hooks
  data/        – Static data files (gallery, events, news, timeline)
  assets/      – Images organized by section (gallery/)
  lib/         – Utility functions
server/
  index.ts     – Express server (serves Vite in dev, static in prod)
               – Includes /api/tally-submissions route (requires TALLY_API_KEY env var)
public/        – Static public files (favicon, robots.txt, sitemap, og-image)
```

## Development

```bash
npm run dev    # Starts Express + Vite dev server on port 5000
npm run build  # Builds frontend to dist/
```

## Environment Variables

- `TALLY_API_KEY` – (optional) Required only if using the `/api/tally-submissions` server route to fetch Tally form submissions

## Deployment

- Build command: `npm run build`
- Run command: `node dist/index.cjs` (or configure for autoscale)
- The `.replit` file has `deploymentTarget = "autoscale"`

## Migration Notes (Lovable → Replit)

- Removed Supabase dependency; gallery data now served from static local files
- Removed `lovable-tagger` dev dependency
- Ported Tally submissions Supabase Edge Function → Express route at `/api/tally-submissions`
- Vite now runs through Express (port 5000) for Replit compatibility
- All SEO canonical URLs updated from `lovable.app` to `blacktechstreet.com`
