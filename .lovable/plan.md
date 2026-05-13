# Highlight Carver Middle School Parking Lot

Add a visible circle overlay on the `/hq/parking` Mapbox map marking the Carver Middle School parking lot (just south of the GEM Building, across Pine St) as the recommended overflow parking area.

## What changes

**File:** `src/pages/HqParkingDetails.tsx`

1. **Add a Carver parking config** alongside the existing `PARKING_CONFIG`:
   - Approx coordinates: `lat 36.1722, lng -95.9866` (Carver Middle School lot, ~150ft south of GEM)
   - Radius: ~50 meters to encompass the lot
   - Label: "Carver Middle School — Overflow Parking"

2. **Draw a circle on the map** using a Mapbox GeoJSON source + fill/line layers built from a turf-style circle polygon (computed inline so we don't need to add `@turf/turf` as a dependency — a small ~30-line helper generates a 64-point polygon from center + radius in meters).
   - Fill: emerald `hsl(160, 84%, 39%)` at ~20% opacity
   - Outline: solid emerald, 2px
   - Added inside the existing `map.on('load', ...)` callback

3. **Add a second marker** at the Carver lot center with a smaller/secondary-styled pin and popup ("Overflow Parking — Carver Middle School").

4. **Adjust the initial map view** to fit both the GEM Building and the Carver lot:
   - Use `map.fitBounds([[gemLng, gemLat], [carverLng, carverLat]], { padding: 80 })` instead of the fixed `center`/`zoom`.

5. **Update the Parking Tips card copy** so the existing "Additional parking available across from Carver Middle School" line references the highlighted circle ("see green circle on map").

## Out of scope

- No new pages, no new dependencies, no routing changes.
- Circle is approximate — fine for wayfinding. If you later want the exact lot footprint, we'd swap the circle for a hand-drawn polygon (I can do that next round if you give me the corners or want me to trace from satellite).

## Open question

The Carver lot center coordinates above are estimated from the satellite imagery around 609 E Pine St. If you want pinpoint accuracy for the circle, share a Google Maps pin or confirm and I'll lock it in during implementation.
