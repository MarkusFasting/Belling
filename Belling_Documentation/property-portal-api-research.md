# Norsk Eiendomsportal – API-tilgang Research

**Dato:** 2026-03-17
**Status:** Verifisert med live API-kall

---

## Oppsummering

| # | Kilde | Status | Kan jeg fikse selv? | Kommentar |
|---|-------|--------|---------------------|-----------|
| 1 | **Kartverket** (adresse/matrikkel) | ÅPEN | JA | Adresse-API og matrikkel-WFS er åpne |
| 2 | **Geonorge / Norge digitalt** | ÅPEN | JA | Kart, stedsnavn, kommuneinfo – alt åpent |
| 3 | **KS Fiks** | LUKKET | NEI | Krever kommunal avtale og onboarding |
| 4 | **DiBK** | DELVIS ÅPEN | JA (SGregister) | SGregister åpent; Fellestjenester Bygg krever avtale |
| 5 | **Ambita** | KOMMERSIELL | NEI | Krever salgsavtale |
| 6 | **SSB** | ÅPEN | JA | Helt åpent JSON-stat API |
| 7 | **Kommunesystem-leverandører** | LUKKET | NEI | Krever partneravtaler |
| 8 | **eInnsyn / Digdir** | ÅPEN | JA | Åpent søke-API på api.einnsyn.no |

---

## Detaljert gjennomgang

### 1. Kartverket – Adresse og Matrikkel

**Status: KAN INTEGRERES DIREKTE**

#### Adresse-API (REST, helt åpent)
- **URL:** `https://ws.geonorge.no/adresser/v1/`
- **Auth:** Ingen (åpent)
- **Format:** JSON
- **Verifisert:** Ja, fungerer uten nøkkel

**Eksempel:**
```
GET https://ws.geonorge.no/adresser/v1/sok?sok=Karl+Johans+gate+1&treffPerSide=5
```

**Data som returneres:**
- Adressenavn, nummer, bokstav
- Kommunenummer og kommunenavn
- Gårdsnummer, bruksnummer, festenummer
- Postnummer og poststed
- GPS-koordinater (EPSG:4258)
- Bruksenhetsnummer (leiligheter)
- Grunnkretsinformasjon

#### Matrikkel-adresse WFS (åpent)
- **URL:** `https://wfs.geonorge.no/skwms1/wfs.matrikkelen-adresse`
- **Auth:** Ingen
- **Format:** GML/XML (WFS 2.0)
- **Feature types:** Vegadresse, Matrikkeladresse, Atkomst

**Data som returneres via WFS:**
- Komplett adresseinformasjon
- Matrikkelnummer (kommune/gårdsnr/bruksnr)
- Grunnkrets (nummer og navn)
- Sokn/kirkesogn
- Koordinater

#### Eiendom-API – Punktoppslag (REST, helt åpent)
- **URL:** `https://ws.geonorge.no/eiendom/v1/`
- **Auth:** Ingen
- **Format:** JSON
- **Verifisert:** Ja

**Eksempel – finn eiendommer nær et punkt:**
```
GET https://ws.geonorge.no/eiendom/v1/punkt?nord=59.911&ost=10.733&koordsys=4258
```

**Data som returneres:**
- Gårdsnummer, bruksnummer, festenummer, seksjonsnummer
- Matrikkelnummertekst (f.eks. "209/496")
- Kommunenummer
- Avstand fra punkt (meter)
- Representasjonspunkt (koordinater)
- Nøyaktighetsklasse for teig
- Om det er hovedområde eller tilleggsareal

#### Eiendomsgrenser WFS (åpent!)
- **URL:** `https://wfs.geonorge.no/skwms1/wfs.matrikkelen-eiendomskart-teig`
- **Auth:** Ingen
- **Format:** GML/XML (WFS 2.0)
- **Data:** Eiendomsgrense-geometrier (teig-polygoner)
- **Bruk:** Vis eiendomsgrenser på kart

#### Matrikkel-bygningspunkt WFS
- **URL:** `https://wfs.geonorge.no/skwms1/wfs.matrikkelen-bygningspunkt`
- **Auth:** Ingen (GetCapabilities fungerer)
- **Status:** Tjenesten er tilgjengelig men feature type-navn må verifiseres nærmere

#### Høydedata-API (åpent)
- **URL:** `https://ws.geonorge.no/hoydedata/v1/`
- **Auth:** Ingen
- **Format:** JSON
- **Data:** Terrenghøyde for et gitt punkt, datakilder, terrengtyper

#### Koordinattransformasjon-API (åpent)
- **URL:** `https://ws.geonorge.no/transformering/v1/`
- **Auth:** Ingen
- **Batch:** Opptil 10 000 koordinater per kall

