import type { Database } from '@/lib/supabase/types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Senior = Database['public']['Tables']['seniors']['Row']
export type Employer = Database['public']['Tables']['employers']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type ProfileView = Database['public']['Tables']['profile_views']['Row']

export type UserRole = Database['public']['Enums']['user_role']
export type MatchStatus = Database['public']['Enums']['match_status']
export type SubscriptionStatus = Database['public']['Enums']['subscription_status']
export type Sektor = Database['public']['Enums']['sektor']

export type SeniorWithMatch = Senior & {
  matches?: Match[]
}

export type MatchWithDetails = Match & {
  senior?: Senior
  employer?: Employer
}

export type SearchResult = {
  id: string
  navn: string
  bio: string | null
  postnummer: string
  kommune: string | null
  sektorer: Sektor[]
  kompetanser: string[]
  tilgjengelig_fra: string | null
  onsket_timer_per_uke: number | null
  er_aktiv: boolean
  godkjent: boolean
  created_at: string
  rank: number
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }
