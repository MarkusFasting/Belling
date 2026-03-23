import Link from 'next/link'
import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { CTASection } from '@/components/marketing/cta-section'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Senior Connect
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/for-seniorer" className="text-gray-600 hover:text-gray-900">
              For seniorer
            </Link>
            <Link href="/for-arbeidsgivere" className="text-gray-600 hover:text-gray-900">
              For arbeidsgivere
            </Link>
            <Link href="/pensjonistlonn" className="text-gray-600 hover:text-gray-900">
              Pensjonistlonn
            </Link>
            <Link href="/om-oss" className="text-gray-600 hover:text-gray-900">
              Om oss
            </Link>
            <Link
              href="/logg-inn"
              className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            >
              Logg inn
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <Hero />

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Slik fungerer det
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold">Opprett profil</h3>
                <p className="mt-2 text-base text-gray-600">
                  Registrer deg som senior eller arbeidsgiver og fyll ut din profil
                  med erfaring og onsker.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold">Finn hverandre</h3>
                <p className="mt-2 text-base text-gray-600">
                  Arbeidsgivere soker blant seniorprofiler. Seniorer blir synlige
                  for relevante arbeidsgivere.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold">Ta kontakt</h3>
                <p className="mt-2 text-base text-gray-600">
                  Arbeidsgivere sender henvendelse, og senioren velger selv om de
                  vil dele kontaktinfo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <Features />

        {/* Social proof */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Bygget for norske seniorer og arbeidsgivere
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Senior Connect er utviklet med fokus pa det norske arbeidsmarkedet,
                pensjonistlonn og gjeldende regelverk.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <p className="text-4xl font-bold text-blue-700">100%</p>
                  <p className="mt-2 text-base text-gray-600">Norsk plattform</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-700">GDPR</p>
                  <p className="mt-2 text-base text-gray-600">
                    Personvern i fokus
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-700">Gratis</p>
                  <p className="mt-2 text-base text-gray-600">
                    For seniorer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Senior Connect</h3>
              <p className="mt-2 text-sm">
                Plattform for formidling av kontakt mellom erfarne seniorer og
                arbeidsgivere i Norge.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">For seniorer</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/for-seniorer" className="hover:text-white">
                    Hvordan det fungerer
                  </Link>
                </li>
                <li>
                  <Link href="/registrer?rolle=senior" className="hover:text-white">
                    Registrer deg
                  </Link>
                </li>
                <li>
                  <Link href="/pensjonistlonn" className="hover:text-white">
                    Om pensjonistlonn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">For arbeidsgivere</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/for-arbeidsgivere" className="hover:text-white">
                    Hvordan det fungerer
                  </Link>
                </li>
                <li>
                  <Link href="/registrer?rolle=arbeidsgiver" className="hover:text-white">
                    Kom i gang
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Om oss</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/om-oss" className="hover:text-white">
                    Om Senior Connect
                  </Link>
                </li>
                <li>
                  <Link href="/personvern" className="hover:text-white">
                    Personvern
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Senior Connect. Alle rettigheter reservert.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
