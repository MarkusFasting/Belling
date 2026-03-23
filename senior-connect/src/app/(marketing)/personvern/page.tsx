import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personvernerklaering - Senior Connect',
  description: 'Personvernerklaering for Senior Connect. Les om hvordan vi behandler dine personopplysninger.',
}

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Personvernerklaering
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Sist oppdatert: 23. mars 2026
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
          {/* Intro */}
          <section>
            <p>
              Denne personvernerklaringen beskriver hvordan Senior Connect
              (&quot;vi&quot;, &quot;oss&quot;, &quot;var&quot;) samler inn,
              bruker og beskytter personopplysninger nar du bruker var plattform
              og tjenester. Vi er behandlingsansvarlig for personopplysningene
              som beskrives her.
            </p>
          </section>

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Formal med behandlingen
            </h2>
            <p>Vi behandler personopplysninger for folgende formal:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Brukeradministrasjon:</strong> Opprette og administrere
                brukerkontoer for seniorer og arbeidsgivere.
              </li>
              <li>
                <strong>Formidling:</strong> Gjore seniorprofiler sokbare for
                arbeidsgivere og formidle kontakt mellom partene.
              </li>
              <li>
                <strong>Betaling:</strong> Haandtere abonnementer og betalinger
                for arbeidsgivere.
              </li>
              <li>
                <strong>Kommunikasjon:</strong> Sende varsler om henvendelser,
                oppdateringer og viktig informasjon om tjenesten.
              </li>
              <li>
                <strong>Forbedring:</strong> Analysere bruk av plattformen for
                a forbedre tjenesten (anonymiserte data).
              </li>
            </ul>
          </section>

          {/* Legal basis */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Rettslig grunnlag
            </h2>
            <p>
              Vi behandler personopplysninger basert pa folgende rettslige
              grunnlag i henhold til personvernforordningen (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Avtale (art. 6(1)(b)):</strong> Behandlingen er
                nodvendig for a oppfylle avtalen med deg som bruker av
                tjenesten.
              </li>
              <li>
                <strong>Samtykke (art. 6(1)(a)):</strong> For utsending av
                markedsforing og valgfrie varsler.
              </li>
              <li>
                <strong>Berettiget interesse (art. 6(1)(f)):</strong> For
                a forebygge misbruk, forbedre tjenesten og sikre plattformen.
              </li>
            </ul>
          </section>

          {/* Data collected */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Hvilke opplysninger vi samler inn
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              For seniorer:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Navn, e-postadresse og telefonnummer</li>
              <li>Postnummer og kommune</li>
              <li>Fodselsdato</li>
              <li>Kompetanser og sektorer</li>
              <li>Biografi og arbeidserfaring</li>
              <li>Onsket arbeidstid og tilgjengelighet</li>
              <li>CV (valgfritt)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              For arbeidsgivere:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Firmanavn og organisasjonsnummer</li>
              <li>Kontaktperson, e-post og telefon</li>
              <li>Postnummer</li>
              <li>Sektor</li>
              <li>Betalingsinformasjon (behandles av Stripe)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Tekniske opplysninger:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP-adresse og nettleserinformasjon</li>
              <li>Innloggingstidspunkt</li>
              <li>Bruksdata (sidevisninger, klikk - anonymisert)</li>
            </ul>
          </section>

          {/* Data subject rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Dine rettigheter
            </h2>
            <p>
              Som registrert har du folgende rettigheter i henhold til GDPR:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Innsyn (art. 15):</strong> Du har rett til a fa
                informasjon om hvilke personopplysninger vi har om deg.
              </li>
              <li>
                <strong>Retting (art. 16):</strong> Du kan kreve at uriktige
                opplysninger om deg blir rettet.
              </li>
              <li>
                <strong>Sletting (art. 17):</strong> Du kan be om at
                opplysningene dine slettes. Du kan nar som helst slette kontoen
                din.
              </li>
              <li>
                <strong>Dataportabilitet (art. 20):</strong> Du har rett til a
                fa utlevert dine opplysninger i et maskinlesbart format.
              </li>
              <li>
                <strong>Begrensning (art. 18):</strong> Du kan be om at
                behandlingen begrenses i visse tilfeller.
              </li>
              <li>
                <strong>Innsigelse (art. 21):</strong> Du kan protestere mot
                behandling basert pa berettiget interesse.
              </li>
            </ul>
            <p className="mt-4">
              For a utove dine rettigheter, kontakt oss pa{' '}
              <a
                href="mailto:personvern@seniorconnect.no"
                className="text-blue-700 underline"
              >
                personvern@seniorconnect.no
              </a>
              . Vi vil svare innen 30 dager.
            </p>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Oppbevaring av data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Aktive kontoer:</strong> Personopplysninger oppbevares
                sa lenge kontoen er aktiv.
              </li>
              <li>
                <strong>Slettede kontoer:</strong> Ved sletting fjernes
                personopplysninger innen 30 dager. Anonymiserte data kan
                beholdes for statistiske formal.
              </li>
              <li>
                <strong>Regnskapsinformasjon:</strong> Betalings- og
                fakturaopplysninger oppbevares i 5 ar i henhold til
                bokforingsloven.
              </li>
              <li>
                <strong>Henvendelser:</strong> Meldinger mellom arbeidsgivere
                og seniorer slettes 12 maneder etter at henvendelsen er
                avsluttet.
              </li>
            </ul>
          </section>

          {/* Third parties */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Tredjeparter og databehandlere
            </h2>
            <p>Vi bruker folgende tredjeparter til a levere tjenesten:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Supabase (Supabase Inc.):</strong> Database og
                autentisering. Data lagres i EU. Behandler profil- og
                brukerdata.
              </li>
              <li>
                <strong>Stripe (Stripe Inc.):</strong> Betalingsbehandling.
                Stripe er PCI DSS-sertifisert. Vi lagrer ikke kortinformasjon
                selv.
              </li>
              <li>
                <strong>Resend (Resend Inc.):</strong> Utsending av e-post
                (varsler og henvendelser). Behandler e-postadresser og
                meldingsinnhold.
              </li>
            </ul>
            <p className="mt-4">
              Vi har databehandleravtaler med alle tredjeparter. Ingen
              personopplysninger selges til tredjeparter.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Sikkerhet
            </h2>
            <p>
              Vi tar sikkerheten til dine personopplysninger pa alvor og har
              implementert folgende tiltak:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Kryptert datakommunikasjon (TLS/HTTPS)</li>
              <li>Kryptert lagring av passord</li>
              <li>Tilgangskontroll med rolle-basert autorisasjon</li>
              <li>Row Level Security (RLS) i databasen</li>
              <li>Regelmessig sikkerhetsgjennomgang</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Informasjonskapsler (cookies)
            </h2>
            <p>
              Vi bruker nodvendige informasjonskapsler for autentisering og
              sesjonshåndtering. Disse er paakrevde for at tjenesten skal
              fungere. Vi bruker ikke tredjeparts sporingskapsler.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Kontaktinformasjon
            </h2>
            <p>
              Behandlingsansvarlig for personopplysningene er Senior Connect.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 p-6">
              <p className="text-base">
                <strong>E-post:</strong>{' '}
                <a
                  href="mailto:personvern@seniorconnect.no"
                  className="text-blue-700 underline"
                >
                  personvern@seniorconnect.no
                </a>
              </p>
              <p className="text-base mt-2">
                <strong>Adresse:</strong> [Kommer]
              </p>
            </div>
            <p className="mt-4">
              Du har rett til a klage til Datatilsynet dersom du mener vi
              behandler personopplysningene dine i strid med
              personvernregelverket. Du finner mer informasjon pa{' '}
              <a
                href="https://www.datatilsynet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                datatilsynet.no
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
