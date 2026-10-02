"use client";
import { useState, useEffect } from "react";
import type { PropertyReport } from "@/types";

export function usePropertyData(kommune: string, gnr: number, bnr: number) {
  const [report, setReport] = useState<PropertyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/eiendom?kommune=${encodeURIComponent(kommune)}&gnr=${gnr}&bnr=${bnr}`
        );
        if (!res.ok) throw new Error(`Feil ved henting av eiendomsdata (${res.status})`);
        const data: PropertyReport = await res.json();
        if (!cancelled) setReport(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Ukjent feil");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [kommune, gnr, bnr]);

  return { report, loading, error };
}
