"use client";

import type { Discrepancy } from "@/types";
import SectionCard from "@/components/ui/SectionCard";
import AlertCard from "@/components/ui/AlertCard";

interface DiscrepancySectionProps {
  discrepancies: Discrepancy[];
}

const severityConfig: Record<
  Discrepancy["severity"],
  { label: string; bg: string; text: string; border: string }
> = {
  lav: {
    label: "Lav",
    bg: "bg-confidence-utledet/15",
    text: "text-confidence-utledet",
    border: "border-l-confidence-utledet",
  },
  medium: {
    label: "Medium",
    bg: "bg-[#E8760C]/10",
    text: "text-[#C46A0A]",
    border: "border-l-[#E8760C]",
  },
  hoy: {
    label: "H\u00F8y",
    bg: "bg-avvik/10",
    text: "text-avvik",
    border: "border-l-avvik",
  },
};

export default function DiscrepancySection({
  discrepancies,
}: DiscrepancySectionProps) {
  return (
    <SectionCard
      title="Avviksvurdering"
      subtitle={`${discrepancies.length} avvik identifisert`}
      id="discrepancies"
    >
      {discrepancies.length === 0 ? (
        <div className="rounded-card border border-confidence-dokumentert/30 bg-confidence-dokumentert/6 p-5">
          <div className="flex items-center gap-3">
            <span
              className="
                flex h-8 w-8 items-center justify-center rounded-badge
                bg-confidence-dokumentert/15 text-confidence-dokumentert
                text-body font-semibold
              "
              aria-hidden="true"
            >
              {"\u2713"}
            </span>
            <div>
              <p className="text-body-sm font-medium text-confidence-dokumentert">
                Ingen avvik funnet mellom kilder
              </p>
              <p className="text-micro text-ink-500 mt-0.5">
                Alle datapunkter samsvarer p\u00E5 tvers av tilgjengelige kilder.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Discrepancy list */}
          <div className="space-y-3">
            {discrepancies.map((disc) => {
              const sev = severityConfig[disc.severity];

              return (
                <div
                  key={disc.id}
                  className={`
                    rounded-card border border-stone-border/40
                    border-l-[3px] ${sev.border}
                    bg-white p-4
                  `}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`
                        inline-flex items-center rounded-badge px-1.5 py-0.5
                        text-micro font-semibold ${sev.bg} ${sev.text}
                      `}
                    >
                      {sev.label}
                    </span>
                    <span className="text-body-sm font-medium text-ink">
                      {disc.label}
                    </span>
                  </div>

                  {/* Conflicting values */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="rounded-badge bg-stone-warm p-3">
                      <span className="block text-micro text-ink-400 mb-0.5">
                        {disc.sourceA.source.name}
                      </span>
                      <span className="text-body-sm font-medium font-mono text-ink-700">
                        {disc.sourceA.value}
                      </span>
                    </div>
                    <div className="rounded-badge bg-stone-warm p-3">
                      <span className="block text-micro text-ink-400 mb-0.5">
                        {disc.sourceB.source.name}
                      </span>
                      <span className="text-body-sm font-medium font-mono text-ink-700">
                        {disc.sourceB.value}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body-sm text-ink-600">
                    {disc.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <AlertCard type="info" title="Om avvik">
            Avvik betyr ikke n\u00F8dvendigvis feil &mdash; det betyr at kildene
            oppgir ulike verdier for samme felt. Kontroller opplysningene med
            de aktuelle kildene for \u00E5 avklare hvilken verdi som er korrekt.
          </AlertCard>
        </div>
      )}
    </SectionCard>
  );
}
