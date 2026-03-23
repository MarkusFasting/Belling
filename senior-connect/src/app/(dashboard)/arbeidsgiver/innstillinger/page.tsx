import { getEmployerProfile, updateEmployerProfile } from '@/actions/employer'
import { signOut } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SEKTORER } from '@/lib/utils/constants'

export default async function ArbeidsgiverInnstillingerPage() {
  const employer = await getEmployerProfile()

  if (!employer) {
    redirect('/registrer/arbeidsgiver')
  }

  const subscriptionLabels: Record<string, string> = {
    active: 'Aktivt',
    past_due: 'Forfalt',
    canceled: 'Kansellert',
    none: 'Ingen',
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Innstillinger</h1>
        <p className="text-muted-foreground">Administrer bedriftskontoen din</p>
      </div>

      {/* Edit profile */}
      <Card>
        <CardHeader>
          <CardTitle>Bedriftsprofil</CardTitle>
          <CardDescription>Oppdater bedriftsinformasjonen din</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData: FormData) => { 'use server'; await updateEmployerProfile(formData) }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="org_nr" className="text-sm font-medium">
                  Organisasjonsnummer
                </label>
                <input
                  id="org_nr"
                  name="org_nr"
                  type="text"
                  defaultValue={employer.org_nr}
                  pattern="\d{9}"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="firmanavn" className="text-sm font-medium">
                  Firmanavn
                </label>
                <input
                  id="firmanavn"
                  name="firmanavn"
                  type="text"
                  defaultValue={employer.firmanavn}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="kontaktperson" className="text-sm font-medium">
                  Kontaktperson
                </label>
                <input
                  id="kontaktperson"
                  name="kontaktperson"
                  type="text"
                  defaultValue={employer.kontaktperson}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="epost" className="text-sm font-medium">
                  E-post
                </label>
                <input
                  id="epost"
                  name="epost"
                  type="email"
                  defaultValue={employer.epost}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="telefon" className="text-sm font-medium">
                  Telefon
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  defaultValue={employer.telefon ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="postnummer" className="text-sm font-medium">
                  Postnummer
                </label>
                <input
                  id="postnummer"
                  name="postnummer"
                  type="text"
                  defaultValue={employer.postnummer ?? ''}
                  pattern="\d{4}"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="sektor" className="text-sm font-medium">
                  Sektor
                </label>
                <select
                  id="sektor"
                  name="sektor"
                  defaultValue={employer.sektor ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Velg sektor</option>
                  {SEKTORER.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="antall_ansatte" className="text-sm font-medium">
                  Antall ansatte
                </label>
                <input
                  id="antall_ansatte"
                  name="antall_ansatte"
                  type="number"
                  min={1}
                  defaultValue={employer.antall_ansatte ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Lagre endringer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Subscription status */}
      <Card>
        <CardHeader>
          <CardTitle>Abonnement</CardTitle>
          <CardDescription>
            Status:{' '}
            <Badge
              variant={
                employer.subscription_status === 'active'
                  ? 'default'
                  : 'secondary'
              }
            >
              {subscriptionLabels[employer.subscription_status] ?? 'Ukjent'}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a href="/arbeidsgiver/abonnement">
            <Button variant="outline">Administrer abonnement</Button>
          </a>
        </CardContent>
      </Card>

      {/* Sign out */}
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