#### WMTS Kartfliser (åpent)
- **URL:** `https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml`
- **Auth:** Ingen (tilgangsbegrensning: "Ingen")
- **Lag:** Topografisk, Topo Gråtone, Sjøkartraster
- **Fliser:** PNG 256x256, zoom 0-18, flere EPSG-projeksjoner

#### Matrikkel + Grunnbok SOAP-API (gratis data, forenklet søknad)
- Full matrikkel med eiendomsdetaljer + grunnbok (eierforhold, heftelser)
- **Dataene er gratis** – ingen lisenskostnad
- Krever **forenklet søknad** til Kartverket
- **Søknad:** https://kartverket.no/api-og-data/eiendomsdata/soknad-api-tilgang
- Terskelen er beskrevet som "ikke høy" – bedrifter med kommersielt formål kvalifiserer som regel
- Full tilgang: offentlige etater, kommuner, banker, advokater, eiendomsmeglere, presse
- Begrenset tilgang (uten heftelser/personnr): organisasjoner med "berettiget interesse"
- **Anbefaling:** Send inn søknad tidlig – dette er billigste vei til grunnbok/eierdata (i stedet for Ambita)

---

### 2. Geonorge / Norge digitalt

**Status: KAN INTEGRERES DIREKTE**

#### Stedsnavn-API
- **URL:** `https://ws.geonorge.no/stedsnavn/v1/sted`
- **Auth:** Ingen
- **Format:** JSON
- **Verifisert:** Ja

#### Kommuneinfo-API
- **URL:** `https://ws.geonorge.no/kommuneinfo/v1/kommuner/{kommunenr}`
- **Auth:** Ingen
- **Format:** JSON
- **Verifisert:** Ja
- **Data:** Kommune-metadata, avgrensningsboks, koordinater

#### Kartkatalog-API
- **URL:** `https://kartkatalog.geonorge.no/api/search`
- **Auth:** Ingen
- **Format:** JSON
- **Bruk:** Søke etter datasett og tjenester

#### WMS/WMTS karttjenester
- Bakgrunnskart, flyfoto, topografiske kart
- Standardiserte OGC-tjenester
- Kan integreres direkte i kartvisning (Leaflet, OpenLayers, etc.)
- Eksempler:
  - `openwms.statkart.no/skwms1/wms.toporaster3` – Topografisk raster
  - `openwms.statkart.no/skwms1/wms.fjellskygge` – Fjellskygge/relieff
  - `openwms.statkart.no/skwms1/wms.matrikkel_bakgrunn2` – Matrikkel bakgrunn

#### Nedlastings-API (bulk-datasett)
- **URL:** `https://nedlasting.geonorge.no/`
- **Docs:** `https://nedlasting.geonorge.no/Help`
- **Auth:** Ingen
- **Formater:** SOSI, GML, GeoJSON, Shapefile
- **Bruk:** Last ned komplette datasett for offline/bulk-bruk

#### Tredjepartstjenester (også åpne via Geonorge)
- **NIBIO:** Jordbruksdata, jordkart (`wms.nibio.no`)
- **Riksantikvaren:** Kulturminner (`kart.ra.no`)
- **Met.no:** Vær-API (`api.met.no`)
- **NGU:** Geologiske data
- Fullt katalog: `kartkatalog.geonorge.no/apier-og-tjenester`

---

### 3. KS Fiks (Plan, Innsyn, Arkiv)

**Status: KREVER AVTALE – KAN IKKE FIKSES SELV**

- Fiks-plattformen er bygget for kommune-til-kommune og kommune-til-innbygger kommunikasjon
- API-tilgang krever at organisasjonen er registrert og onboardet i Fiks-plattformen
- Krever Maskinporten-autentisering (Digdir)
- **Kontakt:** fiks-utvikling@ks.no eller Heidi Liv Tomren (Heidi.Liv.Tomren@ks.no)

---

### 4. DiBK – Fellestjenester plan og bygg

**Status: DELVIS ÅPEN**

#### SGregister API (åpent!)
- **URL:** `https://sgregister.dibk.no/api/enterprises/`
- **Auth:** Ingen
- **Format:** JSON
- **Docs:** `https://sgregister.dibk.no/apidocs/`
- **Verifisert:** Ja

**Data:** Oppslag på bedrifter med sentral godkjenning for byggearbeid:
- `GET /api/enterprises/{orgnr}.json` – enkeltoppslag
- `GET /api/enterprises.json` – bulk-nedlasting av alle godkjente foretak (~30 MB)
- Bruk header `Accept: application/vnd.sgpub.v2` for versjon 2

