# GitHub Multi-Repo & Multi-Konto i Claude Code

## 1. Flere GitHub-kontoer (CLI)

Claude Code støtter IKKE offisielt profil-bytte, men det finnes en workaround
med separate konfigurasjonsmapper:

```bash
# Legg til i ~/.bashrc eller ~/.zshrc:
alias claude-ezfix="CLAUDE_CONFIG_DIR=~/.claude-ezfix claude"
alias claude-privat="CLAUDE_CONFIG_DIR=~/.claude-privat claude"
```

Første gang du kjører hver alias → `claude login` for den kontoen.
Etterpå husker den credentials per config-dir.

**Merk:** Krever separate Anthropic-kontoer (ulike e-poster).

## 2. Flere repos i samme sesjon (CLI)

Beste praksis: **monorepo-pattern med CONTEXT.md**

```
workspace/
├── CONTEXT.md          ← CC leser denne først
├── CLAUDE.md           ← Global regler
├── api/                ← Repo 1 (git submodule eller klon)
│   └── CLAUDE.md       ← API-spesifikke regler
├── frontend/           ← Repo 2
│   └── CLAUDE.md
└── shared-libs/        ← Repo 3
    └── CLAUDE.md
```

Start CC i `workspace/`-mappen. Si: "Les CONTEXT.md først."

CONTEXT.md inneholder:

- Hva du jobber med akkurat nå
- Hvilke repos som er involvert
- Status og neste steg

## 3. Flere repos på web (claude.ai/code)

- Gå til "+" knappen i chatten
- Søk og velg repo, eller lim inn repo-URL
- Du kan legge til FLERE repos i samme chat/prosjekt
- Begrensning: Alt må passe i kontekstvinduet

**Viktig:** Per nå støtter web kun ÉN GitHub-konto om gangen.
Bytte konto = disconnect + reconnect i Settings → Connectors → GitHub.
Dette er en kjent begrensning — feature request er åpen hos Anthropic.

## 4. Flere repos på mobil — EZ-Fix workspace-løsning

CC fra mobil (Remote Control) kan IKKE bytte repo — sesjonen er bundet til
mappen den ble startet i. Løsning: **start CC fra ~/ez-fix/ workspace-roten**.

```bash
# På kit-data-api-01:
tmux new -s cc
cd ~/ez-fix
claude --remote-control
```

Da har CC tilgang til alle 42 repos og bytter med `cd`.
Se `WORKSPACE_CLAUDE.md` for full repostruktur og hurtigkommandoer.

### To CLAUDE.md-filer som utfyller hverandre

| Fil                              | Plassering                    | Håndterer                          |
|----------------------------------|-------------------------------|------------------------------------|
| `CLAUDE_global_mobil_v2.md`      | `~/.claude/CLAUDE.md`         | CC-oppførsel, SSH, Remote Control  |
| `WORKSPACE_CLAUDE.md`            | `~/ez-fix/CLAUDE.md`          | Navigasjon, repos, hurtigkommandoer|

### Installasjon

```bash
scp CLAUDE_global_mobil_v2.md root@95.217.15.99:~/.claude/CLAUDE.md
scp WORKSPACE_CLAUDE.md root@95.217.15.99:~/ez-fix/CLAUDE.md
```

## 5. Flere repos på web (claude.ai/code)

Alternativ til Remote Control for multi-repo:
- Gå til "+" knappen i chatten
- Søk og velg repo, eller lim inn repo-URL
- Du kan legge til FLERE repos i samme chat/prosjekt
- Begrensning: Alt må passe i kontekstvinduet

**Viktig:** Per nå støtter web kun ÉN GitHub-konto om gangen.
Bytte konto = disconnect + reconnect i Settings → Connectors → GitHub.

## 6. Git submodules (alternativ)

Hvis du foretrekker submodules fremfor flat kloning:

```bash
cd ~/ez-fix
git submodule add git@github.com:markusfasting/ezfix-super-agent.git ezfix/ezfix-super-agent
# osv.
```

## Oppsummering

| Scenario                   | Løsning                                          |
|----------------------------|--------------------------------------------------|
| Flere GitHub-kontoer (CLI) | CLAUDE_CONFIG_DIR alias                          |
| Flere repos (CLI)          | Workspace-mappe ~/ez-fix/ + CLAUDE.md            |
| Flere repos (mobil)        | Remote Control fra ~/ez-fix/ workspace            |
| Flere repos (web)          | "+" knapp, legg til flere                        |
| Flere kontoer (web)        | Ikke støttet ennå — disconnect/reconnect         |
