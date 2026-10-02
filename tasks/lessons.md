# Lessons Learned

> Self-improvement loop for Claude Code.
> Logg feil umiddelbart. Les ved sesjonstart.

-----

### 2026-10-02 · Task routet til feil repo (SSH-modul-bug)
- **Feil:** Fikk oppgave om å fikse `'CommandResult' object has no len()` i en SSH-modul, med branch `claude/fix-ssh-module-bug-vpHBj` opprettet i `markusfasting/belling`.
- **Rotårsak:** Belling-repoet er musikk-/AI-DJ-prosjekt (librosa, Mixxx, rekordbox) — det inneholder ingen SSH-modul, ingen `CommandResult`-klasse, ingen ops-/CRM-kode. Buggen lever i et annet repo (sannsynligvis ezfix-super-agent eller ezfix-crm).
- **Regel:** Når Claude Code på web oppretter en branch, verifiser at koden som skal endres faktisk eksisterer i repoet FØR du begynner å "fikse". Grep etter nøkkelsymboler fra feilmeldingen (`CommandResult`, `ssh`) — null treff = feil repo. Si ifra umiddelbart, ikke oppfinn kode.
- **Hint for ekte fix (når riktig repo er åpnet):** `len(result)` på en `CommandResult` — enten endre kallsted til `len(result.stdout)` / `len(result.output)`, eller legg til `__len__` på klassen. Se SSH-modulens definisjon av `CommandResult` for riktig attributtnavn.
