import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="bg-blue-700 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Klar til a komme i gang?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Enten du er senior pa jakt etter meningsfullt arbeid eller
            arbeidsgiver pa utkikk etter erfaring - Senior Connect er
            plattformen for deg.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/registrer?rolle=senior">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base px-8 py-6"
              >
                Registrer deg som senior
              </Button>
            </Link>
            <Link href="/registrer?rolle=arbeidsgiver">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6 border-white text-white hover:bg-white hover:text-blue-700"
              >
                Registrer som arbeidsgiver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
