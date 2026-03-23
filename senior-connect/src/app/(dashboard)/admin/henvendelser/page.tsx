import { createAdminClient } from '@/lib/supabase/admin'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/helpers'
import type { MatchStatus } from '@/types'

const statusConfig: Record<
  MatchStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  sent: { label: 'Sendt', variant: 'secondary' },
  accepted: { label: 'Akseptert', variant: 'default' },
  rejected: { label: 'Avslått', variant: 'destructive' },
  expired: { label: 'Utløpt', variant: 'outline' },
}

export default async function AdminHenvendelserPage() {
  const supabase = createAdminClient()

  const { data: matches } = await supabase
    .from('matches')
    .select('*, employer:employers(firmanavn), senior:seniors(navn)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Henvendelser</h1>
        <p className="text-muted-foreground">
          Alle henvendelser mellom arbeidsgivere og seniorer
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arbeidsgiver</TableHead>
              <TableHead>Senior</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Melding</TableHead>
              <TableHead>Opprettet</TableHead>
              <TableHead>Besvart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches && matches.length > 0 ? (
              matches.map((match) => {
                const employer = match.employer as { firmanavn: string } | null
                const senior = match.senior as { navn: string } | null
                const config = statusConfig[match.status as MatchStatus]

                return (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">
                      {employer?.firmanavn ?? 'Ukjent'}
                    </TableCell>
                    <TableCell>{senior?.navn ?? 'Ukjent'}</TableCell>
                    <TableCell>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {match.melding ?? '-'}
                    </TableCell>
                    <TableCell className="text-xs">
                      {formatDate(match.created_at)}
                    </TableCell>
                    <TableCell className="text-xs">
                      {match.responded_at
                        ? formatDate(match.responded_at)
                        : '-'}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  Ingen henvendelser ennå.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
