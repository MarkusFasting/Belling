// ─── Geonorge WFS services ──────────────────────────────────

const EIENDOMSKART_WFS = "https://wfs.geonorge.no/skwms1/wfs.matrikkelen-eiendomskart-teig";
const AREALPLAN_WFS = "https://wfs.geonorge.no/skwms1/wfs.reguleringsplanforslag";

// ─── GeoJSON types ──────────────────────────────────────────

interface GeoJSONGeometry {
  type: string;
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

interface GeoJSONProperties {
  [key: string]: string | number | boolean | null | undefined;
}

interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties: GeoJSONProperties;
  id?: string;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned?: number;
}

// ─── Arealplan result ───────────────────────────────────────

export interface ArealplanInfo {
  planId: string;
  planNavn: string;
  arealformaal: string;
  planType?: string;
  planStatus?: string;
}

// ─── Helper ─────────────────────────────────────────────────

function buildWfsUrl(
  baseUrl: string,
  typeNames: string,
  cqlFilter: string,
  maxFeatures: number = 10
): string {
  const params = new URLSearchParams({
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    typeNames,
    outputFormat: "application/json",
    CQL_FILTER: cqlFilter,
    count: String(maxFeatures),
  });
  return `${baseUrl}?${params.toString()}`;
}

// ─── Public functions ───────────────────────────────────────

/**
 * Fetch property boundary polygons from Geonorge WFS.
 * Returns a GeoJSON FeatureCollection with teig (parcel) boundaries.
 */
export async function getEiendomsgrenser(
  kommunenr: string,
  gnr: number,
  bnr: number
): Promise<GeoJSONFeatureCollection | null> {
  try {
    const cqlFilter = `kommunenummer='${kommunenr}' AND gaardsnummer=${gnr} AND bruksnummer=${bnr}`;
    const url = buildWfsUrl(
      EIENDOMSKART_WFS,
      "matrikkelen_teig:Teig",
      cqlFilter,
      50
    );

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Geonorge Eiendomskart WFS returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: GeoJSONFeatureCollection = await response.json();

    if (!data.features || data.features.length === 0) {
      console.warn(`No eiendomsgrenser found for ${kommunenr}-${gnr}/${bnr}`);
      return { type: "FeatureCollection", features: [] };
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching eiendomsgrenser:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

/**
 * Attempt to fetch zoning/plan data from Geonorge arealplan WFS.
 * Returns plan info if found, or null on error or no data.
 */
export async function getArealplan(
  kommunenr: string,
  gnr: number,
  bnr: number
): Promise<ArealplanInfo | null> {
  try {
    const cqlFilter = `kommunenummer='${kommunenr}' AND gaardsnummer=${gnr} AND bruksnummer=${bnr}`;
    const url = buildWfsUrl(
      AREALPLAN_WFS,
      "Reguleringsplanforslag",
      cqlFilter,
      5
    );

    const response = await fetch(url);

    if (!response.ok) {
      // Arealplan WFS may not be available for all municipalities
      console.warn(`Geonorge Arealplan WFS returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data: GeoJSONFeatureCollection = await response.json();

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    const props = feature.properties;

    return {
      planId: String(props["planidentifikasjon"] ?? props["planId"] ?? ""),
      planNavn: String(props["plannavn"] ?? props["planNavn"] ?? ""),
      arealformaal: String(props["arealformaal"] ?? props["arealformål"] ?? ""),
      planType: props["plantype"] ? String(props["plantype"]) : undefined,
      planStatus: props["planstatus"] ? String(props["planstatus"]) : undefined,
    };
  } catch (error) {
    console.error(
      "Error fetching arealplan:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
