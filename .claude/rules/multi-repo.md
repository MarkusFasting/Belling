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

## 4. Flere repos på mobil

Per nå: kun ett repo per sesjon på mobil.
Workaround: bruk workspace-patternet og CC Remote Control fra
kit-data-api-01 der du har full CLI-tilgang.

## 5. Git submodules (anbefalt for dine prosjekter)

Hvis du vil at CC skal jobbe med f.eks. super-agent + crm + od1n samtidig:

```bash
mkdir ~/PROSJEKTER/workspace
cd ~/PROSJEKTER/workspace
git submodule add git@github.com:user/ezfix-super-agent.git
git submodule add git@github.com:user/ezfix-crm.git
git submodule add git@github.com:user/od1n.git
```

Legg til en CLAUDE.md i workspace-roten som refererer til alle prosjekter.

## Oppsummering

| Scenario                   | Løsning                                  |
|----------------------------|------------------------------------------|
| Flere GitHub-kontoer (CLI) | CLAUDE_CONFIG_DIR alias                  |
| Flere repos (CLI)          | Workspace-mappe + CONTEXT.md             |
| Flere repos (web)          | "+" knapp, legg til flere                |
| Flere kontoer (web)        | Ikke støttet ennå — disconnect/reconnect |
| Flere repos (mobil)        | CC Remote Control via CLI                |
