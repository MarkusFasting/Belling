import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sjekk e-posten din</CardTitle>
          <CardDescription className="text-base mt-2">
            Vi har sendt en bekreftelseslenke til e-postadressen din.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-base">
            Klikk på lenken i e-posten for å bekrefte kontoen din. Sjekk også søppelpost-mappen
            dersom du ikke finner e-posten.
          </p>
          <p className="text-sm text-gray-500">
            Etter bekreftelse kan du logge inn og begynne å bruke Senior Connect.
          </p>
          <div className="pt-4">
            <Link href="/logg-inn">
              <Button size="lg" className="text-base">
                Gå til innlogging
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
