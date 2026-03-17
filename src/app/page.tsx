"use client";

import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import SearchInput from "@/components/ui/SearchInput";
import type { SearchResult } from "@/types";

const trustLevels = [
  {
    level: "Dokumentert",
    color: "bg-confidence-dokumentert",
    textColor: "text-confidence-dokumentert",
    description: "Bekreftet av offentlig register",
  },
  {
    level: "Opplyst",
    color: "bg-confidence-opplyst",
    textColor: "text-confidence-opplyst",
    description: "Oppgitt i opplastet dokument",
  },
  {
    level: "Utledet",
    color: "bg-confidence-utledet",
    textColor: "text-confidence-utledet",
    description: "Beregnet eller tolket fra data",
  },
  {
    level: "Uavklart",
    color: "bg-confidence-uavklart",
    textColor: "text-confidence-uavklart",
    description: "Mangler eller ikke verifisert",
  },
];

const benefits = [
  {
    title: "Kildesporet data",
    description:
      "Hvert datapunkt har kilde, hentetidspunkt og tillitsnivå. Du ser alltid hvor informasjonen kommer fra.",
  },
  {
    title: "Ekte offentlige registre",
    description:
      "Vi henter direkte fra Kartverket, Geonorge og andre offentlige API-er — ingen mellommenn.",
  },
  {
    title: "Avviksdeteksjon",
    description:
      "Last opp salgsoppgave eller takstrapport, og vi sammenligner mot offentlige data automatisk.",
  },
  {
    title: "Interaktivt kart",
    description:
      "Se eiendommen på Kartverkets topografiske kart med offisielle eiendomsgrenser.",
  },
  {
    title: "Nøktern vurdering",
    description:
      "Vi sier aldri «dette er ulovlig». Vi sier «ingen synlig godkjenning funnet i offentlige registre».",
  },
  {
    title: "Åpen om begrensninger",
    description:
      "Vi er tydelige på hva vi ikke kan svare på — og peker deg til rett instans for videre avklaring.",
  },
];

const audiences = [
  {
    title: "Boligkjøpere",
    description:
      "Sjekk eiendommen før visning. Se om det som står i salgsoppgaven stemmer med offentlige registre.",
  },
  {
    title: "Eiendomsmeglere",
    description:
      "Kvalitetssikre opplysninger i salgsoppgaver mot offisielle kilder. Spar tid på due diligence.",
  },
  {
    title: "Arkitekter og rådgivere",
    description:
      "Rask tilgang til reguleringsdata, eiendomsgrenser og matrikkelinformasjon samlet på ett sted.",
  },
];

const limitations = [
  "Vi har ikke tilgang til grunnboken (heftelser, eierforhold). Bruk Kartverkets Infoland-tjeneste.",
  "Detaljerte planbestemmelser (BYA, gesimshøyde etc.) krever ofte manuell sjekk hos kommunen.",
  "Byggesakshistorikk er ikke tilgjengelig via åpne API-er — kontakt kommunen direkte.",
  "Dokumentanalyse med AI er under utvikling og gir foreløpig ikke fullstendige resultater.",
];

export default function LandingPage() {
  const router = useRouter();
  const { query, setQuery, results, loading } = useSearch();

  function handleSelect(result: SearchResult) {
    router.push(`/eiendom/${result.slug}`);
  }

  return (
    <>
      {/* Hero */}
      <section className="section-spacing bg-gradient-to-b from-mineral-wash to-stone-warm">
        <div className="container-narrow text-center">
          <h1 className="text-display-lg text-balance mb-6">
            Sjekk eiendommen mot
            <br />
            <span className="text-mineral">offentlige registre</span>
          </h1>
          <p className="text-body-lg text-ink-500 max-w-xl mx-auto mb-10 text-balance">
            Vi henter data fra Kartverket og andre offentlige kilder, og
            forteller deg hva som stemmer, hva som avviker, og hva som mangler.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchInput
              value={query}
              onChange={setQuery}
              results={results}
              loading={loading}
              onSelect={handleSelect}
              placeholder="Søk etter adresse, f.eks. Karl Johans gate 1..."
              size="large"
            />
          </div>
          <p className="text-caption text-ink-400 mt-4">
            Søker direkte i Kartverkets adresseregister
          </p>
        </div>
      </section>

      {/* Document Upload */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="text-display-sm mb-4">Har du en salgsoppgave?</h2>
          <p className="text-body-lg text-ink-500 mb-8">
            Last opp salgsoppgave eller takstrapport, så sammenligner vi
            opplysningene mot offentlige registre.
          </p>
          <div className="max-w-lg mx-auto border-2 border-dashed border-stone-border rounded-card p-10 hover:border-mineral transition-colors cursor-pointer">
            <div className="text-ink-400 mb-3">
              <svg
                className="w-10 h-10 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-body font-medium text-ink-600">
              Dra og slipp fil her
            </p>
            <p className="text-body-sm text-ink-400 mt-1">
              PDF, JPG eller PNG — maks 20 MB
            </p>
          </div>
          <p className="text-caption text-ink-400 mt-4">
            Dokumentanalyse med AI er under utvikling
          </p>
        </div>
      </section>

      {/* Trust System */}
      <section className="section-spacing bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-display-sm mb-4">
              Hvert datapunkt har et tillitsnivå
            </h2>
            <p className="text-body-lg text-ink-500 max-w-2xl mx-auto">
              Vi er alltid ærlige om hvor dataene kommer fra og hvor sikre vi er
              på at de stemmer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustLevels.map((item) => (
              <div key={item.level} className="text-center">
                <div
                  className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-3`}
                />
                <h3 className={`text-heading-sm ${item.textColor} mb-1`}>
                  {item.level}
                </h3>
                <p className="text-body-sm text-ink-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-display-sm mb-4">
              Eiendomsintelligens du kan stole på
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card-base p-6">
                <h3 className="text-heading-sm mb-2">{benefit.title}</h3>
                <p className="text-body-sm text-ink-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section-spacing bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-display-sm mb-4">Hvem er dette for?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {audiences.map((audience) => (
              <div key={audience.title} className="text-center">
                <h3 className="text-heading-sm mb-2">{audience.title}</h3>
                <p className="text-body-sm text-ink-500">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="section-spacing">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-display-sm mb-4">
              Hva vi <span className="text-ink-400">ikke</span> dekker
            </h2>
            <p className="text-body-lg text-ink-500">
              Ærlighet er en del av produktet. Her er begrensningene.
            </p>
          </div>
          <div className="space-y-4">
            {limitations.map((limitation, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-card border border-stone-border/50"
              >
                <span className="text-ink-400 mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p className="text-body-sm text-ink-600">{limitation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-ink-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-display-sm text-white mb-4">
            Klar til å sjekke en eiendom?
          </h2>
          <p className="text-body-lg text-ink-300 mb-8">
            Søk etter en adresse og få en komplett rapport med kildesporet data
            fra offentlige registre.
          </p>
          <a href="/sok" className="btn-mineral text-body-lg px-8 py-3">
            Start søk
          </a>
        </div>
      </section>
    </>
  );
}
