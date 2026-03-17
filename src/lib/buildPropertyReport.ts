import { searchAddress, getKommuneInfo, getHoyde } from "./api/kartverket";
import { getArealplan } from "./api/geonorge";
import type {
  PropertyReport,
  TrackedValue,
  DataSource,
  ConfidenceLevel,
  PropertyIdentity,
  ZoningInfo,
  TerrainInfo,
  SourceEntry,
} from "@/types";

// ─── Helper ─────────────────────────────────────────────────

function tracked<T>(
  value: T,
  sourceName: string,
  sourceUrl?: string,
  confidence: ConfidenceLevel = "dokumentert"
): TrackedValue<T> {
  return {
    value,
    confidence,
    source: { type: "offentlig_register", name: sourceName, url: sourceUrl } satisfies DataSource,
    retrievedAt: new Date().toISOString(),
  };
}

// ─── Main report builder ────────────────────────────────────

/**
 * Assemble a PropertyReport from multiple public API calls.
 * Uses Promise.allSettled to fetch data in parallel where possible,
 * and gracefully handles individual API failures.
 */
export async function buildPropertyReport(
  kommune: string,
  gnr: number,
  bnr: number
): Promise<PropertyReport> {
  const now = new Date().toISOString();

  // Do parallel API calls using Promise.allSettled
  const [adresseResult, kommuneResult, arealplanResult] = await Promise.allSettled([
    searchAddress(`${kommune}-${gnr}/${bnr}`, 1),
    getKommuneInfo(kommune),
    getArealplan(kommune, gnr, bnr),
  ]);

  // Extract address data
  let adresseData: {
    address: string;
    coordinates: { lat: number; lng: number };
  } | null = null;

  if (
    adresseResult.status === "fulfilled" &&
    adresseResult.value &&
    adresseResult.value.length > 0
  ) {
    adresseData = adresseResult.value[0];
  }

  // If we got coordinates from address, fetch height
  let hoydeData: number | null = null;
  if (adresseData?.coordinates) {
    hoydeData = await getHoyde(adresseData.coordinates.lat, adresseData.coordinates.lng);
  }

  // Extract kommune data
  const kommuneData =
    kommuneResult.status === "fulfilled" ? kommuneResult.value : null;

  // Extract arealplan data
  const arealplanData =
    arealplanResult.status === "fulfilled" ? arealplanResult.value : null;

  // Build identity
  const identity: PropertyIdentity = {
    kommunenummer: tracked(
      kommune,
      "Kartverket Matrikkel",
      "https://ws.geonorge.no/eiendom/v1/"
    ),
    kommunenavn: kommuneData
      ? tracked(
          kommuneData.kommunenavnNorsk || kommuneData.kommunenavn,
          "Kartverket Kommuneinfo",
          "https://ws.geonorge.no/kommuneinfo/v1/"
        )
      : tracked("Ukjent kommune", "Manuelt", undefined, "uavklart"),
    gardsnummer: tracked(
      gnr,
      "Kartverket Matrikkel",
      "https://ws.geonorge.no/eiendom/v1/"
    ),
    bruksnummer: tracked(
      bnr,
      "Kartverket Matrikkel",
      "https://ws.geonorge.no/eiendom/v1/"
    ),
    adresse: adresseData
      ? tracked(
          adresseData.address,
          "Kartverket Adresse-API",
          "https://ws.geonorge.no/adresser/v1/"
        )
      : tracked(`${kommune}-${gnr}/${bnr}`, "Manuelt", undefined, "uavklart"),
    postnummer: adresseData
      ? tracked(
          adresseData.address.match(/(\d{4})/)?.[1] || "",
          "Kartverket Adresse-API"
        )
      : undefined,
    koordinater: adresseData?.coordinates
      ? tracked(
          adresseData.coordinates,
          "Kartverket Adresse-API",
          "https://ws.geonorge.no/adresser/v1/"
        )
      : tracked(
          { lat: 59.911, lng: 10.733 },
          "Standardkoordinater",
          undefined,
          "uavklart"
        ),
  };

  // Build zoning
  const zoning: ZoningInfo = {
    arealformaal: arealplanData?.arealformaal
      ? tracked(
          arealplanData.arealformaal,
          "Geonorge Arealplan WFS",
          "https://wfs.geonorge.no/"
        )
      : tracked(
          "Ikke tilgjengelig via API",
          "Uavklart",
          undefined,
          "uavklart"
        ),
    planId: arealplanData?.planId
      ? tracked(arealplanData.planId, "Geonorge Arealplan WFS")
      : undefined,
    planNavn: arealplanData?.planNavn
      ? tracked(arealplanData.planNavn, "Geonorge Arealplan WFS")
      : undefined,
  };

  // Build terrain
  const terrain: TerrainInfo = {
    hoyde: hoydeData !== null
      ? tracked(
          hoydeData,
          "Kartverket Høydedata",
          "https://ws.geonorge.no/hoydedata/v1/"
        )
      : undefined,
  };

  // Build sources registry
  const sources: SourceEntry[] = [
    {
      source: {
        type: "offentlig_register",
        name: "Kartverket Adresse-API",
        url: "https://ws.geonorge.no/adresser/v1/",
      },
      fieldsProvided: ["adresse", "postnummer", "poststed", "koordinater"],
      retrievedAt: now,
      status: adresseData ? "ok" : "feil",
    },
    {
      source: {
        type: "offentlig_register",
        name: "Kartverket Kommuneinfo",
        url: "https://ws.geonorge.no/kommuneinfo/v1/",
      },
      fieldsProvided: ["kommunenavn", "fylke"],
      retrievedAt: now,
      status: kommuneData ? "ok" : "feil",
    },
    {
      source: {
        type: "offentlig_register",
        name: "Kartverket Høydedata",
        url: "https://ws.geonorge.no/hoydedata/v1/",
      },
      fieldsProvided: ["terrenghøyde"],
      retrievedAt: now,
      status: hoydeData !== null ? "ok" : "feil",
    },
  ];

  return {
    identity,
    zoning,
    terrain,
    documents: [],
    discrepancies: [],
    sources,
    generatedAt: now,
  };
}
