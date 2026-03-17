"use client";

import type {
  PropertyReport,
  TrackedValue,
  ConfidenceLevel,
  ValidationStatus,
} from "@/types";
import SectionCard from "@/components/ui/SectionCard";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";
import ValidationBadge from "@/components/ui/ValidationBadge";

interface FieldValidationSectionProps {
  report: PropertyReport;
}

interface DataPointRow {
  field: string;
  value: string;
  confidence: ConfidenceLevel;
  source: string;
  validationStatus?: ValidationStatus;
}

/** Extract a display-friendly value from any TrackedValue. */
function formatValue(v: TrackedValue<unknown>): string {
  const val = v.value;
  if (val === null || val === undefined) return "—";
  if (typeof val === "object" && val !== null && "lat" in val && "lng" in val) {
    const coords = val as { lat: number; lng: number };
    return `${coords.lat.toFixed(4)}\u00B0 N, ${coords.lng.toFixed(4)}\u00B0 \u00D8`;
  }
  return String(val);
}

/** Collect all tracked data points from the report into a flat list. */
function collectDataPoints(report: PropertyReport): DataPointRow[] {
  const rows: DataPointRow[] = [];

  function addField(field: string, tracked: TrackedValue<unknown> | undefined): void {
    if (!tracked) return;
    rows.push({
      field,
      value: formatValue(tracked),
      confidence: tracked.confidence,
      source: tracked.source.name,
      validationStatus: tracked.validationStatus,
    });
  }

  // Identity
  const id = report.identity;
  addField("Kommunenummer", id.kommunenummer);
  addField("Kommunenavn", id.kommunenavn);
  addField("G\u00E5rdsnummer", id.gardsnummer);
  addField("Bruksnummer", id.bruksnummer);
  addField("Festenummer", id.festenummer);
  addField("Seksjonsnummer", id.seksjonsnummer);
  addField("Adresse", id.adresse);
  addField("Postnummer", id.postnummer);
  addField("Poststed", id.poststed);
  addField("Koordinater", id.koordinater);

  // Zoning
  const z = report.zoning;
  addField("Arealform\u00E5l", z.arealformaal);
  addField("Plan-ID", z.planId);
  addField("Plannavn", z.planNavn);
  addField("Plantype", z.planType);
  addField("Planstatus", z.planStatus);
  addField("Utnyttingsgrad", z.utnyttingsgrad);
  addField("Maks h\u00F8yde", z.maksHoyde);
  addField("Byggegrense", z.byggegrense);

  // Terrain
  addField("H\u00F8yde over havet", report.terrain.hoyde);

  // Building
  if (report.building) {
    const b = report.building;
    addField("Bygningstype", b.bygningstype);
    addField("Bygge\u00E5r", b.byggeaar);
    addField("Bruksareal", b.bruksareal);
    addField("Antall etasjer", b.antallEtasjer);
    addField("Bygningsstatus", b.bygningsstatus);
  }

  return rows;
}

export default function FieldValidationSection({
  report,
}: FieldValidationSectionProps) {
  const dataPoints = collectDataPoints(report);

  return (
    <SectionCard
      title="Feltvalidering"
      subtitle={`${dataPoints.length} datapunkter fra alle kilder`}
      id="field-validation"
    >
      {dataPoints.length === 0 ? (
        <p className="text-body-sm text-ink-500">
          Ingen datapunkter tilgjengelig.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-stone-border/60">
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Felt
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Verdi
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Konfidens
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Kilde
                </th>
                <th className="px-5 py-2.5 text-caption text-ink-500 font-semibold">
                  Validering
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPoints.map((dp, idx) => (
                <tr
                  key={dp.field}
                  className={`
                    border-b border-stone-border/30 last:border-b-0
                    ${idx % 2 === 0 ? "bg-white" : "bg-stone-warm"}
                  `}
                >
                  <td className="px-5 py-2.5 text-body-sm font-medium text-ink">
                    {dp.field}
                  </td>
                  <td className="px-5 py-2.5 text-body-sm text-ink-700 font-mono">
                    {dp.value}
                  </td>
                  <td className="px-5 py-2.5">
                    <ConfidenceBadge level={dp.confidence} size="sm" />
                  </td>
                  <td className="px-5 py-2.5 text-micro text-ink-500">
                    {dp.source}
                  </td>
                  <td className="px-5 py-2.5">
                    {dp.validationStatus ? (
                      <ValidationBadge status={dp.validationStatus} />
                    ) : (
                      <span className="text-micro text-ink-400">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
