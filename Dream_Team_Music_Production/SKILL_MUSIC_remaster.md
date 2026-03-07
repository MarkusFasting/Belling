# SKILL: REMASTERING

## Remastering steg-for-steg — Analyse, EQ-korrigering, dynamics, stereo, loudness, format

---

**Metadata:**
- **Skill-ID:** SKILL_MUSIC_remaster
- **Profiler involvert:** Quincy Jones, Daft Punk, Rick Rubin, Kraftwerk
- **Kompleksitet:** Medium–Høy
- **Estimert tid:** 1–4 timer per track

---

## FORMÅL

Komplett remastering-prosess for å oppdatere eksisterende mastere til moderne standarder eller nye formater. Bygger på Jones' multi-system testing, Daft Punks analog/digital filosofi, Rubins "less is more"-tilnærming og Kraftwerks presisjon.

---

## INPUT

- Original master (høyest mulig oppløsning — helst 24-bit eller høyere)
- Valgfritt: Originale stems/multispor (IF tilgjengelig, gir langt bedre resultat)
- Informasjon om original mastering (år, format, ingeniør)
- Mål-format: Vinyl, CD, streaming, hi-res digital
- Referanse-tracks i ønsket sonisk standard

---

## PROSESS

### Fase 1: ANALYSE (30–60 min)

**1.1 Lytteanalyse**
- Lytt gjennom hele tracken 2–3 ganger uten å gjøre noe
- Identifiser problemer: Muddiness? Harshness? Mangel på bass/treble? Dynamikk?
- Identifiser styrker: Hva er BRA med original mastering? Hva skal bevares?
- Rubin: "The original has a soul. Your job is to reveal it, not replace it."

**1.2 Teknisk analyse**
- Spektralanalyse: Frekvensfordeling sammenlignet med referanse
- Dynamisk range: Hva er DR-verdien? (DR6 = squashed, DR12+ = dynamisk)
- Peak og RMS-nivåer
- Stereo-bredde: Mid/Side-analyse
- Fase-problemer: Mono-kompatibilitet
- DC offset: Sjekk og korriger IF nødvendig

**1.3 Historisk kontekst**
- 1960–70-tall: Ofte begrenset HF, vinyl-optimalisert EQ-kurve
- 1980-tall: Tidlig digital, mulig harshness, begrenset dynamisk range
- 1990–2000-tall: "Loudness wars" — ofte overkomprimert
- 2010+: Streaming-normalisering endrer loudness-kravene
- Kraftwerk: Remastret hele katalogen med ny teknologi men bevarte den originale visjonen

**1.4 Definer mål**

| MÅL | BESKRIVELSE |
|---|---|
| **Restaurering** | Fiks problemer uten å endre karakter |
| **Modernisering** | Oppdater sonisk til moderne standarder |
| **Format-optimering** | Tilpass til nytt format (vinyl → digital, CD → streaming) |
| **Deluxe/Anniversary** | Forbedret versjon med respekt for original |

### Fase 2: RESTAURERING (30–60 min)

**2.1 Støyfjerning (IF nødvendig)**
- Tape hiss: Gentle de-noise (ikke fjern alt — noe hiss gir karakter)
- Clicks og pops: Spectral repair for enkelt-hendelser
- Rumble: High-pass filter ved 20–30 Hz
- Daft Punk: "Some noise is character. The vinyl crackle is part of the sound."

**2.2 Fase-korrigering**
- Sjekk og korriger fase-problemer mellom L/R
- Mid/Side-alignment IF nødvendig
- Linear phase EQ for korreksjoner uten faseforskyvning

**2.3 DC offset og headroom**
- Fjern DC offset
- Normaliser til -1 dBTP (true peak) for headroom
- Dither ved bit-depth konvertering (TPDF eller noise-shaped)

### Fase 3: EQ-KORRIGERING (30–60 min)

**3.1 Korrigerende EQ**
- A/B med referanse-tracks konstant
- Kutt problematiske frekvenser: Muddiness (200–400 Hz), harshness (2–5 kHz)
- Boost manglende frekvenser: Sub (30–60 Hz), air (10–16 kHz)
- Linear phase EQ for mastering — unngår faseproblemene til minimum phase EQ
- Jones: "Test on multiple systems. What sounds good on monitors may disappear on earbuds."

**3.2 Frekvensbalanse-mål**

| FREKVENS | MÅL |
|---|---|
| Sub (20–60 Hz) | Kjennes, ikke overdominerende |
| Low (60–200 Hz) | Varm, tight, kontrollert |
| Low-mid (200–500 Hz) | Ren, ikke muddy |
| Mid (500 Hz–2 kHz) | Klar, tilstedeværende |
| Upper-mid (2–5 kHz) | Presence uten harshness |
| High (5–10 kHz) | Brilliance, detalj |
| Air (10–20 kHz) | Åpenhet, luft (IF originalen mangler det) |

**3.3 Rubin-prinsippet: Minimal inngrep**
- Maks ±2 dB EQ-justeringer for remastering
- IF du trenger mer enn ±3 dB → gå tilbake til stems IF mulig
- Hvert EQ-kutt/boost skal ha en klar begrunnelse

### Fase 4: DYNAMIKK (30–60 min)

**4.1 Dynamisk range-vurdering**

| ORIGINAL DR | TILTAK |
|---|---|
| DR4–6 (loudness war) | Forsiktig ekspansjon IF mulig, eller akseptér |
| DR8–10 (standard CD) | Gentle kompresjon for streaming, eller behold |
| DR12+ (dynamisk) | Behold dynamikken, minimal kompresjon |

**4.2 Kompresjon**
- Mastering-kompresjon: 1.5:1–2:1 ratio, slow attack (30+ ms), auto release
- Mål: "Glue", ikke squash. Binde elementene sammen.
- IF originalen er overkomprimert → IKKE komprimer mer
- Multiband-kompresjon: Kun IF spesifikke frekvensbånd er ubalanserte

**4.3 Limiting**
- True peak limiter for endelig ceiling
- Ceiling: -1.0 dBTP (streaming) eller -0.3 dBTP (CD)
- Gain reduction: Maks 2–3 dB for transparent limiting
- IF mer enn 3 dB GR trengs → gå tilbake og juster EQ/kompresjon

**4.4 Loudness-mål etter format**

| FORMAT | LUFS-MÅL | NOTES |
|---|---|---|
| Streaming (Spotify) | -14 LUFS | Normalisert, ingen fordel av å gå høyere |
| Apple Music | -16 LUFS | Sound Check normalisering |
| YouTube | -14 LUFS | Normalisert |
| CD | -9 til -12 LUFS | Sjanger-avhengig |
| Vinyl | -12 til -16 LUFS | Dynamisk range viktig |
| Club/DJ | -6 til -9 LUFS | Høyere for impact |

### Fase 5: STEREO & FORMAT (15–30 min)

**5.1 Stereo-bredde**
- Mid/Side-prosessering for bredde-justering
- Boost sider (S) for mer bredde
- Boost midt (M) for mer fokus og mono-kompatibilitet
- Sjekk i mono: Ingenting kritisk skal forsvinne

**5.2 Format-spesifikk optimering**
- **Vinyl:** RIAA EQ-kurve-vurdering. Begrenset HF og LF. Mono bass under 300 Hz.
- **CD:** 16-bit/44.1 kHz. Dither ved konvertering fra høyere oppløsning.
- **Streaming:** 24-bit / 44.1–48 kHz for hi-res. -14 LUFS mål.
- **Hi-Res:** 24-bit / 96 kHz. Bevar all dynamikk og frekvensinformasjon.
- Daft Punk: Random Access Memories ble mastret for vinyl med DR13 — prioriter dynamikk.

**5.3 Multi-system testing (Jones)**
- Studiomonitorer
- Hodetelefoner
- Bilstereo
- Laptop/telefon
- Bluetooth-høyttaler
- "If it sounds good everywhere, you've done your job."

---

## OUTPUT

- Remastret audio (WAV, 24-bit, 44.1/48 kHz minimum)
- Format-spesifikke versjoner IF nødvendig (vinyl, CD, streaming)
- Metadata: Loudness-verdier (integrated LUFS, true peak, DR)
- Sammenligning-notat: Hva ble endret og hvorfor

---

## KVALITETSKRITERIER

| TEST | BESTÅTT? |
|---|---|
| Respekterer remasteringen originalens karakter? | ☐ |
| Er frekvensbalansen forbedret vs. original? | ☐ |
| Er loudness innenfor mål-format-spesifikasjoner? | ☐ |
| Fungerer remasteringen på 3+ avspillingssystemer? | ☐ |
| Er dynamisk range bevart eller forbedret? | ☐ |
| Er det ingen artefakter (clipping, distortion, pumping)? | ☐ |
| A/B med referanse: Matcher den sonisk kvalitet? | ☐ |
