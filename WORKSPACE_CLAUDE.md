# CLAUDE.md — EZ-Fix Workspace

> Denne filen ligger i ~/ez-fix/ (workspace-roten) på kit-data-api-01.
> Du startes HER for å ha tilgang til ALLE repos fra mobil.
> Når du jobber i et sub-repo, les CLAUDE.md der også.

-----

## Slik fungerer dette workspace

Du står i ~/ez-fix/ som er en paraply-mappe med ALLE EZ-Fix repos.
Markus styrer deg fra mobil og kan be deg jobbe i HVILKET SOM HELST repo.
Du bytter repo ved å `cd` til riktig mappe — du trenger IKKE restarte.

### Navigasjon

```bash
# Se alle repos
find ~/ez-fix -maxdepth 2 -name ".git" -type d | sed 's/\/.git//' | sort

# Gå til et repo
cd ~/ez-fix/ezfix/ezfix-super-agent

# Tilbake til workspace
cd ~/ez-fix
```

### Når Markus sier "jobb med X"

1. `cd` til riktig repo (se Repostruktur under)
1. Les CLAUDE.md i det repoet hvis den finnes
1. Les tasks/lessons.md hvis den finnes
1. Gjør jobben
1. Commit og push når ferdig (med mindre Markus sier annet)

-----

## Repostruktur — 42 repos

### ezfix/ — Interne verktøy og produkter

```
ezfix/
├── ezfix-super-agent        # Orchestrator-agent (Phase 1 ferdig, 65 filer)
├── ezfix-crm                # CRM-system (crm.ez-fix.no)
├── ezfix-leadengine          # Leadia leadsgenerator (leadsgenerator.ez-fix.no)
├── ezfix-seo-analyzer        # SEO Analyser Pro (seo.ez-fix.no)
├── ezfix-od1n                # Od1n norsk LLM (od1n.no)
├── ezfix-huginn-muninn       # Knowledge DNA / Dream Team (huginnmuninn.ai)
├── ezfix-the-kit-ai          # The KIT AI-plattform
├── ezfix-kit-ai-llm          # KIT AI LLM-relatert
├── ezfix-microcap-signal     # Microcap trading signals (SEC EDGAR)
├── ezfix-claude-local        # Claude lokal-konfig
├── ezfix-security-dashboard  # Sikkerhets-dashboard
├── ezfix-security-enterprise # Enterprise security
├── ezfix-inframaint          # Infrastruktur-vedlikehold
├── ezfix-chappie             # Chappie AI-assistent (chappie.no)
├── ezfix-robowolf            # RoboWolf-prosjekt
├── ezfix-infinity            # Infinity-prosjekt
├── ezfix-adaptive-learning   # Adaptiv læring
├── ezfix-ai-recruitment-bias # AI rekrutteringsbias
├── ezfix-ai-game-master      # AI Game Master
├── ezfix-receipt-export      # Kvitteringseksport
├── ezfix-kvitteringsleser    # Kvitteringsleser
├── ezfix-rankforhire         # RankForHire
├── ezfix-predictive-iot      # Predictive IoT
├── ezfix-lastebil-app        # Lastebil-app
├── ezfix-lastebil            # Lastebil
├── ezfix-flyttebyra-oslo     # Oslo Flyttehjelp (osloflyttehjelp.no)
├── ezfix-norway-green-travel # Norway Green Travel
└── ezfix-oversikt            # Oversikt-repo med README
```

### teknorge/ — TEK-Norge / Thomas Vogt

```
teknorge/
├── teknorge-plattform        # Hovedplattform (tek-norge.no)
├── teknorge-timegate          # TimeGate tidsregistrering
├── teknorge-smartrapport      # SmartRapport
├── teknorge-vedlikeholdsplan  # TEK-Zence vedlikeholdsplan
├── teknorge-api               # API-tjenester
└── teknorge-oversikt          # Oversikt-repo
```

### osloepoxy/ — Oslo Epoxybelegg AS

```
osloepoxy/
├── osloepoxy-timegate         # TimeGate (geofence, WEA-compliance, Tripletex)
├── osloepoxy-wp               # WordPress-side
├── osloepoxy-lab              # Lab/eksperimentelt
├── osloepoxy-tilbudsmotor     # Tilbudsmotor
└── osloepoxy-oversikt         # Oversikt-repo
```

### hugwerk/ — Hugwerk (Dyvik & Fasting Arkitekter)

```
hugwerk/
├── hugwerk-portal             # AI-portal (multi-tenant SaaS)
├── hugwerk-draftex            # Draftex-modul
└── hugwerk-oversikt           # Oversikt-repo
```

### personal/ — Personlig

```
personal/
└── personal-dj-belling        # DJ Belling / Phasting
```

-----

## Hurtigkommandoer

