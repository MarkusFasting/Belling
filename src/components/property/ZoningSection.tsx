"use client";

import type { ZoningInfo, TrackedValue } from "@/types";
import SectionCard from "@/components/ui/SectionCard";
import DataRow from "@/components/ui/DataRow";
import AlertCard from "@/components/ui/AlertCard";

interface ZoningSectionProps {
  zoning: ZoningInfo;
}

interface ZoningField {
  label: string;
  tracked: TrackedValue<string> | undefined;
}

export default function ZoningSection({ zoning }: ZoningSectionProps) {
  const fields: ZoningField[] = [
    { label: "Arealform\u00E5l", tracked: zoning.arealformaal },
    { label: "Plan-ID", tracked: zoning.planId },
    { label: "Plannavn", tracked: zoning.planNavn },
    { label: "Plantype", tracked: zoning.planType },
    { label: "Planstatus", tracked: zoning.planStatus },
    { label: "Utnyttingsgrad", tracked: zoning.utnyttingsgrad },
    { label: "Maks h\u00F8yde", tracked: zoning.maksHoyde },
    { label: "Byggegrense", tracked: zoning.byggegrense },
  ];

  const availableFields = fields.filter((f) => f.tracked !== undefined);
  const uavklartFields = availableFields.filter(
    (f) => f.tracked!.confidence === "uavklart",
  );
  const hasUavklart = uavklartFields.length > 0;

  return (
    <SectionCard
      title="Plandata og regulering"
      subtitle="Reguleringsplan og arealform\u00E5l"
      id="zoning"
    >
      {availableFields.length > 0 ? (
        <div className="divide-y divide-stone-border/40">
          {availableFields.map((field) => (
            <DataRow
              key={field.label}
              label={field.label}
              value={field.tracked!.value}
              confidence={field.tracked!.confidence}
              source={field.tracked!.source.name}
            />
          ))}
        </div>
      ) : (
        <AlertCard type="limit" title="Ingen plandata tilgjengelig">
          Det ble ikke funnet plandata for denne eiendommen i de tilgjengelige
          kildene. Kontakt kommunen for detaljert planinformasjon.
        </AlertCard>
      )}

      {hasUavklart && (
        <div className="mt-4">
          <AlertCard type="warning" title="Uavklarte felt krever manuell sjekk">
            F\u00F8lgende felt er markert som uavklart og b\u00F8r kontrolleres
            direkte med kommunen:{" "}
            <strong>{uavklartFields.map((f) => f.label).join(", ")}</strong>.
            Kommunens planavdeling kan gi n\u00F8yaktig informasjon om gjeldende
            regulering.
          </AlertCard>
        </div>
      )}
    </SectionCard>
  );
}
