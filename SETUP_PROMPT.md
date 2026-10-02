# Eiendomsgrunn.no - Komplett Setup-prompt

Kopier alt under streken og lim inn i en ny Claude Code-sesjon på serveren din:

---

Sett opp Eiendomsgrunn.no webappen fra scratch. Dette er en Next.js 14 app med TypeScript, Tailwind CSS og Leaflet-kart. Den henter eiendomsdata fra norske offentlige API-er (Kartverket, Geonorge, SSB, eInnsyn).

## Steg 1: Initialiser prosjektet

```bash
npx create-next-app@14 eiendomsgrunn --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd eiendomsgrunn
npm install leaflet@^1.9.4
npm install -D @types/leaflet@^1.9.8
```

## Steg 2: Opprett alle filer

Opprett følgende filer med nøyaktig dette innholdet:

### package.json
Oppdater scripts og dependencies til:
```json
{
  "name": "eiendomsgrunn",
  "version": "0.2.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "leaflet": "^1.9.4",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.8",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

### next.config.mjs
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### postcss.config.js
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1C1C1E",
          50: "#F7F6F3",
          100: "#EDECE8",
          200: "#E0DED8",
          300: "#C7C4BC",
          400: "#A8A49B",
          500: "#8A857B",
          600: "#6E6A62",
          700: "#53504A",
          800: "#3A3835",
          900: "#1C1C1E",
        },
        stone: {
          warm: "#F7F6F3",
          light: "#EDECE8",
          mid: "#E0DED8",
          border: "#D4D1CB",
        },
        mineral: {
          DEFAULT: "#8B7355",
          light: "#A8916F",
          dark: "#6F5B42",
          muted: "#B5A48C",
          wash: "#F5F0E8",
        },
        confidence: {
          dokumentert: "#4A7C59",
          opplyst: "#5B7FA5",
          utledet: "#B8915A",
          uavklart: "#9B9590",
        },
        avvik: "#C45D4A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        display: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        heading: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        micro: ["0.6875rem", { lineHeight: "1.3", fontWeight: "500", letterSpacing: "0.02em" }],
      },
      borderRadius: {
        card: "10px",
        button: "8px",
        badge: "5px",
        input: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,28,30,0.04), 0 2px 8px rgba(28,28,30,0.03)",
        "card-hover": "0 2px 4px rgba(28,28,30,0.06), 0 4px 16px rgba(28,28,30,0.04)",
        elevated: "0 4px 12px rgba(28,28,30,0.08), 0 1px 3px rgba(28,28,30,0.04)",
        "input-focus": "0 0 0 3px rgba(139,115,85,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
```

### tsconfig.json
Standard Next.js tsconfig med `@/*` path alias pointing to `./src/*`.

### src/types/index.ts
```ts
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
    representasjonspunkt: { lat: number; lon: number };
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
```

Nå opprett resten av filene. Klon GitHub-repoet `MarkusFasting/Belling` branch `claude/research-property-data-apis-b0wa7` for å få all kildekoden, eller opprett filene manuelt basert på strukturen nedenfor.

## Filstruktur som må opprettes:

```
src/
├── app/
│   ├── globals.css          # Tailwind imports + custom component classes
│   ├── layout.tsx           # Root layout med Header + Footer
│   ├── page.tsx             # Landing page med søk, trust levels, benefits
│   ├── om/page.tsx          # Om-side med datakilder og team
│   ├── pris/page.tsx        # Prissside med 4 planer
│   ├── sok/page.tsx         # Dedikert søkeside
│   ├── eiendom/[slug]/page.tsx  # Eiendomsrapport-side
│   └── api/
│       ├── search/route.ts      # Proxy til Kartverket Adresse-API
│       ├── eiendom/route.ts     # Bygger PropertyReport
│       ├── eiendom/grenser/route.ts  # WFS eiendomsgrenser
│       └── einnsyn/route.ts     # eInnsyn søk
├── components/
│   ├── ui/                  # Gjenbrukbare UI-komponenter
│   │   ├── SearchInput.tsx
│   │   ├── ConfidenceBadge.tsx
│   │   ├── AlertCard.tsx
│   │   ├── Skeleton.tsx
│   │   ├── ValidationBadge.tsx
│   │   ├── SectionCard.tsx
│   │   └── DataRow.tsx
│   ├── layout/
│   │   ├── Header.tsx       # Sticky header med nav
│   │   └── Footer.tsx       # Footer med kolonner
│   ├── property/            # Eiendomsrapport-seksjoner
│   │   ├── PropertySummary.tsx
│   │   ├── IdentitySection.tsx
│   │   ├── MapSection.tsx
│   │   ├── ZoningSection.tsx
│   │   ├── FieldValidationSection.tsx
│   │   ├── DocumentAnalysisSection.tsx
│   │   ├── DiscrepancySection.tsx
│   │   ├── SourceRegistrySection.tsx
│   │   └── ActionsSection.tsx
│   ├── map/
│   │   ├── DynamicMap.tsx   # next/dynamic wrapper (SSR: false)
│   │   └── LeafletMap.tsx   # Leaflet kart med Kartverket-fliser
│   ├── chat/
│   │   └── ChatPanel.tsx    # Chat-panel (placeholder)
│   └── document/
│       └── DocumentUpload.tsx  # Drag & drop upload
├── hooks/
│   ├── useSearch.ts         # Debounced adressesøk
│   └── usePropertyData.ts   # Henter PropertyReport
├── lib/
│   ├── api/
│   │   ├── kartverket.ts    # Adresse, Eiendom, Kommuneinfo, Høydedata
│   │   ├── geonorge.ts      # WFS eiendomsgrenser + arealplan
│   │   ├── ssb.ts           # Boligprisindeks
│   │   └── einnsyn.ts       # eInnsyn dokumentsøk
│   ├── buildPropertyReport.ts  # Sammenstiller rapport
│   └── utils/
│       ├── coordinates.ts   # EPSG:4258 → WGS84
│       └── formatters.ts    # Norsk formatering
└── types/
    └── index.ts             # Alle TypeScript-typer
```

## Steg 3: Bygg og start

```bash
npm run build
npm run start
# Eller for utvikling:
npm run dev
```

## Steg 4: Deploy til Vercel

```bash
npx vercel --prod
```

## Viktige API-er som brukes (alle åpne, ingen nøkkel):

1. **Kartverket Adresse-API**: `https://ws.geonorge.no/adresser/v1/sok`
2. **Kartverket Eiendom-API**: `https://ws.geonorge.no/eiendom/v1/`
3. **Kartverket Kommuneinfo**: `https://ws.geonorge.no/kommuneinfo/v1/`
4. **Kartverket Høydedata**: `https://ws.geonorge.no/hoydedata/v1/`
5. **Kartverket WMTS (kart-fliser)**: `https://cache.kartverket.no/v1/wmts/`
6. **Geonorge WFS Eiendomskart**: `https://wfs.geonorge.no/skwms1/wfs.matrikkelen-eiendomskart-teig`
7. **SSB Statistikkbanken**: `https://data.ssb.no/api/v0/`
8. **eInnsyn**: `https://api.einnsyn.no/api/search`

## Den raskeste måten:

Klon repoet direkte:
```bash
git clone -b claude/research-property-data-apis-b0wa7 https://github.com/MarkusFasting/Belling.git
cd Belling
npm install
npm run build
npm run start
```

Eller deploy til Vercel via dashboard: gå til vercel.com/new, koble til GitHub-repoet MarkusFasting/Belling, velg branch claude/research-property-data-apis-b0wa7.
