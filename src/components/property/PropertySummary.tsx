"use client";

import type {
  PropertyReport,
  ConfidenceLevel,
  TrackedValue,
} from "@/types";

interface PropertySummaryProps {
  report: PropertyReport;
}

/** Extract all TrackedValues from the report for counting. */
function collectTrackedValues(report: PropertyReport): TrackedValue<unknown>[] {
  const values: TrackedValue<unknown>[] = [];

  // Identity fields
  const identity = report.identity;
  values.push(
    identity.kommunenummer,
    identity.kommunenavn,
    identity.gardsnummer,
    identity.bruksnummer,
    identity.adresse,
    identity.koordinater,
  );
  if (identity.festenummer) values.push(identity.festenummer);
  if (identity.seksjonsnummer) values.push(identity.seksjonsnummer);
  if (identity.postnummer) values.push(identity.postnummer);
  if (identity.poststed) values.push(identity.poststed);

  // Zoning fields
  const zoning = report.zoning;
  if (zoning.arealformaal) values.push(zoning.arealformaal);
  if (zoning.planId) values.push(zoning.planId);
  if (zoning.planNavn) values.push(zoning.planNavn);
  if (zoning.planType) values.push(zoning.planType);
  if (zoning.planStatus) values.push(zoning.planStatus);
  if (zoning.utnyttingsgrad) values.push(zoning.utnyttingsgrad);
  if (zoning.maksHoyde) values.push(zoning.maksHoyde);
  if (zoning.byggegrense) values.push(zoning.byggegrense);

  // Terrain fields
  if (report.terrain.hoyde) values.push(report.terrain.hoyde);

  // Building fields
  if (report.building) {
    const b = report.building;
    if (b.bygningstype) values.push(b.bygningstype);
    if (b.byggeaar) values.push(b.byggeaar);
    if (b.bruksareal) values.push(b.bruksareal);
    if (b.antallEtasjer) values.push(b.antallEtasjer);
    if (b.bygningsstatus) values.push(b.bygningsstatus);
  }

  return values;
}

const confidenceColors: Record<ConfidenceLevel, string> = {
  dokumentert: "bg-confidence-dokumentert",
  opplyst: "bg-confidence-opplyst",
  utledet: "bg-confidence-utledet",
  uavklart: "bg-confidence-uavklart",
};

const confidenceLabels: Record<ConfidenceLevel, string> = {
  dokumentert: "Dokumentert",
  opplyst: "Opplyst",
  utledet: "Utledet",
  uavklart: "Uavklart",
};

export default function PropertySummary({ report }: PropertySummaryProps) {
  const { identity } = report;
  const address = identity.adresse.value;
  const kommune = identity.kommunenavn.value;
  const kommunenr = identity.kommunenummer.value;
  const gnr = identity.gardsnummer.value;
  const bnr = identity.bruksnummer.value;
  const matrikkel = `${kommunenr}-${gnr}/${bnr}`;

  // Collect all tracked values and count by confidence
  const allValues = collectTrackedValues(report);
  const totalDataPoints = allValues.length;

  const counts: Record<ConfidenceLevel, number> = {
    dokumentert: 0,
    opplyst: 0,
    utledet: 0,
    uavklart: 0,
  };
  for (const v of allValues) {
    counts[v.confidence]++;
  }

  // Unique sources
  const sourceNames = new Set<string>();
  for (const v of allValues) {
    sourceNames.add(v.source.name);
  }
  const totalSources = sourceNames.size;

  const totalDiscrepancies = report.discrepancies.length;

  // Compute percentages for the validation bar
  const levels: ConfidenceLevel[] = ["dokumentert", "opplyst", "utledet", "uavklart"];

  return (
    <section
      className="
        bg-white rounded-card shadow-card
        border border-stone-border/50
        border-t-[3px] border-t-mineral
        overflow-hidden
        p-6 sm:p-8
      "
    >
      {/* Address & matrikkel */}
      <div className="mb-6">
        <h1 className="text-display-sm text-ink mb-1">{address}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body text-ink-500">
          <span className="font-mono text-caption">{matrikkel}</span>
          <span className="hidden sm:inline text-stone-border">|</span>
          <span>{kommune}</span>
        </div>
      </div>

      {/* Validation bar */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-caption text-ink-500">Datakvalitet</span>
        </div>
        <div className="flex h-2 w-full rounded-full overflow-hidden bg-stone-light">
          {levels.map((level) => {
            const pct = totalDataPoints > 0 ? (counts[level] / totalDataPoints) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={level}
                className={`${confidenceColors[level]} transition-all duration-500`}
                style={{ width: `${pct}%` }}
                title={`${confidenceLabels[level]}: ${counts[level]}`}
              />
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {levels.map((level) =>
            counts[level] > 0 ? (
              <div key={level} className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-sm ${confidenceColors[level]}`}
                />
                <span className="text-micro text-ink-500">
                  {confidenceLabels[level]} ({counts[level]})
                </span>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-stone-border/50">
        <div className="flex items-baseline gap-1.5">
          <span className="text-heading text-ink">{totalDataPoints}</span>
          <span className="text-caption text-ink-500">datapunkter</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-heading text-ink">{totalSources}</span>
          <span className="text-caption text-ink-500">kilder</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-heading ${totalDiscrepancies > 0 ? "text-avvik" : "text-confidence-dokumentert"}`}
          >
            {totalDiscrepancies}
          </span>
          <span className="text-caption text-ink-500">avvik</span>
        </div>
      </div>
    </section>
  );
}
