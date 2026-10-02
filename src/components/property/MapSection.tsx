"use client";

import { useEffect, useState } from "react";
import SectionCard from "@/components/ui/SectionCard";
import DynamicMap from "@/components/map/DynamicMap";

interface MapSectionProps {
  coordinates: { lat: number; lng: number };
  address: string;
  kommune: string;
  gnr: number;
  bnr: number;
}

export default function MapSection({
  coordinates,
  address,
  kommune,
  gnr,
  bnr,
}: MapSectionProps) {
  const [grenser, setGrenser] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGrenser() {
      try {
        const res = await fetch(
          `/api/eiendom/grenser?kommune=${encodeURIComponent(kommune)}&gnr=${gnr}&bnr=${bnr}`,
          { signal: controller.signal },
        );
        if (res.ok) {
          const data = (await res.json()) as GeoJSON.FeatureCollection;
          setGrenser(data);
        }
      } catch {
        // Silently handle abort / fetch errors
      }
    }

    void fetchGrenser();
    return () => controller.abort();
  }, [kommune, gnr, bnr]);

  return (
    <SectionCard title="Kart" id="map">
      <div className="rounded-card overflow-hidden border border-stone-border/40">
        <DynamicMap
          lat={coordinates.lat}
          lng={coordinates.lng}
          address={address}
          grenser={grenser}
        />
      </div>
      <p className="text-micro text-ink-400 mt-2">
        Kartdata: &copy; Kartverket
      </p>
    </SectionCard>
  );
}
