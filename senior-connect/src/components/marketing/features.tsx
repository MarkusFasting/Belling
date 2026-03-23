import { Briefcase, Clock, Heart, Search, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const seniorFeatures = [
  {
    icon: Briefcase,
    title: 'Fleksibelt arbeid',
    description:
      'Velg selv hvor mye du vil jobbe. Deltid, prosjektbasert eller noen timer i uka - du bestemmer.',
  },
  {
    icon: Heart,
    title: 'Meningsfulle oppgaver',
    description:
      'Bruk din erfaring og kompetanse pa oppgaver som betyr noe. Bidra med det du kan best.',
  },
  {
    icon: Shield,
    title: 'Trygt og enkelt',
    description:
      'Vi formidler kontakt mellom deg og arbeidsgivere. Du velger selv hvem du vil snakke med.',
  },
]

const employerFeatures = [
  {
    icon: Users,
    title: 'Tilgang til erfaring',
    description:
      'Sok blant erfarne seniorer med kompetanse fra mange ulike bransjer og sektorer.',
  },
  {
    icon: Search,
    title: 'Enkelt a finne riktig person',
    description:
      'Filtrer pa sektor, kompetanse, omrade og tilgjengelighet for a finne den rette kandidaten.',
  },
  {
    icon: Clock,
    title: 'Spar tid pa rekruttering',
    description:
      'Kontakt seniorer direkte gjennom plattformen. Raskt, effektivt og pa pensjonistlonn.',
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            En plattform for alle
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Senior Connect er laget for bade seniorer som onsker a jobbe og
            arbeidsgivere som trenger erfaren arbeidskraft.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            For seniorer
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seniorFeatures.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <feature.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            For arbeidsgivere
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {employerFeatures.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                      <feature.icon className="h-5 w-5 text-indigo-700" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
