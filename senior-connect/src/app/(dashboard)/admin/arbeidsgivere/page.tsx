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

const subscriptionLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  active: { label: 'Aktivt', variant: 'default' },
  past_due: { label: 'Forfalt', variant: 'destructive' },
  canceled: { label: 'Kansellert', variant: 'secondary' },
  none: { label: 'Ingen', variant: 'outline' },
}

export default async function AdminArbeidsgiverePage() {
  const supabase = createAdminClient()

  const { data: employers } = await supabase
    .from('employers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Arbeidsgivere</h1>
        <p className="text-muted-foreground">
          Oversikt over alle registrerte arbeidsgivere
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Firmanavn</TableHead>
              <TableHead>Org.nr</TableHead>
              <TableHead>Kontaktperson</TableHead>
              <TableHead>Abonnement</TableHead>
              <TableHead>Kontakter brukt</TableHead>
              <TableHead>Registrert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers && employers.length > 0 ? (
              employers.map((employer) => {
                const subConfig =
                  subscriptionLabels[employer.subscription_status] ??
                  subscriptionLabels.none

                return (
                  <TableRow key={employer.id}>
                    <TableCell className="font-medium">
                      {employer.firmanavn}
                    </TableCell>
                    <TableCell>{employer.org_nr}</TableCell>
                    <TableCell>
                      <div>
                        <p>{employer.kontaktperson}</p>
                        <p className="text-xs text-muted-foreground">
                          {employer.epost}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subConfig.variant}>
                        {subConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {employer.kontakter_brukt_denne_mnd}/
                      {employer.kontakter_maks_per_mnd}
                    </TableCell>
                    <TableCell className="text-xs">
                      {formatDate(employer.created_at)}
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
                  Ingen arbeidsgivere registrert ennå.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
