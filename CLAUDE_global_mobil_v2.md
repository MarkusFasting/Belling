# CLAUDE.md — EZ-Fix Global Mobil (v2)

> Denne filen ligger i ~/.claude/CLAUDE.md på kit-data-api-01.
> Den lastes ALLTID — uansett hvilket repo du står i.
> Håndterer: CC-oppførsel, SSH, Remote Control, destruktive regler.

-----

## Identitet

- **Selskap:** EZ-Fix AS (ez-fix.no)
- **Eier:** Markus Fasting
- **Kontekst:** Du styres fra mobil via Remote Control
- **Språk:** Norsk i kommunikasjon, engelsk i kode og kommentarer
- **Tidssone:** Europe/Oslo
- **Kvalitet > Hastighet** — alltid

-----

## SSH — Alle servere

### Direkte kommandoer

```bash
ssh root@95.217.15.99     # kit-data-api-01 (DU ER HER — CC Remote Control host)
ssh root@37.27.116.240    # GEX130 (Od1n trening, RTX 6000 Ada 48GB)
ssh root@65.21.63.58      # KIT-Omnissiah (Hovedserver, produksjon)
ssh root@78.47.170.9      # EZ-Fix-Security (Sikkerhetsserver)
ssh root@136.243.6.74     # GPU Utility (RTX 4000 SFF Ada)
ssh root@77.42.3.94       # Fasting Lab (Shared infra)
```

### Health check — alle servere

```bash
for server in 95.217.15.99 37.27.116.240 65.21.63.58 78.47.170.9 136.243.6.74 77.42.3.94; do
  echo "=== $server ==="
  ssh -o ConnectTimeout=5 root@$server "hostname && uptime && df -h / | tail -1" 2>&1
  echo ""
done
```

### Od1n treningsstatus

```bash
ssh root@37.27.116.240 "nvidia-smi && docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' && docker logs --tail 20 \$(docker ps -q --filter name=od1n 2>/dev/null) 2>/dev/null || echo 'Ingen od1n-container kjører'"
```

### Disksjekk

```bash
# Én server
ssh root@37.27.116.240 "df -h"

# Alle servere
for server in 95.217.15.99 37.27.116.240 65.21.63.58 78.47.170.9 136.243.6.74 77.42.3.94; do
  echo "=== $server ==="
  ssh -o ConnectTimeout=5 root@$server "df -h / | tail -1" 2>&1
  echo ""
done
```

### Docker-sjekk

```bash
# Én server
ssh root@65.21.63.58 "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"

# Alle servere
for server in 95.217.15.99 37.27.116.240 65.21.63.58 78.47.170.9 136.243.6.74 77.42.3.94; do
  echo "=== $server ==="
  ssh -o ConnectTimeout=5 root@$server "docker ps --format 'table {{.Names}}\t{{.Status}}'" 2>&1
  echo ""
done
```

### SSH-regler

- **ALLTID** `df -h` FØR store skriveoperasjoner (lessons learned)
- Bruk `ssh -o ConnectTimeout=5` for health checks
- Bruk heredoc eller doble anførselstegn ytterst ved nested SSH-kommandoer
- ALDRI endre SSH-konfig eller brannmurregler uten OK fra Markus
- Alle servere bruker root-bruker med SSH-nøkler fra kit-data-api-01

-----

## Kommandotabell — Mobil

Vanlige ting Markus sier fra mobil og hva du skal gjøre:

