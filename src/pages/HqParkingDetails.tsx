import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Car, Navigation } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';

// ─── EDITABLE CONFIG ─────────────────────────────────────────────────────────
// To change the parking location, update these values:
const PARKING_CONFIG = {
  latitude: 36.173000,
  longitude: -95.986900,
  zoom: 17,
  markerLabel: 'BTS HQ Grand Opening Parking',
  address: '609 E Pine St, Tulsa, OK 74106',
  locationName: 'GEM Building — BTS HQ & Microsoft Cyber + AI Lab',
};

// Overflow parking lots
const CARVER_PARKING = {
  latitude: 36.176586,
  longitude: -95.986343,
  radiusMeters: 70,
  shortLabel: 'Carver Middle School Lot',
  label: 'Carver Middle School Lot',
};

const PARKING_LOT_2 = {
  latitude: 36.178030,
  longitude: -95.984117,
  radiusMeters: 70,
  shortLabel: 'Rudisill Lot',
  label: 'Rudisill Lot',
};

const PARKING_LOT_3 = {
  latitude: 36.177257,
  longitude: -95.985477,
  radiusMeters: 25,
  shortLabel: 'East Lot',
  label: 'East Lot',
};

const PARKING_LOT_4 = {
  latitude: 36.178327,
  longitude: -95.985684,
  radiusMeters: 70,
  shortLabel: 'PartnerTulsa Lot',
  label: 'PartnerTulsa Lot',
};

