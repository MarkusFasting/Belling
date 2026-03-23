'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod/v4'
import { revalidatePath } from 'next/cache'

const sektorEnum = z.enum([
  'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
  'offentlig_admin', 'finans', 'transport', 'industri',
  'handel', 'annet'
])

const employerProfileSchema = z.object({
  org_nr: z.string().regex(/^\d{9}$/, 'Organisasjonsnummer må være 9 siffer'),
  firmanavn: z.string().min(2, 'Firmanavn er påkrevd'),
  kontaktperson: z.string().min(2, 'Kontaktperson er påkrevd'),
  epost: z.email('Ugyldig e-postadresse'),
  telefon: z.string().optional(),
  postnummer: z.string().regex(/^\d{4}$/, 'Postnummer må være 4 siffer').optional(),
  sektor: sektorEnum.optional(),
  antall_ansatte: z.coerce.number().min(1).optional(),
})

export async function createEmployerProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const parsed = employerProfileSchema.safeParse({
    org_nr: formData.get('org_nr'),
    firmanavn: formData.get('firmanavn'),
    kontaktperson: formData.get('kontaktperson'),
    epost: formData.get('epost'),
    telefon: formData.get('telefon') || undefined,
    postnummer: formData.get('postnummer') || undefined,
    sektor: formData.get('sektor') || undefined,
    antall_ansatte: formData.get('antall_ansatte') || undefined,
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { error } = await supabase
    .from('employers')
    .insert({
      user_id: user.id,
      ...parsed.data,
    })

  if (error) {
    if (error.code === '23505') {
      return { success: false as const, error: 'Dette organisasjonsnummeret er allerede registrert' }
    }
    console.error('Employer profile creation error:', error)
    return { success: false as const, error: 'Kunne ikke opprette profil. Prøv igjen.' }
  }

  revalidatePath('/arbeidsgiver/sok')
  return { success: true as const, data: undefined }
}

export async function getEmployerProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return data
}

export async function lookupOrgNr(orgNr: string) {
  if (!/^\d{9}$/.test(orgNr)) {
    return { success: false as const, error: 'Organisasjonsnummer må være 9 siffer' }
  }

  try {
    const url = `${process.env.BRREG_API_URL || 'https://data.brreg.no/enhetsregisteret/api/enheter'}/${orgNr}`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false as const, error: 'Organisasjonsnummer ikke funnet' }
      }
      return { success: false as const, error: 'Kunne ikke slå opp organisasjon' }
    }

    const data = await response.json()
    return {
      success: true as const,
      data: {
        navn: data.navn as string,
        postnummer: data.forretningsadresse?.postnummer as string | undefined,
        poststed: data.forretningsadresse?.poststed as string | undefined,
        antallAnsatte: data.antallAnsatte as number | undefined,
      },
    }
  } catch {
    return { success: false as const, error: 'Nettverksfeil ved oppslag' }
  }
}

export async function updateEmployerProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const parsed = employerProfileSchema.safeParse({
    org_nr: formData.get('org_nr'),
    firmanavn: formData.get('firmanavn'),
    kontaktperson: formData.get('kontaktperson'),
    epost: formData.get('epost'),
    telefon: formData.get('telefon') || undefined,
    postnummer: formData.get('postnummer') || undefined,
    sektor: formData.get('sektor') || undefined,
    antall_ansatte: formData.get('antall_ansatte') || undefined,
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { error } = await supabase
    .from('employers')
    .update(parsed.data)
    .eq('user_id', user.id)

  if (error) {
    return { success: false as const, error: 'Kunne ikke oppdatere profil' }
  }

  revalidatePath('/arbeidsgiver/innstillinger')
  return { success: true as const, data: undefined }
}