#### Fellestjenester Bygg (krever avtale)
- API-er for validering, vedtak, kvittering, mangelbrev (`admbygg.dibk.no`)
- Krever brukernavn/passord fra DiBK – kun for godkjente eByggesak-leverandører
- **Kontakt:** fellestjenesterbygg@dibk.no

---

### 5. Ambita

**Status: KOMMERSIELL – KAN IKKE FIKSES SELV**

- All data (grunnbok, matrikkel, eierforhold, heftelser) krever kommersiell avtale
- Ingen åpne/gratis API-endepunkter
- **Kontakt:** tto@ambita.com (Tore Torvildsen, salgssjef)

---

### 6. SSB Statistikkbanken

**Status: KAN INTEGRERES DIREKTE**

#### JSON-stat API (helt åpent)
- **URL:** `https://data.ssb.no/api/v0/no/table/{tabellnr}`
- **Auth:** Ingen
- **Format:** JSON-stat2
- **Verifisert:** Ja, med live datautrekk

#### Relevante tabeller for eiendom:

**Aktive tabeller (nåværende data):**

| Tabell | Innhold | Granularitet | Periode |
|--------|---------|-------------|---------|
| **07221** | Prisindeks for brukte boliger (2015=100) | Kvartalsvis, per region | 1992K1 – 2025K4 |
| **07230** | Samme prisindeks, årlig | Årlig, per region | 1992 – 2025 |
| **14310** | Kvm-pris + antall omsetninger | Kvartalsvis, **per kommune** | 2025K1 – 2025K4 |
| **14545** | Samme som 14310, årlig | Årlig, **per kommune** | 2025 |
| **11386** | Prisindeks for nye boliger | Kvartalsvis | 1989K1 – 2025K4 |
| **13500** | Kvm-pris for nye eneboliger | Årlig, per region/storby | 2021 – 2025 |

**Avsluttede tabeller (historisk data, fortsatt spørrbare):**

| Tabell | Innhold | Periode |
|--------|---------|---------|
| **06035** | Selveierboliger kvm-pris, per kommune | 2002 – 2024 |
| **05963** | Selveierboliger kvm-pris, kvartalsvis, per kommune | 2006K1 – 2024K4 |
| **07241** | Borettslagsboliger kvm-pris | 2009K1 – 2024K4 |
| **06696** | Borettslagsboliger kvm-pris, per fylke | 2002 – 2024 |

> **Merk:** Tabellene 06035, 07241 osv. ble erstattet i 2025 av **14310** (kvartal) og **14545** (årlig), som slår sammen selveier og borettslag.

**Verifiserte eksempeldata:**
- Tabell 07221: Boligprisindeks hele landet Q3-Q4 2025 = `[153.2, 151.5]` (2015=100)
- Tabell 14310: Gjennomsnittlig kvm-pris hele landet Q4 2025 = `53 092 kr/kvm`
- Tabell 07241: Borettslagsboliger Q3-Q4 2024 = `[63 796, 61 365] kr/kvm`

**Eksempel POST-spørring mot 07221:**
```json
{
  "query": [
    {"code": "Region", "selection": {"filter": "item", "values": ["TOTAL"]}},
    {"code": "Boligtype", "selection": {"filter": "item", "values": ["00"]}},
    {"code": "ContentsCode", "selection": {"filter": "item", "values": ["Boligindeks"]}},
    {"code": "Tid", "selection": {"filter": "top", "values": ["4"]}}
  ],
  "response": {"format": "json-stat2"}
}
```

**Data tilgjengelig:**
- Boligprisindeks per region (Oslo, Bergen, Stavanger, Trondheim m.fl.)
- Per boligtype (enebolig, småhus, blokkleilighet)
- Kvartalsvis fra 1992 til i dag
- Kvadratmeterpriser for borettslagsboliger

---

### 7. Kommunesystem-leverandører

**Status: KREVER PARTNERAVTALER – KAN IKKE FIKSES SELV**

| Leverandør | Produkt | Kontakt |
|-----------|---------|---------|
| Norkart | Planregister/arealplaner.no | info@norkart.no |
| ACOS | Eiendom+/byggesak | post@acos.no |
| Sikri | Elements eByggesak | post@sikri.no |
| Tietoevry | Plan & Build 360° | paal.tidemand@tietoevry.com |

Alle krever formelle partneravtaler for API-tilgang.

---

### 8. eInnsyn / Digdir

**Status: KAN INTEGRERES DIREKTE**