|Markus sier                          |Du gjør                                                  |
|-------------------------------------|---------------------------------------------------------|
|"sjekk serverne"                     |Kjør health check på alle 6 servere                      |
|"status od1n" / "trening"            |Kjør Od1n treningsstatus-kommandoen                      |
|"disk" / "diskplass"                 |Kjør disksjekk på alle servere                           |
|"docker status"                      |Kjør Docker-sjekk på alle servere                        |
|"gpu status"                         |`ssh root@37.27.116.240 "nvidia-smi"`                   |
|"gpu utility"                        |`ssh root@136.243.6.74 "nvidia-smi"`                    |
|"restart X på Y"                     |Spør: "Er du sikker? Produksjon?"                        |
|"deploy" / "push til prod"           |Spør: "Hvilket prosjekt og hvilken server?"              |
|"logg" / "logs"                      |Spør: "Hvilken tjeneste og server?"                      |
|"pull alle"                          |Git pull --rebase i alle repos under ~/ez-fix            |
|"status alle"                        |Git status i alle repos, rapporter kun de med endringer  |
|"hva jobber vi med?"                 |Sjekk tasks/todo.md i aktivt repo                       |

-----

## Remote Control — Troubleshooting

### Sesjonen dør / mister tilkobling

```bash
# Sjekk om tmux-sesjonen lever
ssh root@95.217.15.99 "tmux ls"

# Koble til eksisterende sesjon (krever -t for PTY)
ssh -t root@95.217.15.99 "tmux attach -t cc"

# Hvis sesjonen er borte — start på nytt
ssh -t root@95.217.15.99 "tmux new -s cc 'cd ~/ez-fix && claude --remote-control'"
```

### CC henger / responderer ikke

```bash
# Finn CC-prosessen
ssh root@95.217.15.99 "ps aux | grep claude"

# Drep og restart (krever OK fra Markus)
ssh root@95.217.15.99 "pkill -f 'claude' && tmux kill-session -t cc && tmux new -d -s cc 'cd ~/ez-fix && claude --remote-control'"
```

### Mobil-appen kobler ikke til

1. Sjekk at tmux-sesjonen kjører: `tmux ls`
2. Sjekk at claude kjører med `--remote-control`: `ps aux | grep claude`
3. Sjekk nettverkstilkobling fra mobil
4. Restart: drep sesjonen og start på nytt (se over)

### Kjente problemer

- **Repo-bytte:** CC kan IKKE bytte repo fra mobil uten restart. Løsning: start CC fra ~/ez-fix/ (workspace-roten) — da kan du cd til alle repos.
- **Kontekstvindu fullt:** Ved lange sesjoner kan konteksten bli full. Si "oppsummer og start ny sesjon."
- **SSH timeout:** Legg til `ServerAliveInterval 60` i ~/.ssh/config på kit-data-api-01.

-----

## Destruktive Operasjoner — KREVER GODKJENNING

Følgende krever eksplisitt OK fra Markus:

### Fil og data

- Sletting av filer, databaser, eller data
- `rm -rf` — ALDRI uten eksplisitt OK
- Overskriving av modellvekter/checkpoints
- Endring av treningsparametre på aktiv trening

### Git

- Force push eller rebase av delt branch
- Sletting av branches i produksjon

### Server og infra

- Endringer i produksjonsmiljø
- Docker restart i produksjon
- Endring av DNS, domener, eller SSL
- Endring av serverinfrastruktur eller nettverk
- Endring av SSH-konfig eller brannmurregler
- Endring av .env-filer eller secrets

**ALLTID** lag backup før destruktive endringer.
**ALDRI** commit secrets til git.

-----

## Self-Improvement Loop

```
FEIL OPPSTÅR → Markus korrigerer → Logg i tasks/lessons.md → Les neste sesjon → Feilrate synker
```

- Logg UMIDDELBART etter feil (ikke vent til slutten)
- Format: Dato · Feil · Rotårsak · Regel
- Logg i tasks/lessons.md i det aktuelle repoet du jobber i

-----

## Kommunikasjon

- Norsk til Markus, alltid
- Kort og direkte — ikke byråkratisk
- Ved feil: eie den, fiks den, dokumenter den
- Fra mobil = korte svar, ikke veggavtekst
- Trenger mer info? Spør én gang, presist.

-----

*Versjon 2.0 · April 2026 · ~/.claude/CLAUDE.md på kit-data-api-01*
*Installér: scp CLAUDE_global_mobil_v2.md root@95.217.15.99:~/.claude/CLAUDE.md*
