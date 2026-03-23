import Link from 'next/link'
import { getSeniorProfile, toggleSeniorActive } from '@/actions/senior'
import { signOut } from '@/actions/auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function SeniorInnstillingerPage() {
  const profile = await getSeniorProfile()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Innstillinger</h1>
        <p className="text-muted-foreground">Administrer kontoen din</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Rediger profilinformasjonen din</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/senior/profil">
            <Button variant="outline">Gå til profil</Button>
          </Link>
        </CardContent>
      </Card>

      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Profilstatus</CardTitle>
            <CardDescription>
              Din profil er{' '}
              {profile.er_aktiv ? (
                <Badge variant="default">Aktiv</Badge>
              ) : (
                <Badge variant="destructive">Pauset</Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async () => { 'use server'; await toggleSeniorActive() }}>
              <Button variant={profile.er_aktiv ? 'destructive' : 'default'} type="submit">
                {profile.er_aktiv ? 'Pause profil' : 'Aktiver profil'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Logg ut</CardTitle>
          <CardDescription>Logg ut av Senior Connect</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signOut}>
            <Button variant="destructive" type="submit">
              Logg ut
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
