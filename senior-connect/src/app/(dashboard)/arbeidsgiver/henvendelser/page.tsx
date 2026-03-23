import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getEmployerProfile } from '@/actions/employer'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, getSektorLabel } from '@/lib/utils/helpers'
import type { MatchStatus } from '@/types'

async function getEmployerMatches() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: employer } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!employer) return []

  const { data: matches } = await supabase
    .from('matches')
    .select('*, senior:seniors(*)')
    .eq('employer_id', employer.id)
    .order('created_at', { ascending: false })

  return matches ?? []
}

const statusConfig: Record<
  MatchStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  sent: { label: 'Sendt', variant: 'secondary' },
  accepted: { label: 'Akseptert', variant: 'default' },
  rejected: { label: 'Avslått', variant: 'destructive' },
  expired: { label: 'Utløpt', variant: 'outline' },
}

export default async function ArbeidsgiverHenvendelserPage() {
  const employer = await getEmployerProfile()
  if (!employer) {
    redirect('/registrer/arbeidsgiver')
  }

  const matches = await getEmployerMatches()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mine henvendelser</h1>
        <p className="text-muted-foreground">
          Oversikt over henvendelser du har sendt til seniorer
        </p>
      </div>

      {matches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Ingen henvendelser ennå
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Når du kontakter en senior, vil henvendelsen vises her.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => {
            const senior = match.senior as {
              navn: string
              sektorer: string[]
              epost: string
              postnummer: string
            } | null
            const config = statusConfig[match.status as MatchStatus]

            return (
              <Card
                key={match.id}
                className={
                  match.status === 'expired' ? 'opacity-50' : ''
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {match.status === 'accepted' && senior
                        ? senior.navn
                        : 'Senior'}
                    </CardTitle>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                  <CardDescription>
                    {senior?.sektorer
                      ?.map((s: string) => getSektorLabel(s))
                      .join(', ') ?? 'Ingen sektor'}
                    {' · '}
                    Sendt {formatDate(match.created_at)}
                  </CardDescription>
                </CardHeader>
                {match.melding && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Din melding:</span>{' '}
                      {match.melding}
                    </p>
                  </CardContent>
                )}
                {match.status === 'accepted' && senior && (
                  <CardContent>
                    <div className="rounded-md bg-muted p-3 text-sm">
                      <p className="font-medium">Kontaktinformasjon:</p>
                      <p>{senior.navn}</p>
                      <p>{senior.epost}</p>
                    </div>
                  </CardContent>
                )}
                {match.responded_at && (
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Besvart {formatDate(match.responded_at)}
                    </p>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
