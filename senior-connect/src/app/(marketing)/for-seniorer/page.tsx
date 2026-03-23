import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For seniorer - Senior Connect',
  description:
    'Finn meningsfullt deltidsarbeid som pensjonist. Senior Connect kobler deg med arbeidsgivere som verdsetter din erfaring.',
}

export default function ForSeniorerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Bruk erfaringen din - pa dine premisser
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Som pensjonist har du verdifull kompetanse. Senior Connect hjelper
              deg med a finne deltidsarbeid som passer din hverdag, pa
              pensjonistlonn.
            </p>
            <div className="mt-8">
              <Link href="/registrer?rolle=senior">
                <Button size="lg" className="text-base px-8 py-6">
                  Opprett gratis profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fordeler med a jobbe som pensjonist
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Hold deg aktiv
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Forskning viser at meningsfullt arbeid etter pensjonering bidrar
                til bedre helse, sosialt nettverk og livskvalitet.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Ekstra inntekt
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Med pensjonistlonn kan du tjene ekstra uten at det pavirker
                alderspensjonen fra folketrygden.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Fleksibilitet
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Du bestemmer selv hvor mye du vil jobbe. Noen timer i uka, noen
                dager i maneden - du velger.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Del din kompetanse
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Din erfaring er ettertraktet. Mange arbeidsgivere soker nettopp
                den kompetansen du har bygget opp gjennom karrieren.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Helt gratis
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Det koster ingenting a opprette profil pa Senior Connect. Du
                betaler aldri noe for tjenesten.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Du har kontrollen
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Kontaktinformasjonen din deles forst nar du aktivt aksepterer en
                henvendelse fra en arbeidsgiver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Slik kommer du i gang
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold">Registrer deg</h3>
              <p className="mt-2 text-base text-gray-600">
                Opprett en gratis konto med e-post og passord.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fyll ut profil</h3>
              <p className="mt-2 text-base text-gray-600">
                Legg inn kompetanse, erfaring, onsket arbeidstid og omrade.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold">Bli funnet</h3>
              <p className="mt-2 text-base text-gray-600">
                Arbeidsgivere soker og finner profilen din basert pa dine
                kvalifikasjoner.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                4
              </div>
              <h3 className="mt-4 text-lg font-semibold">Velg selv</h3>
              <p className="mt-2 text-base text-gray-600">
                Mottar du en henvendelse, velger du selv om du vil dele
                kontaktinfo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ofte stilte sporsmal
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Koster det noe a bruke Senior Connect?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Nei, Senior Connect er helt gratis for seniorer. Det er
                arbeidsgivere som betaler for a kunne kontakte deg.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Blir kontaktinformasjonen min synlig for alle?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Nei. Arbeidsgivere ser kun anonymisert informasjon (sektor,
                kompetanse, omrade) med mindre de har abonnement. Selv da ser de
                kun navn og generell info. Kontaktinfo deles forst nar du
                aksepterer en henvendelse.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Pavirker det pensjonen min a jobbe?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Alderspensjon fra folketrygden (NAV) blir ikke redusert om du
                jobber. Har du tjenestepensjon eller AFP, bor du sjekke reglene
                med din pensjonsleverandor. Les mer pa var{' '}
                <Link href="/pensjonistlonn" className="text-blue-700 underline">
                  side om pensjonistlonn
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Hva slags arbeid kan jeg finne?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Det avhenger av din bakgrunn og hva arbeidsgivere soker. Vi har
                seniorer fra mange bransjer: helse, IT, utdanning, offentlig
                sektor, bygg og anlegg, og mer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Er Senior Connect et bemanningsbyrå?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Nei. Senior Connect er en formidlingstjeneste som kobler
                seniorer og arbeidsgivere. Vi er ikke part i arbeidsforholdet.
                All ansettelse og avtale skjer direkte mellom deg og
                arbeidsgiveren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Klar til a komme i gang?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Opprett en gratis profil i dag og bli synlig for arbeidsgivere som
            verdsetter din erfaring.
          </p>
          <div className="mt-8">
            <Link href="/registrer?rolle=senior">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 py-6"
              >
                Opprett gratis profil
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
