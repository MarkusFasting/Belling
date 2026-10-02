# Lessons Learned

> Self-improvement loop for Claude Code.
> Logg feil umiddelbart. Les ved sesjonstart.

-----

### 2026-10-02 · Fant ikke CLAUDE.md ved sesjonstart
- **Feil:** Rapporterte at CLAUDE.md ikke fantes i repoet, selv om den var der
- **Rotårsak:** Filen ble lagt til på branchen men var ikke til stede ved første søk (sannsynligvis ble den hentet/synkronisert etter initial kloning). Stolte blindt på glob-resultater uten å sjekke git log eller remote
- **Regel:** Ved sesjonstart — stol på at CLAUDE.md lastes av systemet. Ikke rapporter fravær av filer uten å sjekke `git log`, remote branch, og systemkontekst først
