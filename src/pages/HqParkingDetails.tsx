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

// Carver Middle School overflow parking lot (just south of GEM, across Pine St)
const CARVER_PARKING = {
  latitude: 36.17215,
  longitude: -95.98660,
  radiusMeters: 55,
  label: 'Carver Middle School — Overflow Parking',
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

    // Primary marker — GEM Building
    const markerEl = document.createElement('div');
    markerEl.className = 'flex items-center justify-center';
    markerEl.innerHTML = `<div style="width:32px;height:32px;background:hsl(160,84%,39%);border-radius:50%;border:3px solid white;box-shadow:0 0 12px rgba(16,185,129,0.6);"></div>`;

    new mapboxgl.Marker(markerEl)
      .setLngLat([PARKING_CONFIG.longitude, PARKING_CONFIG.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="color:#111;font-family:sans-serif;"><strong>${PARKING_CONFIG.markerLabel}</strong><br/>${PARKING_CONFIG.address}</div>`
      ))
      .addTo(map);

    // Secondary marker — Carver Middle School overflow lot
    const carverEl = document.createElement('div');
    carverEl.innerHTML = `<div style="width:22px;height:22px;background:hsl(160,84%,39%);border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(16,185,129,0.6);opacity:0.95;"></div>`;
    new mapboxgl.Marker(carverEl)
      .setLngLat([CARVER_PARKING.longitude, CARVER_PARKING.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 20 }).setHTML(
        `<div style="color:#111;font-family:sans-serif;"><strong>${CARVER_PARKING.label}</strong></div>`
      ))
      .addTo(map);

    // Circle overlay around Carver parking lot
    map.on('load', () => {
      const ring = circlePolygon(
        CARVER_PARKING.longitude,
        CARVER_PARKING.latitude,
        CARVER_PARKING.radiusMeters
      );
      map.addSource('carver-circle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Polygon', coordinates: [ring] },
        },
      });
      map.addLayer({
        id: 'carver-circle-fill',
        type: 'fill',
        source: 'carver-circle',
        paint: { 'fill-color': 'hsl(160, 84%, 39%)', 'fill-opacity': 0.22 },
      });
      map.addLayer({
        id: 'carver-circle-line',
        type: 'line',
        source: 'carver-circle',
        paint: { 'line-color': 'hsl(160, 84%, 45%)', 'line-width': 2.5 },
      });

      // Fit both points into view
      const bounds = new mapboxgl.LngLatBounds()
        .extend([PARKING_CONFIG.longitude, PARKING_CONFIG.latitude])
        .extend([CARVER_PARKING.longitude, CARVER_PARKING.latitude]);
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
                <li className="flex gap-2"><span className="text-primary">•</span> Arrive 15 minutes early for best spots</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Overflow parking at Carver Middle School lot, across Pine St (highlighted in green on the map)</li>
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
