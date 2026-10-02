"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- Fix default marker icons for webpack/Next.js ---------- */
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------- Props ---------- */
interface LeafletMapProps {
  lat: number;
  lng: number;
  address: string;
  grenser?: GeoJSON.FeatureCollection;
}

export default function LeafletMap({
  lat,
  lng,
  address,
  grenser,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    /* Initialise map */
    const map = L.map(containerRef.current).setView([lat, lng], 16);
    mapRef.current = map;

    /* Kartverket topographic tiles */
    L.tileLayer(
      "https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/googlemaps/{z}/{y}/{x}.png",
      {
        attribution:
          '&copy; <a href="https://kartverket.no">Kartverket</a>',
        maxZoom: 18,
      },
    ).addTo(map);

    /* Marker */
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(address);

    /* Property boundary (grenser) */
    if (grenser && grenser.features && grenser.features.length > 0) {
      const geoJsonLayer = L.geoJSON(grenser, {
        style: {
          color: "#C45D4A",
          weight: 2,
          fillColor: "#C45D4A",
          fillOpacity: 0.1,
        },
      }).addTo(map);

      /* Fit bounds to include marker + boundary */
      const bounds = geoJsonLayer.getBounds().extend([lat, lng]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    /* Cleanup */
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, address, grenser]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full rounded-card overflow-hidden"
    />
  );
}
