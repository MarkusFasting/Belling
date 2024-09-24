# Belling - Roadmap

## Hovedmål: Bygge og Integrere AI DJ som Automatiserer DJ-miksing

Hovedmålet med prosjektet er å bygge en AI som kan automatisere DJ-miksing ved hjelp av musikkanalyse, beatmatching, harmonisk mixing, effekthåndtering og intelligent låtvalg.

---

## Milepæler

### 1. Bygge AI-modellen
- **Estimert tid:** 2-3 måneder
- **Mål:** Trene og finjustere AI-modellen for musikkanalyse og beslutningstaking.
  - **Oppgaver:**
    1. Samle inn musikkfiler fra musikkbiblioteket.
    2. Bruk `librosa` eller `Essentia` for å analysere BPM, toneart, og spektrale trekk fra musikken.
    3. Lagre analysene i en CSV-fil som vil være input til AI-modellen.
    4. Bygg en grunnleggende modell som kan lære å identifisere mønstre i musikkdata.
    5. Tren modellen med musikkdata og evaluer ytelsen.
    6. Gjennomfør flere iterasjoner med justeringer av hyperparametere.

### 2. Integrere AI-modellen med Mixxx
- **Estimert tid:** 1-2 måneder
- **Mål:** Få AI til å kontrollere Mixxx, automatisere låtvalg og overganger.
  - **Oppgaver:**
    1. Utforsk Mixxx's dokumentasjon for skripting og MIDI-mapping.
    2. Implementer en grunnleggende JavaScript-skript som kan automatisere justeringer av EQ i Mixxx.
    3. Koble AI-en til Mixxx med Open Sound Control (OSC) eller MIDI-kommunikasjon.
    4. La AI-modellen ta beslutninger om låtvalg og overganger basert på musikkdata.
    5. Test AI-DJ-en i sanntid ved å la den kontrollere Mixxx.

### 3. Videreutvikle AI-DJ funksjonalitet
- **Estimert tid:** 2-3 måneder
- **Mål:** Utvikle mer avanserte DJ-teknikker som effekthåndtering, looping og harmonisk mixing.
  - **Oppgaver:**
    1. Implementere automatisert effekthåndtering i AI-modellen.
    2. La AI-en kontrollere looping, scratching og harmonisk mixing.
    3. Integrer funksjoner som lar AI-en tilpasse seg tilbakemeldinger fra publikum (forsterkningslæring).
    4. Test AI-ens evne til å bruke avanserte teknikker live, og juster etter behov.

### 4. Testing, iterasjon og lansering
- **Estimert tid:** 1-2 måneder
- **Mål:** Test AI-DJ-systemet grundig med forskjellige sjangre og publikum for å sikre at det fungerer pålitelig og som forventet.
  - **Oppgaver:**
    1. Kjør live-sett for å teste hvordan AI-en presterer i sanntid.
    2. Samle inn data fra testene for å evaluere AI-ens ytelse, spesielt med tanke på overganger, låtvalg og effekthåndtering.
    3. Iterer og juster modellen basert på resultatene fra testene.
    4. Forbered systemet for en eventuell lansering.

---

## Fremdriftsplan og tidslinje

| Hovedoppgave                         | Estimert tid    |
|--------------------------------------|-----------------|
| Bygge AI-modellen                    | 2-3 måneder     |
| Integrere AI-modellen med Mixxx       | 1-2 måneder     |
| Videreutvikling av funksjonalitet     | 2-3 måneder     |
| Testing og iterasjon                 | 1-2 måneder     |
| Lansering                            | 1 måned         |

---

## Spesifikke milepæler med tidsfrister

### 1. Fullføring av AI-modellen (Slutt på **måned 3**)
- Modellen må være i stand til å analysere musikkdata og ta grunnleggende beslutninger om låtvalg.

### 2. Grunnleggende integrasjon med Mixxx (Slutt på **måned 4**)
- AI-modellen må kunne kontrollere Mixxx, inkludert låtvalg, overganger og grunnleggende effekthåndtering.

### 3. Test AI-en live (Måned **5**)
- AI-DJ-en må kunne prestere i sanntid på live-sett uten vesentlige problemer.

### 4. Iterasjon og tilbakemelding (Måned **6**)
- Etter testing, vil tilbakemeldinger bli brukt til å forbedre AI-modellen og integrasjonen med Mixxx.

### 5. Lansering (Måned **6**)
- AI-DJ-systemet skal være klart for bruk og/eller deling.

---

## Oppfølgingsoppgaver

- **Kontinuerlig læring:** Sørg for at AI-modellen lærer kontinuerlig fra dataene den samler inn fra live-sett og publikum.
- **Utvidelse av funksjonalitet:** Etter første lansering, vurder å utvide AI-DJ-systemet med flere funksjoner, som stemningsbaserte låtvalg eller automatisk tilpasning til publikumets energinivå.
- **Kommersiell utvikling:** Utforsk muligheter for kommersiell bruk av AI-DJ-systemet.