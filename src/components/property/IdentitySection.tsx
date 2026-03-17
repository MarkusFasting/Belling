"use client";

import type { PropertyIdentity } from "@/types";
import SectionCard from "@/components/ui/SectionCard";
import DataRow from "@/components/ui/DataRow";

interface IdentitySectionProps {
  identity: PropertyIdentity;
}

export default function IdentitySection({ identity }: IdentitySectionProps) {
  const coords = identity.koordinater.value;
  const formattedCoords = `${coords.lat.toFixed(4)}\u00B0 N, ${coords.lng.toFixed(4)}\u00B0 \u00D8`;

  return (
    <SectionCard
      title="Eiendomsidentitet"
      subtitle="Matrikkeldata og adresseinformasjon"
      id="identity"
    >
      <div className="divide-y divide-stone-border/40">
        <DataRow
          label="Kommunenummer"
          value={identity.kommunenummer.value}
          confidence={identity.kommunenummer.confidence}
          source={identity.kommunenummer.source.name}
          mono
        />
        <DataRow
          label="Kommunenavn"
          value={identity.kommunenavn.value}
          confidence={identity.kommunenavn.confidence}
          source={identity.kommunenavn.source.name}
        />
        <DataRow
          label="G\u00E5rdsnummer"
          value={identity.gardsnummer.value}
          confidence={identity.gardsnummer.confidence}
          source={identity.gardsnummer.source.name}
          mono
        />
        <DataRow
          label="Bruksnummer"
          value={identity.bruksnummer.value}
          confidence={identity.bruksnummer.confidence}
          source={identity.bruksnummer.source.name}
          mono
        />
        <DataRow
          label="Adresse"
          value={identity.adresse.value}
          confidence={identity.adresse.confidence}
          source={identity.adresse.source.name}
        />
        {identity.postnummer && identity.poststed && (
          <DataRow
            label="Postnummer / Poststed"
            value={`${identity.postnummer.value} ${identity.poststed.value}`}
            confidence={identity.postnummer.confidence}
            source={identity.postnummer.source.name}
          />
        )}
        {identity.postnummer && !identity.poststed && (
          <DataRow
            label="Postnummer"
            value={identity.postnummer.value}
            confidence={identity.postnummer.confidence}
            source={identity.postnummer.source.name}
            mono
          />
        )}
        <DataRow
          label="Koordinater"
          value={formattedCoords}
          confidence={identity.koordinater.confidence}
          source={identity.koordinater.source.name}
          mono
        />
      </div>
    </SectionCard>
  );
}
