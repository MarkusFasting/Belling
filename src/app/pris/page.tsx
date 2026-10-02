import Link from "next/link";

const plans = [
  {
    name: "Gratis",
    price: "0 kr",
    period: "",
    description: "Utforsk plattformen og se hva som er mulig",
    features: [
      "Adressesøk med autokomplettering",
      "Grunnleggende eiendomsinfo (gnr/bnr, adresse)",
      "Kartvisning med Kartverket-fliser",
      "Inntil 3 oppslag per dag",
    ],
    cta: "Kom i gang gratis",
    href: "/sok",
    highlighted: false,
  },
  {
    name: "Enkeltrapport",
    price: "79 kr",
    period: "per rapport",
    description: "Full rapport for én eiendom med alle tilgjengelige data",
    features: [
      "Alt i Gratis",
      "Komplett eiendomsrapport",
      "Eiendomsgrenser på kart",
      "Plandata og reguleringsinfo",
      "Feltvalidering med tillitsnivåer",
      "Kilderegister med alle datakilder",
      "PDF-eksport av rapport",
    ],
    cta: "Kjøp enkeltrapport",
    href: "/sok",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "399 kr",
    period: "per måned",
    description:
      "For profesjonelle som trenger regelmessig tilgang til eiendomsdata",
    features: [
      "Alt i Enkeltrapport",
      "Ubegrenset antall rapporter",
      "Dokumentopplasting og analyse",
      "Avviksdeteksjon mot offentlige data",
      "AI-assistert eiendomsrådgivning",
      "Prioritert support",
    ],
    cta: "Start Pro",
    href: "/sok",
    highlighted: true,
  },
  {
    name: "Team",
    price: "999 kr",
    period: "per måned",
    description:
      "For meglerkontor, arkitektfirmaer og rådgivningsselskaper",
    features: [
      "Alt i Pro",
      "Inntil 5 brukere",
      "Delt rapportbibliotek",
      "API-tilgang for integrasjon",
      "Tilpasset onboarding",
      "Dedikert kontaktperson",
    ],
    cta: "Kontakt oss",
    href: "mailto:info@eiendomsgrunn.no",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="section-spacing">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display mb-4">Enkel, ærlig prising</h1>
          <p className="text-body-lg text-ink-500 max-w-2xl mx-auto">
            Start gratis og oppgrader når du trenger mer. Ingen skjulte
            kostnader, ingen bindingstid.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-card p-6 flex flex-col ${
                plan.highlighted
                  ? "bg-ink-900 text-white ring-2 ring-mineral shadow-elevated"
                  : "card-base"
              }`}
            >
              <div className="mb-6">
                <h2
                  className={`text-heading-sm mb-2 ${
                    plan.highlighted ? "text-white" : ""
                  }`}
                >
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`text-display-sm ${
                      plan.highlighted ? "text-white" : ""
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-body-sm ${
                        plan.highlighted ? "text-ink-300" : "text-ink-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-body-sm ${
                    plan.highlighted ? "text-ink-300" : "text-ink-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-mineral-light" : "text-confidence-dokumentert"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-body-sm ${
                        plan.highlighted ? "text-ink-200" : "text-ink-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-2.5 rounded-button text-body font-medium transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-mineral text-white hover:bg-mineral-light"
                    : "bg-stone-light text-ink hover:bg-stone-mid"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-display-sm text-center mb-10">
            Vanlige spørsmål
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-heading-sm mb-2">
                Hvilke data er gratis tilgjengelig?
              </h3>
              <p className="text-body text-ink-500">
                Adressesøk, grunnleggende eiendomsinformasjon (gnr/bnr) og
                kartvisning er gratis. Detaljert rapport med plandata,
                feltvalidering og kilderegister krever betalt plan.
              </p>
            </div>
            <div>
              <h3 className="text-heading-sm mb-2">
                Hvor kommer dataene fra?
              </h3>
              <p className="text-body text-ink-500">
                All data hentes direkte fra åpne offentlige API-er: Kartverket,
                Geonorge, SSB og eInnsyn. Vi viser alltid kilden for hvert
                datapunkt.
              </p>
            </div>
            <div>
              <h3 className="text-heading-sm mb-2">
                Kan jeg avbryte abonnementet?
              </h3>
              <p className="text-body text-ink-500">
                Ja, du kan avbryte når som helst. Ingen bindingstid. Du beholder
                tilgang ut inneværende periode.
              </p>
            </div>
            <div>
              <h3 className="text-heading-sm mb-2">
                Er dokumentanalysen klar?
              </h3>
              <p className="text-body text-ink-500">
                AI-basert dokumentanalyse er under utvikling. Du kan allerede
                laste opp dokumenter, men fullstendig analyse kommer i en
                fremtidig oppdatering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
