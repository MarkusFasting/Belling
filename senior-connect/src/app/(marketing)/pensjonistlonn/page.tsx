import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pensjonistlonn 2026 - Regler og satser | Senior Connect',
  description:
    'Alt du trenger a vite om pensjonistlonn i 2026. Regler for arbeid som pensjonist, skatteregler, inntektsgrenser og fordeler.',
}

export default function PensjonistlonnPage() {
  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pensjonistlonn i 2026 - Det du trenger a vite
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            En komplett guide til reglene for arbeid og inntekt som pensjonist i
            Norge.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Hva er pensjonistlonn?
          </h2>
          <p>
            Pensjonistlonn er en saerskilt lonnsordning for alderspensjonister
            som onsker a jobbe ved siden av pensjonen. Satsen fastsettes arlig
            og er vesentlig lavere enn ordinaer lonn for stillingen. Ordningen
            er mest utbredt i offentlig sektor.
          </p>
          <p>
            For 2026 er pensjonistlonnen fastsatt til <strong>242 kroner per time</strong> i
            staten. Kommunene kan ha egne satser.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Hvem kan motta pensjonistlonn?
          </h2>
          <p>
            Pensjonistlonn er tilgjengelig for personer som:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mottar alderspensjon fra folketrygden (NAV)</li>
            <li>Er 67 ar eller eldre (i noen tilfeller fra 62 ar med AFP)</li>
            <li>Ikke har hovedstilling hos arbeidsgiveren</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Pavirker arbeidsinntekt pensjonen?
          </h2>
          <p>
            <strong>Alderspensjon fra folketrygden (NAV):</strong> Blir ikke
            redusert uansett hvor mye du tjener. Du kan jobbe sa mye du vil
            uten at det pavirker utbetalingen fra NAV.
          </p>
          <p>
            <strong>Offentlig tjenestepensjon:</strong> Kan bli redusert hvis du
            jobber hos en arbeidsgiver med offentlig tjenestepensjon. Pensjonistlonn
            er unntatt fra denne regelen - dersom du jobber pa pensjonistlonn,
            pavirkes ikke tjenestepensjonen din.
          </p>
          <p>
            <strong>AFP (Avtalefestet pensjon):</strong> Privat AFP pavirkes
            ikke av arbeidsinntekt. Offentlig AFP kan ha egne regler - sjekk
            med din pensjonsleverandor.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Skatteregler for pensjonister som jobber
          </h2>
          <p>
            Inntekt fra arbeid beskattes pa vanlig mate, men pensjonister har
            noen fordeler:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Skattefradrag for pensjonsinntekt:</strong> Pensjonister
              far et eget skattefradrag som kan redusere skatten betydelig.
            </li>
            <li>
              <strong>Minstefradrag:</strong> Du far minstefradrag bade pa
              pensjonsinntekt og arbeidsinntekt.
            </li>
            <li>
              <strong>Trygdeavgift:</strong> Lavere sats pa pensjonsinntekt
              (5,1 %) enn pa lonn (7,9 %).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Fordeler for arbeidsgivere
          </h2>
          <p>
            Arbeidsgivere som ansetter pensjonister pa pensjonistlonn far
            fordeler:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Ingen pensjonsforpliktelser:</strong> Pensjonistlonn gir
              fritak fra opptjening i pensjonsordningen.
            </li>
            <li>
              <strong>Fleksibel arbeidskraft:</strong> Pensjonister kan dekke
              korttidsbehov, sesongarbeid eller prosjekter.
            </li>
            <li>
              <strong>Erfaren arbeidskraft:</strong> Fa tilgang til kompetanse
              og erfaring som ellers ville gaatt tapt.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Privat sektor vs. offentlig sektor
          </h2>
          <p>
            I privat sektor finnes det ingen fast pensjonistlonnsats.
            Arbeidsgivere og pensjonister avtaler lonnen fritt. Mange velger a
            bruke den offentlige satsen som veiledende.
          </p>
          <p>
            I offentlig sektor er pensjonistlonnen regulert gjennom tariffavtaler.
            Satsen settes arlig av Kommunal- og distriktsdepartementet.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Tips for pensjonister som vil jobbe
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sjekk med din pensjonsleverandor for du begynner a jobbe.</li>
            <li>Avklar om du skal jobbe pa pensjonistlonn eller ordinaer lonn.</li>
            <li>Hold oversikt over arbeidstimer og inntekt.</li>
            <li>Vurder skattekortet ditt - be om nytt skattekort med riktige opplysninger.</li>
            <li>Husk at du fortsatt opparbeider pensjonsrettigheter pa ordinaer lonn.</li>
          </ul>

          <div className="bg-blue-50 rounded-lg p-6 mt-10">
            <p className="text-sm text-gray-500 mb-2">
              Denne artikkelen er kun ment som generell informasjon og er ikke
              juridisk eller ekonomisk radgivning. Regler kan endres. Sjekk
              alltid oppdatert informasjon hos NAV, Skatteetaten eller din
              pensjonsleverandor.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Klar til a jobbe som pensjonist?
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Senior Connect gjor det enkelt a finne passende arbeid pa dine
            premisser.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registrer?rolle=senior">
              <Button size="lg" className="text-base px-8">
                Registrer deg som senior
              </Button>
            </Link>
            <Link href="/for-seniorer">
              <Button size="lg" variant="outline" className="text-base px-8">
                Les mer om tjenesten
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
