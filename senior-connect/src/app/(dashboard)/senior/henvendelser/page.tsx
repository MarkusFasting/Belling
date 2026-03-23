import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, getSektorLabel } from '@/lib/utils/helpers'
import { revalidatePath } from 'next/cache'
import type { MatchStatus } from '@/types'

async function getSeniorMatches() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: senior } = await supabase
    .from('seniors')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!senior) return []

  const { data: matches } = await supabase
    .from('matches')
    .select('*, employer:employers(*)')
    .eq('senior_id', senior.id)
    .order('created_at', { ascending: false })

  return matches ?? []
}

async function respondToMatch(formData: FormData) {
  'use server'

  const matchId = formData.get('matchId') as string
  const action = formData.get('action') as 'accepted' | 'rejected'

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('matches')
    .update({ status: action, responded_at: new Date().toISOString() })
    .eq('id', matchId)

  revalidatePath('/senior/henvendelser')
}

const statusConfig: Record<MatchStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  sent: { label: 'Ny henvendelse', variant: 'default' },
  accepted: { label: 'Akseptert', variant: 'default' },
  rejected: { label: 'Avslått', variant: 'destructive' },
  expired: { label: 'Utløpt', variant: 'secondary' },
}

export default async function SeniorHenvendelserPage() {
  const matches = await getSeniorMatches()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Henvendelser</h1>
        <p className="text-muted-foreground">
          Henvendelser fra arbeidsgivere som er interessert i din profil
        </p>
      </div>

      {matches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Ingen henvendelser ennå
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Når en arbeidsgiver tar kontakt, vil henvendelsen vises her.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => {
            const employer = match.employer as {
              firmanavn: string
              sektor: string | null
              kontaktperson: string
              epost: string
            } | null
            const config = statusConfig[match.status as MatchStatus]

            return (
              <Card
                key={match.id}
                className={
                  match.status === 'rejected'
                    ? 'opacity-60'
                    : match.status === 'expired'
                      ? 'opacity-40'
                      : ''
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{employer?.firmanavn ?? 'Ukjent arbeidsgiver'}</CardTitle>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                  <CardDescription>
                    {employer?.sektor ? getSektorLabel(employer.sektor) : 'Ingen sektor oppgitt'}
                    {' · '}
                    {formatDate(match.created_at)}
                  </CardDescription>
                </CardHeader>
                {match.melding && (
                  <CardContent>
                    <p className="text-sm">{match.melding}</p>
                  </CardContent>
                )}
                {match.status === 'accepted' && employer && (
                  <CardContent>
                    <div className="rounded-md bg-muted p-3 text-sm">
                      <p className="font-medium">Kontaktinformasjon:</p>
                      <p>{employer.kontaktperson}</p>
                      <p>{employer.epost}</p>
                    </div>
                  </CardContent>
                )}
                {match.status === 'sent' && (
                  <CardFooter className="gap-2">
                    <form action={respondToMatch}>
                      <input type="hidden" name="matchId" value={match.id} />
                      <input type="hidden" name="action" value="accepted" />
                      <Button type="submit">Aksepter</Button>
                    </form>
                    <form action={respondToMatch}>
                      <input type="hidden" name="matchId" value={match.id} />
                      <input type="hidden" name="action" value="rejected" />
                      <Button type="submit" variant="destructive">
                        Avslå
                      </Button>
                    </form>
                  </CardFooter>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
