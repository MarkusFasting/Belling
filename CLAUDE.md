# CLAUDE.md — EZ-Fix AS (v2 · April 2026)

> Sannhetskilden for Claude Code i dette prosjektet.
> Les FØRST. Oppdater `tasks/lessons.md` ved feil. La Auto Memory håndtere resten.

-----

## Identitet

- **Selskap:** EZ-Fix AS (ez-fix.no)
- **Eier:** Markus Fasting
- **Språk:** Norsk i all kommunikasjon, engelsk i kode og kommentarer
- **Tidssone:** Europe/Oslo
- **Kvalitet > Hastighet** — alltid

-----

## Hukommelsessystemer

Claude Code har tre lag med hukommelse. Kjenn din rolle i hvert:

### 1. CLAUDE.md (denne filen)

- **Du leser** denne ved sesjonstart
- **Markus vedlikeholder** innholdet
- Inneholder: regler, prinsipper, prosjektinfo, destruktive operasjoner
- Hold under 200 linjer per fil. Splitt med `.claude/rules/*.md` ved behov

### 2. Auto Memory (~/.claude/projects/<project>/memory/)

- **Du skriver** automatisk mens du jobber
- Lagrer: build-kommandoer, kode-patterns, debugging-innsikt, preferanser
- MEMORY.md er indeksen — hold under 200 linjer
- Topic-filer (debugging.md, api-conventions.md) lastes on-demand
- Sjekk status: `/memory` i sesjon

### 3. Auto Dream (konsolidering mellom sesjoner)

- Kjører automatisk mellom sesjoner
- Konverterer relative datoer → absolutte
- Sletter motsigende fakta
- Fjerner utdaterte minner
- Merger overlappende entries
- Sjekk status: `/memory` → se "Auto-dream: on"

**Regel:** Ikke dupliser mellom lagene. CLAUDE.md = regler og kontekst. Auto Memory = lærte patterns. tasks/lessons.md = eksplisitte feil som ALDRI skal gjentas.

-----

## Self-Improvement Loop

Dette er kjernen i hvordan du blir bedre over tid:

```
FEIL OPPSTÅR
    ↓
Markus korrigerer deg
    ↓
Du logger i tasks/lessons.md:
  - Dato
  - Hva gikk galt
  - Rotårsak
  - Regel for å unngå gjentakelse
    ↓
Ved neste sesjonstart: les tasks/lessons.md
    ↓
Feilraten synker over tid
```

### Format for lessons.md

```markdown
## Lessons Learned

### 2026-04-10 · SSH-escaping i Docker
- **Feil:** Brukte enkle anførselstegn inne i enkle anførselstegn
- **Rotårsak:** Manglet escape av nested quotes
- **Regel:** Bruk heredoc eller doble anførselstegn ytterst ved nested SSH
```

### Triggere

- Etter ENHVER korreksjon fra Markus → oppdater lessons.md
- Etter uventet feil du oppdager selv → oppdater lessons.md
- Etter refaktorering som avdekker dårlig pattern → oppdater lessons.md
- **Ikke vent til slutten av sesjonen** — logg umiddelbart

-----

## Workflow Orchestration

### Plan Mode Default

- Enter plan mode for ENHVER ikke-triviell oppgave (3+ steg)
- Skriv plan til `tasks/todo.md` med checkbare items FØR implementering
- Hvis noe går galt: STOPP og re-planlegg — ikke push videre på feil spor

### Subagent Strategy

- Bruk subagenter for research, utforsking og parallell analyse
- Hold hovedkontekstvinduet rent
- Én oppgave per subagent

### Verification Before Done

- Aldri marker oppgave som ferdig uten å bevise at den fungerer
- Kjør tester, sjekk logger, demonstrer korrekthet
- Spør: "Ville en senior utvikler godkjent dette?"

### Demand Elegance (Balanced)

- For ikke-trivielle endringer: "finnes det en mer elegant løsning?"
- Skip for enkle, åpenbare fixes

### Autonomous Bug Fixing

- Bugreport? Bare fiks den. Ikke spør om lov for åpenbare bugs.

-----

## Destruktive Operasjoner — KREVER GODKJENNING

Følgende krever eksplisitt OK fra Markus:

- Sletting av filer, databaser, eller data
- Endringer i produksjonsmiljø
- Git force push eller rebase av delt branch
- Endring av DNS, domener, eller SSL
- Endring av serverinfrastruktur eller nettverk
- Sletting eller overskriving av modellvekter/checkpoints
- Endring av treningsparametre på aktiv trening
- Endring av .env-filer eller secrets

**ALLTID** lag backup før destruktive endringer.
**ALDRI** commit secrets til git.

-----

## Core Principles

- **Simplicity First:** Minimal kode-impact per endring
- **No Laziness:** Finn rotårsaker. Senior utvikler-standard.
- **Minimal Impact:** Kun berør det nødvendige
- **Aldri gjett:** Usikker? Si det eksplisitt.
- **Verifiser før konklusjon:** Bevis at det fungerer
- **Manifest > alt annet:** Dokumentasjon først

-----

## Kommunikasjon

- Norsk til Markus, alltid
- Direkte — ikke byråkratisk
- Ved feil: eie den, fiks den, dokumenter den
- Trenger mer info? Spør én gang, presist.

-----

## Filstruktur

```
prosjekt/
├── CLAUDE.md              ← Denne filen
├── .claude/
│   └── rules/             ← Prosjektspesifikke regler (valgfritt)
├── tasks/
│   ├── todo.md            ← Aktiv oppgaveliste
│   ├── lessons.md         ← Self-improvement loop (KRITISK)
│   ├── architecture.md    ← Arkitekturbeslutninger
│   └── changelog.md       ← Hva, når, hvorfor
└── ...
```

-----

## Prosjektspesifikk Konfigurasjon

> Fyll ut denne seksjonen per prosjekt.

- **Prosjektnavn:**
- **Tech Stack:**
- **Repo:**
- **Servere:**
- **Viktige paths:**
- **Kjente gotchas:**

-----

*Versjon 2.0 · April 2026 · Vedlikeholdes av Markus Fasting*
