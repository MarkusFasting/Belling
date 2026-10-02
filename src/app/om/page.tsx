import Link from "next/link";

const dataSources = [
  {
    name: "Kartverket Adresse-API",
    description: "Adressesøk, postnummer, koordinater",
    url: "https://ws.geonorge.no/adresser/v1/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "Kartverket Eiendom-API",
    description: "Matrikkeldata, eiendomsidentifikasjon",
    url: "https://ws.geonorge.no/eiendom/v1/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "Geonorge WFS Eiendomskart",
    description: "Eiendomsgrenser og teigdata",
    url: "https://wfs.geonorge.no/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "Kartverket WMTS",
    description: "Topografiske kartfliser for kartvisning",
    url: "https://cache.kartverket.no/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "Kartverket Kommuneinfo",
    description: "Kommunenavn, fylke, metadata",
    url: "https://ws.geonorge.no/kommuneinfo/v1/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "Kartverket Høydedata",
    description: "Terrenghøyde for gitt punkt",
    url: "https://ws.geonorge.no/hoydedata/v1/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "SSB Statistikkbanken",
    description: "Boligprisstatistikk per region",
    url: "https://data.ssb.no/api/v0/",
    status: "Åpent, ingen nøkkel",
  },
  {
    name: "eInnsyn",
    description: "Offentlige byggesaksdokumenter",
    url: "https://einnsyn.no/",
    status: "Åpent, ingen nøkkel",
  },
];

export default function AboutPage() {
  return (
    <div className="section-spacing">
      <div className="container-narrow">
        {/* Intro */}
        <div className="mb-16">
          <h1 className="text-display mb-6">Om Eiendomsgrunn</h1>
          <p className="text-body-lg text-ink-500 mb-6">
            Eiendomsgrunn er Norges første eiendomsintelligens-plattform med
            kildesporet tillitsnivå på hvert datapunkt. Vi sjekker eiendommen
            mot offentlige registre og forteller deg hva som stemmer, hva som
            avviker, og hva som mangler.
          </p>
          <p className="text-body text-ink-500">
            Plattformen er bygget av Eivind Fasting (arkitekt MNAL) og Markus
            Fasting (tech/AI), med mål om å gjøre eiendomsinformasjon mer
            tilgjengelig, transparent og pålitelig for alle.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <h2 className="text-display-sm mb-8">Våre prinsipper</h2>
          <div className="space-y-6">
            <div className="card-base p-6 border-l-4 border-l-confidence-dokumentert">
              <h3 className="text-heading-sm mb-2">Kildesporbarhet</h3>
              <p className="text-body text-ink-500">
                Hvert datapunkt har en kilde, et hentetidspunkt og et
                tillitsnivå. Du skal alltid kunne spore tilbake til
                opprinnelsen.
              </p>
            </div>
            <div className="card-base p-6 border-l-4 border-l-confidence-opplyst">
              <h3 className="text-heading-sm mb-2">Nøkternt språk</h3>
              <p className="text-body text-ink-500">
                Vi sier aldri &laquo;dette er ulovlig&raquo;. Vi sier
                &laquo;ingen synlig godkjenning funnet i offentlige
                registre&raquo;. Faglig respektfullt, uten bastante
                konklusjoner.
              </p>
            </div>
            <div className="card-base p-6 border-l-4 border-l-confidence-utledet">
              <h3 className="text-heading-sm mb-2">Åpenhet om begrensninger</h3>
              <p className="text-body text-ink-500">
                Vi er tydelige på hva vi ikke vet, og peker deg til rett instans
                for videre avklaring. Ærlighet er en del av produktet.
              </p>
            </div>
            <div className="card-base p-6 border-l-4 border-l-mineral">
              <h3 className="text-heading-sm mb-2">Offentlige data først</h3>
              <p className="text-body text-ink-500">
                Vi henter direkte fra Kartverket, Geonorge og andre offentlige
                API-er. Ingen mellommenn, ingen utdaterte kopier.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mb-16">
          <h2 className="text-display-sm mb-8">Datakilder</h2>
          <p className="text-body text-ink-500 mb-6">
            All eiendomsdata hentes fra åpne, offentlige API-er. Her er
            kildene vi bruker:
          </p>
          <div className="space-y-3">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="card-base p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-body font-medium">{source.name}</h3>
                  <p className="text-body-sm text-ink-500">
                    {source.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-micro text-confidence-dokumentert bg-confidence-dokumentert/10 px-2 py-1 rounded-badge">
                    {source.status}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption text-mineral hover:text-mineral-dark transition-colors"
                  >
                    API →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-display-sm mb-8">Teamet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card-base p-6">
              <h3 className="text-heading-sm mb-1">Eivind Fasting</h3>
              <p className="text-caption text-mineral mb-3">
                Arkitekt MNAL — Domeneekspert
              </p>
              <p className="text-body-sm text-ink-500">
                Erfaren arkitekt med dyp forståelse for plan- og
                bygningslovgivning, eiendomsdata og reguleringsplaner.
              </p>
            </div>
            <div className="card-base p-6">
              <h3 className="text-heading-sm mb-1">Markus Fasting</h3>
              <p className="text-caption text-mineral mb-3">Tech / AI</p>
              <p className="text-body-sm text-ink-500">
                Teknologiutvikling og AI-integrasjon. Ansvarlig for plattformens
                arkitektur og API-integrasjoner.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 bg-mineral-wash rounded-card">
          <h2 className="text-heading mb-4">Prøv det selv</h2>
          <p className="text-body text-ink-500 mb-6">
            Søk etter en eiendom og se hva offentlige registre sier.
          </p>
          <Link href="/sok" className="btn-primary">
            Start søk
          </Link>
        </div>
      </div>
    </div>
  );
}
