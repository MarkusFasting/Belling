# CLAUDE.md — Belling / DJ Belling (v3 · April 2026)

> Sannhetskilden for Claude Code i dette prosjektet.
> Les FØRST. Oppdater `tasks/lessons.md` ved feil.

-----

## Identitet

- **Selskap:** EZ-Fix AS (ez-fix.no)
- **Eier:** Markus Fasting
- **Språk:** Norsk i all kommunikasjon, engelsk i kode og kommentarer
- **Tidssone:** Europe/Oslo
- **Kvalitet > Hastighet** — alltid

-----

## Prosjekt

**DJ Belling** — AI-DJ-system som automatiserer DJ-miksing: beatmatching,
harmonisk mixing, effekthåndtering og intelligent låtvalg via Mixxx.

- **Tech Stack:** Python (librosa, Essentia), Mixxx (MIDI/OSC), Google Colab
- **Repo:** markusfasting/belling
- **Viktige paths:**
  - `Belling_Codebase/` — Python-scripts (analyse, trening, eksport)
  - `Belling_Music_Dataset/` — Musikk for trening
  - `Belling_Training_Data/` — DJ-teknikker og guider
  - `Colab_Notebooks/` — Jupyter notebooks
  - `Belling_Roadmap_And_Instructions/` — Prosjektdokumentasjon
- **Kjente gotchas:**
  - `train_dj_ai.py` bruker utdatert OpenAI API (text-davinci-003) — må oppdateres
  - Musikk-datasett-mappen er tom — trenger data før trening

-----

## Arbeidsmetode — Plan → Critic → Bygg → Test

### Når brukes hva?

| Oppgave | Plan Mode | Critic |
|---|---|---|
| Ny feature >30 min | Alltid | Alltid |
| Refaktorering | Alltid | Alltid |
| AI-pipeline / modellendring | Alltid | Alltid |
| Mixxx-integrasjon | Alltid | Valgfritt |
| Nytt API-endepunkt | Ja | Valgfritt |
| Bugfix <15 min | Nei | Nei |
| Docs / README | Nei | Nei |

### Flyten

1. **Plan Mode** — Skrivebeskyttet analyse. Skriv plan til `tasks/todo.md`
2. **Critic** (subagent) — Utfordrer planen før bygging starter
3. **Implementer** — Bygg etter godkjent plan. Avvik = oppdater planen først
4. **Test** — Hooks kjører automatisk. Verifiser manuelt i tillegg

### Critic-prompt

```
Du er senior teknisk reviewer. Din eneste jobb er å finne problemer.
For hvert punkt i planen:
1. EDGE CASES — Tom input? Null? Timeout? Store datamengder?
2. MANGLER — Feilhåndtering? Validering? Logging?
3. SIKKERHET — Injection? Hardkodede secrets? Sensitive data i logger?
4. YTELSE — N+1 queries? Blokkerende operasjoner i hot path?
5. ENKLERE LØSNING — Færre bevegelige deler? Eksisterende bibliotek?
Vær brutalt ærlig. Marker som KRITISK, VIKTIG, eller FORSLAG.
```

### Regler

- Hvis noe går galt: STOPP og re-planlegg — ikke push videre på feil spor
- Aldri marker oppgave som ferdig uten å bevise at den fungerer
- For ikke-trivielle endringer: "finnes det en mer elegant løsning?"
- Bugreport? Bare fiks den. Ikke spør om lov for åpenbare bugs

-----

## Forbud

- Ingen nye Python-pakker uten godkjenning
- Ingen endringer i treningsparametre uten bekreftelse
- Ingen env-var eller API-nøkkel-endringer uten bekreftelse
- Ingen destruktive operasjoner på musikkdata uten backup

-----

## Destruktive Operasjoner — KREVER GODKJENNING

- Sletting av filer, databaser, eller data
- Sletting eller overskriving av modellvekter/checkpoints
- Endring av treningsparametre på aktiv trening
- Git force push eller rebase av delt branch
- Endring av .env-filer eller secrets

**ALLTID** lag backup før destruktive endringer.
**ALDRI** commit secrets til git.

-----

## Self-Improvement Loop

Etter ENHVER korreksjon eller uventet feil → oppdater `tasks/lessons.md` umiddelbart:

```markdown
### DATO · Kort tittel
- **Feil:** Hva gikk galt
- **Rotårsak:** Hvorfor
- **Regel:** Hvordan unngå gjentakelse
```

-----

## Core Principles

- **Simplicity First:** Minimal kode-impact per endring
- **No Laziness:** Finn rotårsaker. Senior utvikler-standard
- **Minimal Impact:** Kun berør det nødvendige
- **Aldri gjett:** Usikker? Si det eksplisitt
- **Verifiser før konklusjon:** Bevis at det fungerer

-----

## Kommunikasjon

- Norsk til Markus, alltid
- Direkte — ikke byråkratisk
- Ved feil: eie den, fiks den, dokumenter den

-----

## Kontekst

- Se `Belling_Roadmap_And_Instructions/` for prosjektdokumentasjon
- Se `tasks/lessons.md` for tidligere lærdommer
- Se `Belling_Codebase/` for eksisterende scripts

-----

*Versjon 3.0 · April 2026 · Vedlikeholdes av Markus Fasting*
