// ─── Confidence & Validation ─────────────────────────────────
export type ConfidenceLevel = "dokumentert" | "opplyst" | "utledet" | "uavklart";

export type ValidationStatus =
  | "bekreftet_flere"
  | "bekreftet_en"
  | "avvik"
  | "ikke_funnet"
  | "kun_dokument"
  | "ai_utledet";

export interface DataSource {
  type: "offentlig_register" | "opplastet_dokument" | "beregnet";
  name: string;
  url?: string;
}

export interface TrackedValue<T> {
  value: T;
  confidence: ConfidenceLevel;
  source: DataSource;
  retrievedAt: string;
  notes?: string;
  validationStatus?: ValidationStatus;
  validatedAgainst?: { source: DataSource; value: T; matches: boolean }[];
}

// ─── Search ──────────────────────────────────────────────────
export interface SearchResult {
  address: string;
  municipality: string;
  municipalityNumber: string;
  gnr: number;
  bnr: number;
  coordinates: { lat: number; lng: number };
  slug: string;
}

// ─── Property Identity ──────────────────────────────────────
export interface PropertyIdentity {
  kommunenummer: TrackedValue<string>;
  kommunenavn: TrackedValue<string>;
  gardsnummer: TrackedValue<number>;
  bruksnummer: TrackedValue<number>;
  festenummer?: TrackedValue<number>;
  seksjonsnummer?: TrackedValue<number>;
  adresse: TrackedValue<string>;
  postnummer?: TrackedValue<string>;
  poststed?: TrackedValue<string>;
  koordinater: TrackedValue<{ lat: number; lng: number }>;
}

// ─── Zoning / Plan Data ─────────────────────────────────────
export interface ZoningInfo {
  arealformaal?: TrackedValue<string>;
  planId?: TrackedValue<string>;
  planNavn?: TrackedValue<string>;
  planType?: TrackedValue<string>;
  planStatus?: TrackedValue<string>;
  utnyttingsgrad?: TrackedValue<string>;
  maksHoyde?: TrackedValue<string>;
  byggegrense?: TrackedValue<string>;
}

// ─── Terrain ─────────────────────────────────────────────────
export interface TerrainInfo {
  hoyde?: TrackedValue<number>;
}

// ─── Building Info ───────────────────────────────────────────
export interface BuildingInfo {
  bygningstype?: TrackedValue<string>;
  byggeaar?: TrackedValue<number>;
  bruksareal?: TrackedValue<number>;
  antallEtasjer?: TrackedValue<number>;
  bygningsstatus?: TrackedValue<string>;
}

// ─── Document Analysis ──────────────────────────────────────
export interface DocumentInfo {
  id: string;
  filename: string;
  type: "salgsoppgave" | "takstrapport" | "reguleringsplan" | "annet";
  uploadedAt: string;
  status: "laster_opp" | "analyserer" | "ferdig" | "feil";
  extractedData?: Record<string, TrackedValue<string>>;
}

// ─── Discrepancy ─────────────────────────────────────────────
export interface Discrepancy {
  id: string;
  field: string;
  label: string;
  sourceA: { source: DataSource; value: string };
  sourceB: { source: DataSource; value: string };
  severity: "lav" | "medium" | "hoy";
  description: string;
}

// ─── Source Registry ─────────────────────────────────────────
export interface SourceEntry {
  source: DataSource;
  fieldsProvided: string[];
  retrievedAt: string;
  status: "ok" | "feil" | "timeout";
  responseTimeMs?: number;
}

// ─── Full Property Report ───────────────────────────────────
export interface PropertyReport {
  identity: PropertyIdentity;
  zoning: ZoningInfo;
  terrain: TerrainInfo;
  building?: BuildingInfo;
  documents: DocumentInfo[];
  discrepancies: Discrepancy[];
  sources: SourceEntry[];
  generatedAt: string;
}

// ─── Chat ────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: DataSource[];
  sections?: {
    fakta?: string;
    kilde?: string;
    tolkning?: string;
    uavklart?: string;
  };
}

// ─── API Response Types ─────────────────────────────────────
export interface KartverketAdresseResponse {
  adresser: Array<{
    adressetekst: string;
    postnummer: string;
    poststed: string;
    kommunenavn: string;
    kommunenummer: string;
    gardsnummer: number;
    bruksnummer: number;
    representasjonspunkt: {
      lat: number;
      lon: number;
    };
  }>;
}

export interface GeonorgeEiendomResponse {
  teiger?: Array<{
    kommunenummer: string;
    gaardsnummer: number;
    bruksnummer: number;
    festenummer?: number;
    seksjonsnummer?: number;
    matrikkelnummertekst: string;
  }>;
}
