import { Card, CardContent } from '@/components/ui/card'

export default function ArbeidsgiverFavoritterPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Favoritter</h1>
        <p className="text-muted-foreground">
          Dine lagrede seniorprofiler
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Favoritter kommer snart
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Her vil du kunne lagre seniorprofiler du er interessert i, slik at du
            enkelt kan finne dem igjen senere.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