|Markus sier                       |Du gjør                                         |
|----------------------------------|------------------------------------------------|
|"super agent"                     |`cd ~/ez-fix/ezfix/ezfix-super-agent`           |
|"crm"                             |`cd ~/ez-fix/ezfix/ezfix-crm`                   |
|"leadia" / "leads"               |`cd ~/ez-fix/ezfix/ezfix-leadengine`            |
|"seo"                             |`cd ~/ez-fix/ezfix/ezfix-seo-analyzer`          |
|"od1n"                            |`cd ~/ez-fix/ezfix/ezfix-od1n`                  |
|"huginn" / "muninn" / "dream team"|`cd ~/ez-fix/ezfix/ezfix-huginn-muninn`         |
|"timegate" (uten kontekst)        |Spør: "TEK-Norge eller Oslo Epoxy?"             |
|"timegate tek"                    |`cd ~/ez-fix/teknorge/teknorge-timegate`        |
|"timegate epoxy"                  |`cd ~/ez-fix/osloepoxy/osloepoxy-timegate`      |
|"hugwerk"                         |`cd ~/ez-fix/hugwerk/hugwerk-portal`            |
|"draftex"                         |`cd ~/ez-fix/hugwerk/hugwerk-draftex`           |
|"smartrapport"                    |`cd ~/ez-fix/teknorge/teknorge-smartrapport`    |
|"vedlikehold" / "tek-zence"       |`cd ~/ez-fix/teknorge/teknorge-vedlikeholdsplan`|
|"microcap" / "trading"            |`cd ~/ez-fix/ezfix/ezfix-microcap-signal`       |
|"belling" / "dj"                  |`cd ~/ez-fix/personal/personal-dj-belling`      |
|"chappie"                         |`cd ~/ez-fix/ezfix/ezfix-chappie`               |
|"flyttehjelp"                     |`cd ~/ez-fix/ezfix/ezfix-flyttebyra-oslo`       |
|"sikkerhet" / "security"          |`cd ~/ez-fix/ezfix/ezfix-security-dashboard`    |
|"infra"                           |`cd ~/ez-fix/ezfix/ezfix-inframaint`            |

-----

## Git-workflow fra workspace

```bash
# Sjekk status i alle repos
for d in $(find ~/ez-fix -maxdepth 2 -name ".git" -type d); do
  repo=$(dirname $d)
  echo "=== $(basename $repo) ===" 
  git -C $repo status -s 2>&1
done

# Pull alle repos
for d in $(find ~/ez-fix -maxdepth 2 -name ".git" -type d); do
  repo=$(dirname $d)
  echo "=== $(basename $repo) ==="
  git -C $repo pull --rebase 2>&1
done

# Sjekk uncommitted changes
for d in $(find ~/ez-fix -maxdepth 2 -name ".git" -type d); do
  repo=$(dirname $d)
  changes=$(git -C $repo status -s | wc -l)
  [ $changes -gt 0 ] && echo "$(basename $repo): $changes endringer"
done
```

-----

## SSH til servere (hurtigreferanse)

```bash
ssh root@37.27.116.240   # GEX130 (Od1n trening, RTX 6000 Ada)
ssh root@65.21.63.58     # KIT-Omnissiah (Hovedserver)
ssh root@78.47.170.9     # EZ-Fix-Security
ssh root@136.243.6.74    # GPU Utility (RTX 4000 SFF)
ssh root@77.42.3.94      # Fasting Lab (Shared infra)
```

-----

## Regler

### Generelt

- Norsk i kommunikasjon, engelsk i kode
- Kvalitet > hastighet
- Verifiser før konklusjon
- Aldri gjett — si det eksplisitt

### Self-Improvement Loop

- Etter feil: logg i tasks/lessons.md i det aktuelle repoet
- Les lessons.md ved sesjonstart for hvert repo du jobber i
- Format: Dato · Feil · Rotårsak · Regel

### Destruktive operasjoner — KREVER OK fra Markus

- Slett filer/data/repos
- Endre produksjon
- Git force push
- Endre DNS/SSL
- Endre serverinfra
- Slett modellvekter/checkpoints

### Commit-regler

- Norske commit-meldinger
- Branch: feature/beskrivelse, fix/beskrivelse
- Push til GitHub etter ferdig arbeid (med mindre Markus sier annet)
- ALDRI commit secrets, .env-filer, eller API-nøkler

-----

## Oppstart-sjekkliste

Når du starter en ny sesjon i dette workspace:

1. ✅ Les denne CLAUDE.md
1. ✅ Sjekk `/memory` — er Auto Memory og Auto Dream på?
1. ✅ Vent på instruksjon fra Markus
1. ✅ Når du får et prosjekt: `cd` dit, les CLAUDE.md + lessons.md der
1. ✅ Jobb. Rapporter kort. Logg feil.

-----

*Versjon 1.0 · April 2026 · ~/ez-fix/CLAUDE.md på kit-data-api-01*
