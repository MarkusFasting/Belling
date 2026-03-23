import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om oss - Senior Connect',
  description:
    'Senior Connect er en norsk formidlingstjeneste som kobler erfarne pensjonister med arbeidsgivere.',
}

export default function OmOssPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Om Senior Connect
        </h1>

        <div className="mt-10 space-y-10 text-lg text-gray-700 leading-8">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Var misjon
            </h2>
            <p>
              Senior Connect har som mal a gjore det enkelt for erfarne
              pensjonister a finne meningsfullt arbeid, og for arbeidsgivere a
              fa tilgang til verdifull kompetanse. Vi tror pa at erfaring er en
              ressurs som ikke bor ga til spille.
            </p>
            <p className="mt-4">
              I Norge gar tusenvis av kompetente pensjonister som gjerne vil
              bidra - men som ikke vet hvor de skal lete. Samtidig sliter mange
              arbeidsgivere med a finne erfaren arbeidskraft til deltids- og
              prosjektoppgaver. Senior Connect lukker dette gapet.
            </p>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Slik fungerer plattformen
            </h2>
            <p>
              Senior Connect er en <strong>formidlingstjeneste</strong>, ikke et
              bemanningsbyrå. Vi er ikke part i arbeidsforholdet mellom senior
              og arbeidsgiver. Det vi gjor er a:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Gi seniorer en plattform for a gjore sin kompetanse synlig for
                arbeidsgivere
              </li>
              <li>
                Gi arbeidsgivere mulighet til a soke etter og kontakte
                kvalifiserte seniorer
              </li>
              <li>
                Sikre at kontaktinformasjon deles forst nar senioren aktivt
                samtykker
              </li>
              <li>
                Tilrettelegge for en trygg og enkel prosess for begge parter
              </li>
            </ul>
            <p className="mt-4">
              All ansettelse, kontrakt og lonnsforhold avtales direkte mellom
              senior og arbeidsgiver. Senior Connect har ingen rolle i
              arbeidsforholdet etter at kontakt er formidlet.
            </p>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vare verdier
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Tillit</h3>
                <p className="mt-2 text-base text-gray-600">
                  Vi bygger en plattform basert pa tillit mellom seniorer og
                  arbeidsgivere.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Personvern</h3>
                <p className="mt-2 text-base text-gray-600">
                  Seniorenes personvern er en prioritet. Kontaktinfo deles kun
                  med samtykke.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Tilgjengelighet</h3>
                <p className="mt-2 text-base text-gray-600">
                  Plattformen er designet for a vaere enkel a bruke for alle
                  aldersgrupper.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <h3 className="font-semibold text-gray-900">Norsk fokus</h3>
                <p className="mt-2 text-base text-gray-600">
                  Vi er bygget for det norske arbeidsmarkedet med norske regler
                  og behov i fokus.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kontakt oss
            </h2>
            <p>
              Har du sporsmal eller tilbakemeldinger? Vi horer gjerne fra deg.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 p-6">
              <p className="text-base">
                <strong>E-post:</strong>{' '}
                <a
                  href="mailto:kontakt@seniorconnect.no"
                  className="text-blue-700 underline"
                >
                  kontakt@seniorconnect.no
                </a>
              </p>
              <p className="text-base mt-2">
                <strong>Organisasjonsnummer:</strong> [Kommer]
              </p>
              <p className="text-base mt-2">
                <strong>Adresse:</strong> [Kommer]
              </p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Bli med pa Senior Connect
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registrer?rolle=senior">
              <Button size="lg" className="text-base px-8">
                Registrer deg som senior
              </Button>
            </Link>
            <Link href="/registrer?rolle=arbeidsgiver">
              <Button size="lg" variant="outline" className="text-base px-8">
                Registrer som arbeidsgiver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