// Generate a circle polygon (GeoJSON) from a center point and radius in meters.
function circlePolygon(lng: number, lat: number, radiusMeters: number, points = 64) {
  const coords: [number, number][] = [];
  const earthRadius = 6378137;
  const lat1 = (lat * Math.PI) / 180;
  for (let i = 0; i <= points; i++) {
    const bearing = (i * 2 * Math.PI) / points;
    const dByR = radiusMeters / earthRadius;
    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing)
    );
    const lng2 =
      (lng * Math.PI) / 180 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
        Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat2)
      );
    coords.push([(lng2 * 180) / Math.PI, (lat2 * 180) / Math.PI]);
  }
  return coords;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGhlMXRydWVzbWlsZXkiLCJhIjoiY21uY3d4am1rMTF2dzJ4b2YzZWlzYWExcyJ9.oIwFEKKcZYh2XwJL74EMcA';

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${PARKING_CONFIG.latitude},${PARKING_CONFIG.longitude}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${PARKING_CONFIG.latitude},${PARKING_CONFIG.longitude}`;

export default function HqParkingDetails() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const lotsRef = useRef<Record<string, mapboxgl.Marker>>({});

  const flyToLot = (id: string, lot: { latitude: number; longitude: number }) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lot.longitude, lot.latitude],
        zoom: 18,
        essential: true,
      });
    }
    const marker = lotsRef.current[id];
    if (marker) {
      marker.togglePopup();
      setTimeout(() => marker.togglePopup(), 2500);
    }
  };

  useSEO({
    title: 'Parking Details — BTS HQ Grand Opening | Black Tech Street',
    description: `Parking information for the BTS HQ & Microsoft Cyber + AI Lab Grand Opening at the ${PARKING_CONFIG.locationName}. ${PARKING_CONFIG.address}`,
    canonical: 'https://blacktechstreet.ai/hq/parking',
  });

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [PARKING_CONFIG.longitude, PARKING_CONFIG.latitude],
      zoom: PARKING_CONFIG.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // (Primary GEM Building marker removed — not a parking location)


    // Helper: build a marker with always-visible short label + hover popup with full label
    const addParkingMarker = (id: string, lot: { latitude: number; longitude: number; label: string; shortLabel: string }) => {
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;flex-direction:column;align-items:center;cursor:pointer;';
      el.innerHTML = `
        <div style="background:rgba(255,255,255,0.95);color:#111;font-family:sans-serif;font-size:11px;font-weight:600;padding:3px 8px;border-radius:9999px;box-shadow:0 1px 4px rgba(0,0,0,0.25);white-space:nowrap;margin-bottom:4px;">${lot.shortLabel}</div>
        <div style="width:22px;height:22px;background:hsl(160,84%,39%);border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(16,185,129,0.6);"></div>
      `;
      const popup = new mapboxgl.Popup({ offset: 28, closeButton: false, closeOnClick: false }).setHTML(
        `<div style="color:#111;font-family:sans-serif;"><strong>${lot.label}</strong></div>`
      );
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lot.longitude, lot.latitude])
        .setPopup(popup)
        .addTo(map);
      el.addEventListener('mouseenter', () => marker.togglePopup());
      el.addEventListener('mouseleave', () => marker.togglePopup());
      lotsRef.current[id] = marker;
    };

    addParkingMarker('carver', CARVER_PARKING);
    addParkingMarker('lot2', PARKING_LOT_2);
    addParkingMarker('lot3', PARKING_LOT_3);
    addParkingMarker('lot4', PARKING_LOT_4);


    // Circle overlays around overflow parking lots
    map.on('load', () => {
      const addCircle = (id: string, lng: number, lat: number, r: number) => {
        const ring = circlePolygon(lng, lat, r);
        map.addSource(id, {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } },
        });
        map.addLayer({
          id: `${id}-fill`,
          type: 'fill',
          source: id,
          paint: { 'fill-color': 'hsl(160, 84%, 39%)', 'fill-opacity': 0.22 },
        });
        map.addLayer({
          id: `${id}-line`,
          type: 'line',
          source: id,
          paint: { 'line-color': 'hsl(160, 84%, 45%)', 'line-width': 2.5 },
        });
      };

      addCircle('carver-circle', CARVER_PARKING.longitude, CARVER_PARKING.latitude, CARVER_PARKING.radiusMeters);
      addCircle('lot2-circle', PARKING_LOT_2.longitude, PARKING_LOT_2.latitude, PARKING_LOT_2.radiusMeters);
      addCircle('lot3-circle', PARKING_LOT_3.longitude, PARKING_LOT_3.latitude, PARKING_LOT_3.radiusMeters);
      addCircle('lot4-circle', PARKING_LOT_4.longitude, PARKING_LOT_4.latitude, PARKING_LOT_4.radiusMeters);

      // Fit all points into view
      const bounds = new mapboxgl.LngLatBounds()
        .extend([PARKING_CONFIG.longitude, PARKING_CONFIG.latitude])
        .extend([CARVER_PARKING.longitude, CARVER_PARKING.latitude])
        .extend([PARKING_LOT_2.longitude, PARKING_LOT_2.latitude])
        .extend([PARKING_LOT_3.longitude, PARKING_LOT_3.latitude])
        .extend([PARKING_LOT_4.longitude, PARKING_LOT_4.latitude]);
      map.fitBounds(bounds, { padding: 90, maxZoom: 17.5, duration: 0 });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <TechBackground isVisible={true} />
      <TopNavBar />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Parking Details
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {PARKING_CONFIG.locationName}
            </p>
          </motion.div>
        </section>

        {/* Map */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl overflow-hidden border border-border/30 shadow-lg"
          >
            <div ref={mapContainer} className="w-full h-[400px] sm:h-[500px]" />
          </motion.div>
        </section>

        {/* Info Cards */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {/* Address Card */}
            <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Address</h2>
              </div>
              <p className="text-muted-foreground mb-1 font-medium">{PARKING_CONFIG.locationName}</p>
              <p className="text-muted-foreground mb-4">{PARKING_CONFIG.address}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Parking Tips Card */}
            <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Parking Tips</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex gap-2"><span className="text-primary">•</span> Free street parking is available around the GEM Building</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Arrive early</li>
                <li className="flex gap-2 flex-wrap">
                  <span className="text-primary">•</span>
                  <span>Overflow parking available at: </span>
                  <button onClick={() => flyToLot(CARVER_PARKING)} className="text-primary underline hover:text-primary/80 cursor-pointer bg-transparent border-none p-0 font-inherit text-sm">Carver Middle School Lot</button>,
                  <button onClick={() => flyToLot(PARKING_LOT_2)} className="text-primary underline hover:text-primary/80 cursor-pointer bg-transparent border-none p-0 font-inherit text-sm">Rudisill Lot</button>,
                  <button onClick={() => flyToLot(PARKING_LOT_3)} className="text-primary underline hover:text-primary/80 cursor-pointer bg-transparent border-none p-0 font-inherit text-sm">East Lot</button>, and
                  <button onClick={() => flyToLot(PARKING_LOT_4)} className="text-primary underline hover:text-primary/80 cursor-pointer bg-transparent border-none p-0 font-inherit text-sm">PartnerTulsa Lot</button>
                  <span> (highlighted in green on the map)</span>
                </li>
                <li className="flex gap-2"><span className="text-primary">•</span> This is an outdoor event — dress comfortably for the weather</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
