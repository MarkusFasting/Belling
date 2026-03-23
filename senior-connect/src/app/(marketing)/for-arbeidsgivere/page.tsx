import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For arbeidsgivere - Senior Connect',
  description:
    'Finn erfarne seniorer til deltids- og prosjektarbeid. Senior Connect gir deg tilgang til kompetent arbeidskraft pa pensjonistlonn.',
}

export default function ForArbeidsgiverePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Fa tilgang til erfaren arbeidskraft
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Senior Connect gir deg enkel tilgang til pensjonister med mange ars
              erfaring. Ansett pa pensjonistlonn og spar pa arbeidsgiveravgift.
            </p>
            <div className="mt-8">
              <Link href="/registrer?rolle=arbeidsgiver">
                <Button size="lg" className="text-base px-8 py-6">
                  Kom i gang
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
            Hvorfor ansette seniorer?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Erfaring og stabilitet
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Seniorer bringer med seg ars erfaring, faglig tyngde og
                arbeidslivskompetanse som er vanskelig a erstatte.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Lavere kostnader
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Med pensjonistlonn slipper du pensjonsforpliktelser. Reduserte
                lonnskostnader uten a ga pa kompromiss med kvalitet.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Fleksibilitet
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Mange seniorer onsker deltid eller prosjektbasert arbeid. Perfekt
                for a dekke midlertidige behov eller sesongtopper.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Mentoring og kunnskapsoverforing
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Seniorer kan veilede yngre medarbeidere og bidra til
                kunnskapsoverforing i organisasjonen.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Rask tilgang
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Sok blant godkjente profiler og ta kontakt direkte. Ingen
                langvarig rekrutteringsprosess.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Mangfold pa arbeidsplassen
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Alderssmangfold styrker arbeidsmiljoet og gir ulike perspektiver
                som gagner hele organisasjonen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold">Opprett konto</h3>
              <p className="mt-2 text-base text-gray-600">
                Registrer bedriften din gratis pa noen fa minutter.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold">Velg abonnement</h3>
              <p className="mt-2 text-base text-gray-600">
                Aktiver abonnement for a se fullstendige profiler og kontakte
                seniorer.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sok og filtrer</h3>
              <p className="mt-2 text-base text-gray-600">
                Finn seniorer basert pa sektor, kompetanse, omrade og
                tilgjengelighet.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                4
              </div>
              <h3 className="mt-4 text-lg font-semibold">Ta kontakt</h3>
              <p className="mt-2 text-base text-gray-600">
                Send en henvendelse. Senioren velger om de vil dele
                kontaktinfo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Enkel og forutsigbar pris
          </h2>
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border-2 border-indigo-200 p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Manedsabonnement
              </h3>
              <p className="mt-4 text-5xl font-bold text-gray-900">
                2 490 <span className="text-lg font-normal text-gray-500">kr/mnd</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">Ekskl. mva.</p>
              <ul className="mt-8 space-y-3 text-left text-base text-gray-600">
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">&#10003;</span>
                  Tilgang til alle seniorprofiler
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">&#10003;</span>
                  Inntil 20 henvendelser per maned
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">&#10003;</span>
                  Avanserte sok og filtre
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">&#10003;</span>
                  Ingen bindingstid
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/registrer?rolle=arbeidsgiver">
                  <Button size="lg" className="w-full text-base">
                    Kom i gang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Finn den erfaringen du trenger
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Registrer bedriften din i dag og fa tilgang til hundrevis av erfarne
            seniorer.
          </p>
          <div className="mt-8">
            <Link href="/registrer?rolle=arbeidsgiver">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 py-6"
              >
                Registrer bedriften
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
