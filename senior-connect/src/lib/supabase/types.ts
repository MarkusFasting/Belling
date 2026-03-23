export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: Database['public']['Enums']['user_role']
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: Database['public']['Enums']['user_role']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: Database['public']['Enums']['user_role']
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      seniors: {
        Row: {
          id: string
          user_id: string
          navn: string
          telefon: string | null
          epost: string
          postnummer: string
          kommune: string | null
          bio: string | null
          sektorer: Database['public']['Enums']['sektor'][]
          kompetanser: string[]
          tilgjengelig_fra: string | null
          onsket_timer_per_uke: number | null
          cv_url: string | null
          er_aktiv: boolean
          godkjent: boolean
          created_at: string
          updated_at: string
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          user_id: string
          navn: string
          telefon?: string | null
          epost: string
          postnummer: string
          kommune?: string | null
          bio?: string | null
          sektorer?: Database['public']['Enums']['sektor'][]
          kompetanser?: string[]
          tilgjengelig_fra?: string | null
          onsket_timer_per_uke?: number | null
          cv_url?: string | null
          er_aktiv?: boolean
          godkjent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          navn?: string
          telefon?: string | null
          epost?: string
          postnummer?: string
          kommune?: string | null
          bio?: string | null
          sektorer?: Database['public']['Enums']['sektor'][]
          kompetanser?: string[]
          tilgjengelig_fra?: string | null
          onsket_timer_per_uke?: number | null
          cv_url?: string | null
          er_aktiv?: boolean
          godkjent?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'seniors_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      employers: {
        Row: {
          id: string
          user_id: string
          org_nr: string
          firmanavn: string
          kontaktperson: string
          epost: string
          telefon: string | null
          postnummer: string | null
          sektor: Database['public']['Enums']['sektor'] | null
          antall_ansatte: number | null
          stripe_customer_id: string | null
          subscription_status: Database['public']['Enums']['subscription_status']
          subscription_id: string | null
          kontakter_brukt_denne_mnd: number
          kontakter_maks_per_mnd: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          org_nr: string
          firmanavn: string
          kontaktperson: string
          epost: string
          telefon?: string | null
          postnummer?: string | null
          sektor?: Database['public']['Enums']['sektor'] | null
          antall_ansatte?: number | null
          stripe_customer_id?: string | null
          subscription_status?: Database['public']['Enums']['subscription_status']
          subscription_id?: string | null
          kontakter_brukt_denne_mnd?: number
          kontakter_maks_per_mnd?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          org_nr?: string
          firmanavn?: string
          kontaktperson?: string
          epost?: string
          telefon?: string | null
          postnummer?: string | null
          sektor?: Database['public']['Enums']['sektor'] | null
          antall_ansatte?: number | null
          stripe_customer_id?: string | null
          subscription_status?: Database['public']['Enums']['subscription_status']
          subscription_id?: string | null
          kontakter_brukt_denne_mnd?: number
          kontakter_maks_per_mnd?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'employers_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      matches: {
        Row: {
          id: string
          employer_id: string
          senior_id: string
          status: Database['public']['Enums']['match_status']
          melding: string | null
          created_at: string
          responded_at: string | null
        }
        Insert: {
          id?: string
          employer_id: string
          senior_id: string
          status?: Database['public']['Enums']['match_status']
          melding?: string | null
          created_at?: string
          responded_at?: string | null
        }
        Update: {
          id?: string
          employer_id?: string
          senior_id?: string
          status?: Database['public']['Enums']['match_status']
          melding?: string | null
          created_at?: string
          responded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'matches_employer_id_fkey'
            columns: ['employer_id']
            isOneToOne: false
            referencedRelation: 'employers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'matches_senior_id_fkey'
            columns: ['senior_id']
            isOneToOne: false
            referencedRelation: 'seniors'
            referencedColumns: ['id']
          },
        ]
      }
      profile_views: {
        Row: {
          id: string
          employer_id: string
          senior_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          senior_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          senior_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_views_employer_id_fkey'
            columns: ['employer_id']
            isOneToOne: false
            referencedRelation: 'employers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_views_senior_id_fkey'
            columns: ['senior_id']
            isOneToOne: false
            referencedRelation: 'seniors'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_monthly_contacts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'senior' | 'employer' | 'admin'
      match_status: 'sent' | 'accepted' | 'rejected' | 'expired'
      subscription_status: 'active' | 'past_due' | 'canceled' | 'none'
      sektor:
        | 'helse'
        | 'bygg_anlegg'
        | 'it_teknologi'
        | 'utdanning'
        | 'offentlig_admin'
        | 'finans'
        | 'transport'
        | 'industri'
        | 'handel'
        | 'annet'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
