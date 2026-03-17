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
| 4 | **DiBK** | LUKKET | NEI | Krever avtale/tilkobling |
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

#### Matrikkel-bygningspunkt WFS
- **URL:** `https://wfs.geonorge.no/skwms1/wfs.matrikkelen-bygningspunkt`
- **Auth:** Ingen (GetCapabilities fungerer)
- **Status:** Tjenesten er tilgjengelig men feature type-navn må verifiseres nærmere

#### Matrikkel SOAP-API (krever avtale)
- Full matrikkel med eiendomsdetaljer krever SOAP-tilgang
- **Krever kontakt:** post@kartverket.no
- Dette gir tilgang til bygningsdetaljer, areal, etasjer osv.

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

---

### 3. KS Fiks (Plan, Innsyn, Arkiv)

**Status: KREVER AVTALE – KAN IKKE FIKSES SELV**

- Fiks-plattformen er bygget for kommune-til-kommune og kommune-til-innbygger kommunikasjon
- API-tilgang krever at organisasjonen er registrert og onboardet i Fiks-plattformen
- Krever Maskinporten-autentisering (Digdir)
- **Kontakt:** fiks-utvikling@ks.no eller Heidi Liv Tomren (Heidi.Liv.Tomren@ks.no)

---

### 4. DiBK – Fellestjenester plan og bygg

**Status: KREVER AVTALE – KAN IKKE FIKSES SELV**

- Fellestjenester Bygg er integreringsplattform for byggesøknader
- Krever formell tilkobling og avtale
- Regelmotoren kan potensielt brukes for sjekk av byggeregler
- **Kontakt:** post@dibk.no, byggsok@dibk.no

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

| Tabell | Innhold |
|--------|---------|
| **07221** | Prisindeks for brukte boliger – per region, boligtype og kvartal |
| **07241** | Borettslagsboliger – gjennomsnittlig kvm-pris og antall omsetninger |
| **06035** | Boligprisindeksen – detaljert |

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

#### Søke-API (åpent)
- **URL:** `https://api.einnsyn.no/search`
- **Auth:** Ingen
- **Format:** JSON
- **Verifisert:** Ja

**Eksempel:**
```
GET https://api.einnsyn.no/search?q=byggesak&limit=5
```

**Data som returneres:**
- Saksmapper med saksnummer
- Offentlig tittel
- Publiseringsdato
- Administrativ enhet
- Arkivdel-referanser
- Paginering med cursor

---

## Konklusjon: Hva kan jeg implementere NÅ

### Kan integreres umiddelbart (åpne API-er, ingen avtale nødvendig):

1. **Adressesøk** – Kartverket Adresse-API
   - Fritekst-søk på adresser
   - Oppslag på matrikkeladresser (gnr/bnr)
   - Koordinatoppslag

2. **Matrikkeldata (basis)** – Kartverket WFS
   - Adressedata med matrikkelnummer
   - Bygningspunkt-lokalisering

3. **Boligprisstatistikk** – SSB
   - Prisindeks per region og boligtype
   - Kvadratmeterpriser for borettslagsboliger
   - Historiske tidsserier

4. **Geografisk info** – Geonorge
   - Stedsnavn og stedsoppslag
   - Kommuneinformasjon og grenser
   - Bakgrunnskart (WMS/WMTS)

5. **Offentlige dokumenter** – eInnsyn
   - Søk i postjournaler og saksmapper
   - Byggesak-dokumenter fra kommuner

### Krever manuell kontakt/avtale (kan IKKE fikses av meg):

6. **Full matrikkel** (bygningsdetaljer, areal, etasjer) → Kartverket SOAP-avtale
7. **Grunnbok og heftelser** → Ambita kommersiell avtale
8. **Eierforhold** → Ambita kommersiell avtale
9. **Reguleringsplaner** → KS Fiks / Norkart avtale
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

**Fase 3 – Krever partneravtaler:**
7. Reguleringsplan-integrasjon (Norkart/KS Fiks)
8. Byggesak-integrasjon (DiBK/kommuneleverandører)
