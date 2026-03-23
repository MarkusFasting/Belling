import { createAdminClient } from '@/lib/supabase/admin'
import { StatsCard } from '@/components/dashboard/stats-cards'

async function getAdminStats() {
  const supabase = createAdminClient()

  const [
    { count: totalSeniors },
    { count: activeSeniors },
    { count: pendingApproval },
    { count: totalEmployers },
    { count: activeSubscriptions },
    { count: matchesThisWeek },
    { count: matchesThisMonth },
  ] = await Promise.all([
    supabase.from('seniors').select('*', { count: 'exact', head: true }),
    supabase
      .from('seniors')
      .select('*', { count: 'exact', head: true })
      .eq('er_aktiv', true)
      .eq('godkjent', true),
    supabase
      .from('seniors')
      .select('*', { count: 'exact', head: true })
      .eq('godkjent', false),
    supabase.from('employers').select('*', { count: 'exact', head: true }),
    supabase
      .from('employers')
      .select('*', { count: 'exact', head: true })
      .eq('subscription_status', 'active'),
    supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .gte(
        'created_at',
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      ),
    supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .gte(
        'created_at',
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      ),
  ])

  return {
    totalSeniors: totalSeniors ?? 0,
    activeSeniors: activeSeniors ?? 0,
    pendingApproval: pendingApproval ?? 0,
    totalEmployers: totalEmployers ?? 0,
    activeSubscriptions: activeSubscriptions ?? 0,
    matchesThisWeek: matchesThisWeek ?? 0,
    matchesThisMonth: matchesThisMonth ?? 0,
  }
}

export default async function AdminPage() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Adminoversikt</h1>
        <p className="text-muted-foreground">
          Nøkkeltall og statistikk for Senior Connect
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Totalt seniorer"
          value={stats.totalSeniors}
          description="Registrerte seniorprofiler"
        />
        <StatsCard
          title="Aktive seniorer"
          value={stats.activeSeniors}
          description="Godkjente og aktive"
        />
        <StatsCard
          title="Venter på godkjenning"
          value={stats.pendingApproval}
          description="Krever manuell gjennomgang"
        />
        <StatsCard
          title="Totalt arbeidsgivere"
          value={stats.totalEmployers}
          description="Registrerte bedrifter"
        />
        <StatsCard
          title="Aktive abonnementer"
          value={stats.activeSubscriptions}
          description="Betalende kunder"
        />
        <StatsCard
          title="Henvendelser denne uken"
          value={stats.matchesThisWeek}
          description="Siste 7 dager"
        />
        <StatsCard
          title="Henvendelser denne måneden"
          value={stats.matchesThisMonth}
          description="Inneværende måned"
        />
      </div>
    </div>
  )
}
