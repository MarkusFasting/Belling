import { redirect } from 'next/navigation'
import { getSeniorProfile, updateSeniorProfile, toggleSeniorActive, uploadCV } from '@/actions/senior'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SEKTORER } from '@/lib/utils/constants'
import { formatDate, getSektorLabel } from '@/lib/utils/helpers'

export default async function SeniorProfilPage() {
  const profile = await getSeniorProfile()

  if (!profile) {
    redirect('/registrer/senior')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Min profil</h1>
          <p className="text-muted-foreground">Administrer din seniorprofil</p>
        </div>
        <div className="flex items-center gap-2">
          {profile.godkjent ? (
            <Badge variant="default">Godkjent</Badge>
          ) : (
            <Badge variant="secondary">Venter på godkjenning</Badge>
          )}
          {profile.er_aktiv ? (
            <Badge variant="default">Aktiv</Badge>
          ) : (
            <Badge variant="destructive">Pauset</Badge>
          )}
        </div>
      </div>

      {/* Profile details card */}
      <Card>
        <CardHeader>
          <CardTitle>Profilinformasjon</CardTitle>
          <CardDescription>Dine kontaktopplysninger og detaljer</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData: FormData) => { 'use server'; await updateSeniorProfile(formData) }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="navn" className="text-sm font-medium">
                  Navn
                </label>
                <input
                  id="navn"
                  name="navn"
                  type="text"
                  defaultValue={profile.navn}
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
                  defaultValue={profile.epost}
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
                  defaultValue={profile.telefon ?? ''}
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
                  defaultValue={profile.postnummer}
                  pattern="\d{4}"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="kommune" className="text-sm font-medium">
                  Kommune
                </label>
                <input
                  id="kommune"
                  name="kommune"
                  type="text"
                  defaultValue={profile.kommune ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="onsket_timer_per_uke" className="text-sm font-medium">
                  Ønsket timer per uke
                </label>
                <input
                  id="onsket_timer_per_uke"
                  name="onsket_timer_per_uke"
                  type="number"
                  min={1}
                  max={40}
                  defaultValue={profile.onsket_timer_per_uke ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="tilgjengelig_fra" className="text-sm font-medium">
                  Tilgjengelig fra
                </label>
                <input
                  id="tilgjengelig_fra"
                  name="tilgjengelig_fra"
                  type="date"
                  defaultValue={profile.tilgjengelig_fra ?? ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="bio" className="text-sm font-medium">
                Om meg
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue={profile.bio ?? ''}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                maxLength={2000}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Sektorer</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SEKTORER.map((sektor) => (
                  <label key={sektor.value} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="sektorer"
                      value={sektor.value}
                      defaultChecked={profile.sektorer.includes(sektor.value)}
                      className="rounded border-input"
                    />
                    {sektor.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="kompetanser" className="text-sm font-medium">
                Kompetanser (kommaseparert)
              </label>
              <input
                id="kompetanser"
                name="kompetanser"
                type="text"
                defaultValue={profile.kompetanser.join(', ')}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="f.eks. prosjektledelse, regnskap, rådgivning"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Lagre endringer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Toggle active status */}
      <Card>
        <CardHeader>
          <CardTitle>Profilstatus</CardTitle>
          <CardDescription>
            {profile.er_aktiv
              ? 'Din profil er aktiv og synlig for arbeidsgivere.'
              : 'Din profil er pauset og ikke synlig for arbeidsgivere.'}
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

      {/* CV upload */}
      <Card>
        <CardHeader>
          <CardTitle>CV</CardTitle>
          <CardDescription>
            Last opp din CV i PDF-format (maks 5 MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile.cv_url && (
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="secondary">CV lastet opp</Badge>
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline"
              >
                Se CV
              </a>
            </div>
          )}
          <form action={async (formData: FormData) => { 'use server'; await uploadCV(formData) }} className="flex items-center gap-4">
            <input
              type="file"
              name="cv"
              accept="application/pdf"
              className="text-sm"
              required
            />
            <Button type="submit" variant="outline">
              Last opp
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Profile metadata */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Registrert: {formatDate(profile.created_at)}</span>
            <span>Sist oppdatert: {formatDate(profile.updated_at)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
