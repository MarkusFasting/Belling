import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getEmployerProfile } from '@/actions/employer'
import { redirect } from 'next/navigation'
import { SeniorSearch } from '@/components/search/senior-search'
import type { SearchResult } from '@/types'
import { MATCHES_PER_PAGE } from '@/lib/utils/constants'

async function searchSeniors(params: {
  q?: string
  sektor?: string[]
  postnummer?: string
  min_timer?: number
  max_timer?: number
  page?: number
}) {
  const supabase = await createServerSupabaseClient()
  const page = params.page ?? 1
  const from = (page - 1) * MATCHES_PER_PAGE
  const to = from + MATCHES_PER_PAGE - 1

  let queryBuilder = supabase
    .from('seniors')
    .select(
      'id, navn, bio, postnummer, kommune, sektorer, kompetanser, tilgjengelig_fra, onsket_timer_per_uke, er_aktiv, godkjent, created_at',
      { count: 'exact' }
    )
    .eq('er_aktiv', true)
    .eq('godkjent', true)

  if (params.q) {
    queryBuilder = queryBuilder.or(
      `navn.ilike.%${params.q}%,bio.ilike.%${params.q}%,kompetanser.cs.{${params.q}}`
    )
  }

  if (params.sektor && params.sektor.length > 0) {
    queryBuilder = queryBuilder.overlaps('sektorer', params.sektor)
  }

  if (params.postnummer) {
    queryBuilder = queryBuilder.like(
      'postnummer',
      `${params.postnummer.substring(0, 2)}%`
    )
  }

  if (params.min_timer) {
    queryBuilder = queryBuilder.gte('onsket_timer_per_uke', params.min_timer)
  }

  if (params.max_timer) {
    queryBuilder = queryBuilder.lte('onsket_timer_per_uke', params.max_timer)
  }

  const { data, count, error } = await queryBuilder
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Search error:', error)
    return { results: [], totalCount: 0 }
  }

  return {
    results: (data ?? []) as SearchResult[],
    totalCount: count ?? 0,
  }
}

export default async function ArbeidsgiverSokPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const employer = await getEmployerProfile()

  if (!employer) {
    redirect('/registrer/arbeidsgiver')
  }

  const params = await searchParams

  const q = typeof params.q === 'string' ? params.q : undefined
  const sektorParam = params.sektor
  const sektor = Array.isArray(sektorParam)
    ? sektorParam
    : sektorParam
      ? [sektorParam]
      : undefined
  const postnummer =
    typeof params.postnummer === 'string' ? params.postnummer : undefined
  const minTimer =
    typeof params.min_timer === 'string'
      ? parseInt(params.min_timer, 10)
      : undefined
  const maxTimer =
    typeof params.max_timer === 'string'
      ? parseInt(params.max_timer, 10)
      : undefined
  const page =
    typeof params.side === 'string' ? parseInt(params.side, 10) : 1

  const { results, totalCount } = await searchSeniors({
    q,
    sektor,
    postnummer,
    min_timer: minTimer && !isNaN(minTimer) ? minTimer : undefined,
    max_timer: maxTimer && !isNaN(maxTimer) ? maxTimer : undefined,
    page,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Finn seniorer</h1>
        <p className="text-muted-foreground">
          Søk blant erfarne seniorer som ønsker å bidra
        </p>
      </div>

      {!employer.subscription_status || employer.subscription_status === 'none' ? (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          Du trenger et aktivt abonnement for å se fullstendige profiler og ta kontakt med seniorer.{' '}
          <a href="/arbeidsgiver/abonnement" className="font-medium underline">
            Se abonnement
          </a>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Kontakter brukt denne måneden: {employer.kontakter_brukt_denne_mnd}/
          {employer.kontakter_maks_per_mnd}
        </p>
      )}

      <SeniorSearch
        initialResults={results}
        totalCount={totalCount}
        currentPage={page}
        pageSize={MATCHES_PER_PAGE}
        hasSubscription={employer.subscription_status === 'active'}
      />
    </div>
  )
}