#### Lese-API (åpent, ingen nøkkel)
- **URL:** `https://api.einnsyn.no`
- **Auth:** Ingen for lesing/søk
- **Format:** JSON
- **Verifisert:** Ja
- **OpenAPI-spec:** [github.com/felleslosninger/einnsyn-api-spec](https://github.com/felleslosninger/einnsyn-api-spec)

**Endepunkter:**
```
GET /search?q=byggesak&limit=5        – Fritekst-søk
GET /journalpost                       – Liste over journalposter
GET /saksmappe                         – Liste over saksmapper
```

- Støtter `?expand=` for nestede objekter (f.eks. `?expand=journalpost.korrespondansepart`)
- Objekt-ID-er bruker prefikser: `jp_` (journalpost), `sm_` (saksmappe), `kp_` (korrespondansepart)

**Data som returneres:**
- Saksmapper med saksnummer
- Offentlig tittel
- Publiseringsdato
- Administrativ enhet
- Korrespondanseparter
- Dokumentreferanser
- Paginering med cursor

> **Merk:** Publisering/skriving til eInnsyn krever API-nøkkel (`X-EIN-API-KEY`) fra Digdir.

---

## Konklusjon: Hva kan jeg implementere NÅ

### Kan integreres umiddelbart (åpne API-er, ingen avtale nødvendig):

1. **Adressesøk** – Kartverket Adresse-API
   - Fritekst-søk på adresser
   - Oppslag på matrikkeladresser (gnr/bnr)
   - Koordinatoppslag og punktsøk

2. **Matrikkeldata (basis)** – Kartverket WFS
   - Adressedata med matrikkelnummer
   - Bygningspunkt-lokalisering
   - **Eiendomsgrenser (teig-polygoner)** – kan tegnes på kart

3. **Kartvisning** – Kartverket WMTS + Geonorge
   - Topografiske kartfliser (zoom 0-18, PNG)
   - Bakgrunnskart, gråtone, sjøkart
   - Stedsnavn og kommuneinformasjon

4. **Boligprisstatistikk** – SSB
   - Prisindeks per region og boligtype (fra 1992)
   - Kvm-priser **ned på kommunenivå** (tabell 14310)
   - Historiske tidsserier (selveier + borettslag)

5. **Terrengdata** – Kartverket Høydedata-API
   - Terrenghøyde for ethvert punkt
   - Koordinattransformasjon mellom projeksjoner

6. **Offentlige dokumenter** – eInnsyn
   - Søk i postjournaler og saksmapper
   - Byggesak-dokumenter fra kommuner

### Krever søknad/avtale (kan IKKE fikses av meg, men veien er kort):

6. **Full matrikkel + grunnbok** (eier, heftelser, bygningsdetaljer) → **Kartverket forenklet søknad** (gratis data!)
7. **Arealplaner** → Åpne data på data.norge.no under norsk åpen lisens (kan lastes ned)

### Krever kommersiell avtale:

8. **Ambita** (grunnbok-reseller med tilleggstjenester) → Kommersiell avtale
9. **Norkart** (eiendomsdata, kart, meglerpakke) → API-nøkkel via salgsavtale
10. **Byggesaksdata** → KS Fiks / kommuneleverandør-avtaler
11. **Byggesøknad-integrasjon** → DiBK avtale

---

## Anbefalt implementeringsrekkefølge

**Fase 1 – Gratis og åpent (kan starte nå):**
1. Adressesøk med autokomplettering (Kartverket)
2. Kartvisning med eiendomsgrenser (Geonorge WMS/WMTS)
3. Boligprisstatistikk per område (SSB)
4. Offentlig dokumentsøk (eInnsyn)

**Fase 2 – Krever kontakt:**
5. Full matrikkeldata (kontakt Kartverket)
6. Grunnbok/eierforhold (kontakt Ambita)

**Fase 2 – Krever søknad (gratis):**
5. Full matrikkel + grunnbok (søknad til Kartverket – anbefales å sende ASAP)

**Fase 3 – Krever partneravtaler:**
6. Reguleringsplan-integrasjon (Norkart/KS Fiks)
7. Byggesak-integrasjon (DiBK/kommuneleverandører)
8. Eiendomsdata-berikelse (Ambita, hvis behov utover Kartverket)

---

## Tekniske begrensninger og lisens

### Rate limits (per spørring)
| API | Maks treff |
|-----|-----------|
| Adresse-API | 10 000 treff per spørring |
| Stedsnavn-API | 5 000 treff per spørring |
| Høydedata-API | 50 punkter per batch |
| SSB | Ingen publisert grense |
| eInnsyn | Cursor-basert paginering |

### Lisens
- **NLOD** (Norsk lisens for offentlige data) eller **CC BY 4.0**
- Gratis for kommersiell bruk med kildeangivelse til Kartverket/dataeier
- REST-API-ene er **ikke ment for bulk-nedlasting** – bruk nedlastings-API-et for det
