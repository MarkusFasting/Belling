import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, getSektorLabel } from '@/lib/utils/helpers'

async function approveSenior(formData: FormData) {
  'use server'
  const seniorId = formData.get('seniorId') as string
  const supabase = createAdminClient()
  await supabase.from('seniors').update({ godkjent: true }).eq('id', seniorId)
  revalidatePath('/admin/seniorer')
}

async function deactivateSenior(formData: FormData) {
  'use server'
  const seniorId = formData.get('seniorId') as string
  const supabase = createAdminClient()
  await supabase
    .from('seniors')
    .update({ er_aktiv: false })
    .eq('id', seniorId)
  revalidatePath('/admin/seniorer')
}

export default async function AdminSeniorerPage() {
  const supabase = createAdminClient()

  const { data: seniors } = await supabase
    .from('seniors')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Seniorer</h1>
        <p className="text-muted-foreground">
          Administrer alle registrerte seniorprofiler
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>E-post</TableHead>
              <TableHead>Postnummer</TableHead>
              <TableHead>Sektorer</TableHead>
              <TableHead>Godkjent</TableHead>
              <TableHead>Aktiv</TableHead>
              <TableHead>Registrert</TableHead>
              <TableHead>Handlinger</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seniors && seniors.length > 0 ? (
              seniors.map((senior) => (
                <TableRow key={senior.id}>
                  <TableCell className="font-medium">{senior.navn}</TableCell>
                  <TableCell>{senior.epost}</TableCell>
                  <TableCell>{senior.postnummer}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {senior.sektorer.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {getSektorLabel(s)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {senior.godkjent ? (
                      <Badge variant="default">Ja</Badge>
                    ) : (
                      <Badge variant="secondary">Nei</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {senior.er_aktiv ? (
                      <Badge variant="default">Aktiv</Badge>
                    ) : (
                      <Badge variant="destructive">Inaktiv</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatDate(senior.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {!senior.godkjent && (
                        <form action={approveSenior}>
                          <input
                            type="hidden"
                            name="seniorId"
                            value={senior.id}
                          />
                          <Button type="submit" size="sm">
                            Godkjenn
                          </Button>
                        </form>
                      )}
                      {senior.er_aktiv && (
                        <form action={deactivateSenior}>
                          <input
                            type="hidden"
                            name="seniorId"
                            value={senior.id}
                          />
                          <Button
                            type="submit"
                            size="sm"
                            variant="destructive"
                          >
                            Deaktiver
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  Ingen seniorer registrert ennå.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
