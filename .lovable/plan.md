

# Parking Details Page with Mapbox Map

## Overview

Create a new `/aspire/parking` page with an interactive Mapbox map showing Langston Tulsa parking. The Mapbox public token (`pk.eyJ1...`) will be stored directly in the code since it's a publishable key.

## Changes

### 1. Install dependency
- `mapbox-gl` (includes types)

### 2. Create `src/pages/AspireParkingDetails.tsx`
- Reuses `TopNavBar`, `Footer`, `TechBackground` (matching existing ASPIRE pages)
- Editable `PARKING_CONFIG` constant at top of file with coordinates, zoom, address, label
- Default: Langston Tulsa (~36.1594, -95.9934)
- Mapbox GL map with custom marker
- Below map: address, parking instructions, Google Maps link
- `useSEO` for meta tags
- To change the location: edit the `PARKING_CONFIG` object's `latitude`/`longitude`/`address` values

### 3. Update `src/App.tsx`
- Add lazy import and route: `/aspire/parking`

### 4. Update `src/constants/routes.ts`
- Add `ASPIRE_PARKING: '/aspire/parking'`

### 5. Update `src/components/timeline/TopNavBar.tsx`
- Add "Parking Details" link under the G-ACE dropdown children

## Token Storage
The Mapbox token `pk.eyJ1IjoidGhlMXRydWVzbWlsZXkiLCJhIjoiY21uY3d4am1rMTF2dzJ4b2YzZWlzYWExcyJ9.oIwFEKKcZYh2XwJL74EMcA` will be stored as a constant in the page file since it's a public/publishable key.

