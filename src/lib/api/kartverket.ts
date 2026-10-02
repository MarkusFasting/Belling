import type { SearchResult, KartverketAdresseResponse } from "@/types";

const ADRESSE_API = "https://ws.geonorge.no/adresser/v1";
const EIENDOM_API = "https://ws.geonorge.no/eiendom/v1";
const KOMMUNEINFO_API = "https://ws.geonorge.no/kommuneinfo/v1";
const HOYDEDATA_API = "https://ws.geonorge.no/hoydedata/v1";

// ─── Response types for Kartverket APIs ─────────────────────

interface KommuneInfoResponse {
  kommunenavn: string;
  kommunenavnNorsk: string;
  kommunenummer: string;
  fylkesnavn: string;
  fylkesnummer: string;
}

interface HoydedataResponse {
  koordsys: number;
  punkter: Array<{
    nord: number;
    ost: number;
    z: number;
    datakilde: string;
  }>;
}

interface EiendomByPointResponse {
  teiger?: Array<{
    kommunenummer: string;
    gaardsnummer: number;
    bruksnummer: number;
    festenummer?: number;
    seksjonsnummer?: number;
    matrikkelnummertekst: string;
  }>;
}

// ─── Helper ────────────────────────────────────────────────

function slugify(address: string, kommunenr: string, gnr: number, bnr: number): string {
  const addressSlug = address
    .toLowerCase()
    .replace(/[æ]/g, "ae")
    .replace(/[ø]/g, "o")
    .replace(/[å]/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${kommunenr}-${gnr}-${bnr}-${addressSlug}`;
}

// ─── Public functions ──────────────────────────────────────

/**
 * Search addresses via Kartverket Adresse-API.
 * Returns formatted results with address, kommune, gnr, bnr, coordinates, and slug.
 */
export async function searchAddress(
  query: string,
  limit: number = 10
): Promise<SearchResult[] | null> {
  try {
    const params = new URLSearchParams({
      sok: query,
      treffPerSide: String(limit),
    });

    const response = await fetch(`${ADRESSE_API}/sok?${params.toString()}`);

    if (!response.ok) {
      console.error(`Kartverket Adresse-API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: KartverketAdresseResponse = await response.json();

    if (!data.adresser || data.adresser.length === 0) {
      return [];
    }

    return data.adresser.map((adresse) => ({
      address: `${adresse.adressetekst}, ${adresse.postnummer} ${adresse.poststed}`,
      municipality: adresse.kommunenavn,
      municipalityNumber: adresse.kommunenummer,
      gnr: adresse.gardsnummer,
      bnr: adresse.bruksnummer,
      coordinates: {
        lat: adresse.representasjonspunkt.lat,
        lng: adresse.representasjonspunkt.lon,
      },
      slug: slugify(
        adresse.adressetekst,
        adresse.kommunenummer,
        adresse.gardsnummer,
        adresse.bruksnummer
      ),
    }));
  } catch (error) {
    console.error("Error searching addresses:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get property information by geographic coordinates.
 */
export async function getEiendomByPoint(
  lat: number,
  lon: number
): Promise<EiendomByPointResponse | null> {
  try {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
    });

    const response = await fetch(`${EIENDOM_API}/punkt?${params.toString()}`);

    if (!response.ok) {
      console.error(`Kartverket Eiendom-API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: EiendomByPointResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching eiendom by point:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get property by matrikkel number using the address API.
 * Searches for the pattern "kommunenr-gnr/bnr".
 */
export async function getEiendomByMatrikkel(
  kommunenr: string,
  gnr: number,
  bnr: number
): Promise<SearchResult[] | null> {
  try {
    const query = `${kommunenr}-${gnr}/${bnr}`;
    return await searchAddress(query, 5);
  } catch (error) {
    console.error("Error fetching eiendom by matrikkel:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get municipality information (name, fylke).
 */
export async function getKommuneInfo(
  kommunenr: string
): Promise<KommuneInfoResponse | null> {
  try {
    const response = await fetch(`${KOMMUNEINFO_API}/kommuner/${kommunenr}`);

    if (!response.ok) {
      console.error(`Kartverket Kommuneinfo-API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: KommuneInfoResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching kommune info:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Get terrain height at a geographic point.
 */
export async function getHoyde(
  lat: number,
  lon: number
): Promise<number | null> {
  try {
    const params = new URLSearchParams({
      koordsys: "4258",
      nord: String(lat),
      ost: String(lon),
    });

    const response = await fetch(`${HOYDEDATA_API}/punkt?${params.toString()}`);

    if (!response.ok) {
      console.error(`Kartverket Hoydedata-API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: HoydedataResponse = await response.json();

    if (data.punkter && data.punkter.length > 0) {
      return data.punkter[0].z;
    }

    return null;
  } catch (error) {
    console.error("Error fetching hoyde:", error instanceof Error ? error.message : error);
    return null;
  }
}
