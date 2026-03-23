import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Koble erfarne seniorer med arbeidsgivere
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Senior Connect gjor det enkelt for pensjonister a finne meningsfullt
            deltidsarbeid, og for arbeidsgivere a fa tilgang til verdifull
            erfaring og kompetanse.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/registrer?rolle=senior">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6">
                Registrer deg som senior
              </Button>
            </Link>
            <Link href="/registrer?rolle=arbeidsgiver">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6"
              >
                Finn seniorer
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-indigo-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  )
}
