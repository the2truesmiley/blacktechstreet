import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Car } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TopNavBar } from '@/components/timeline/TopNavBar';
import { Footer } from '@/components/timeline/Footer';
import { TechBackground } from '@/components/timeline/TechBackground';
import { useSEO } from '@/hooks/useSEO';

// ─── EDITABLE CONFIG ─────────────────────────────────────────────────────────
// To change the parking location, update these values:
const PARKING_CONFIG = {
  latitude: 36.1594,
  longitude: -95.9934,
  zoom: 16,
  markerLabel: 'ASPIRE Workshop Parking',
  address: '914 N Greenwood Ave, Tulsa, OK 74106',
  locationName: 'Langston University — Tulsa Campus',
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGhlMXRydWVzbWlsZXkiLCJhIjoiY21uY3d4am1rMTF2dzJ4b2YzZWlzYWExcyJ9.oIwFEKKcZYh2XwJL74EMcA';

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${PARKING_CONFIG.latitude},${PARKING_CONFIG.longitude}`;

export default function AspireParkingDetails() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useSEO({
    title: 'Parking Details — ASPIRE Workshop | Black Tech Street',
    description: `Parking information for the ASPIRE AI workshop at ${PARKING_CONFIG.locationName}. ${PARKING_CONFIG.address}`,
    canonical: 'https://blacktechstreet.ai/aspire/parking',
  });

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [PARKING_CONFIG.longitude, PARKING_CONFIG.latitude],
      zoom: PARKING_CONFIG.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const markerEl = document.createElement('div');
    markerEl.className = 'flex items-center justify-center';
    markerEl.innerHTML = `<div style="width:32px;height:32px;background:hsl(160,84%,39%);border-radius:50%;border:3px solid white;box-shadow:0 0 12px rgba(16,185,129,0.6);"></div>`;

    new mapboxgl.Marker(markerEl)
      .setLngLat([PARKING_CONFIG.longitude, PARKING_CONFIG.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="color:#111;font-family:sans-serif;"><strong>${PARKING_CONFIG.markerLabel}</strong><br/>${PARKING_CONFIG.address}</div>`
      ))
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <TechBackground />
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              <Car className="w-4 h-4" />
              Parking Information
            </div>
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
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Open in Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
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
                <li className="flex gap-2"><span className="text-primary">•</span> Free parking is available on-site</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Arrive 15 minutes early for best spots</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Accessible parking spaces are available near the entrance</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Follow posted signs for event parking</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
