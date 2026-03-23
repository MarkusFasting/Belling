'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod/v4'
import { revalidatePath } from 'next/cache'

const sektorEnum = z.enum([
  'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
  'offentlig_admin', 'finans', 'transport', 'industri',
  'handel', 'annet'
])

const seniorProfileSchema = z.object({
  navn: z.string().min(2, 'Navn må være minst 2 tegn'),
  epost: z.email('Ugyldig e-postadresse'),
  telefon: z.string().optional(),
  postnummer: z.string().regex(/^\d{4}$/, 'Postnummer må være 4 siffer'),
  kommune: z.string().optional(),
  bio: z.string().max(2000, 'Bio kan ikke være lenger enn 2000 tegn').optional(),
  sektorer: z.array(sektorEnum).min(1, 'Velg minst én sektor'),
  kompetanser: z.array(z.string()).min(1, 'Legg til minst én kompetanse'),
  tilgjengelig_fra: z.string().optional(),
  onsket_timer_per_uke: z.coerce.number().min(1).max(40).optional(),
})

export async function createSeniorProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const rawSektorer = formData.getAll('sektorer') as string[]
  const rawKompetanser = formData.get('kompetanser') as string
  const kompetanserArray = rawKompetanser
    ? rawKompetanser.split(',').map(k => k.trim()).filter(Boolean)
    : []

  const parsed = seniorProfileSchema.safeParse({
    navn: formData.get('navn'),
    epost: formData.get('epost'),
    telefon: formData.get('telefon') || undefined,
    postnummer: formData.get('postnummer'),
    kommune: formData.get('kommune') || undefined,
    bio: formData.get('bio') || undefined,
    sektorer: rawSektorer,
    kompetanser: kompetanserArray,
    tilgjengelig_fra: formData.get('tilgjengelig_fra') || undefined,
    onsket_timer_per_uke: formData.get('onsket_timer_per_uke') || undefined,
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { error } = await supabase
    .from('seniors')
    .insert({
      user_id: user.id,
      ...parsed.data,
    })

  if (error) {
    console.error('Senior profile creation error:', error)
    return { success: false as const, error: 'Kunne ikke opprette profil. Prøv igjen.' }
  }

  revalidatePath('/senior/profil')
  return { success: true as const, data: undefined }
}

export async function updateSeniorProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const rawSektorer = formData.getAll('sektorer') as string[]
  const rawKompetanser = formData.get('kompetanser') as string
  const kompetanserArray = rawKompetanser
    ? rawKompetanser.split(',').map(k => k.trim()).filter(Boolean)
    : []

  const parsed = seniorProfileSchema.safeParse({
    navn: formData.get('navn'),
    epost: formData.get('epost'),
    telefon: formData.get('telefon') || undefined,
    postnummer: formData.get('postnummer'),
    kommune: formData.get('kommune') || undefined,
    bio: formData.get('bio') || undefined,
    sektorer: rawSektorer,
    kompetanser: kompetanserArray,
    tilgjengelig_fra: formData.get('tilgjengelig_fra') || undefined,
    onsket_timer_per_uke: formData.get('onsket_timer_per_uke') || undefined,
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { error } = await supabase
    .from('seniors')
    .update(parsed.data)
    .eq('user_id', user.id)

  if (error) {
    console.error('Senior profile update error:', error)
    return { success: false as const, error: 'Kunne ikke oppdatere profil' }
  }

  revalidatePath('/senior/profil')
  return { success: true as const, data: undefined }
}

export async function toggleSeniorActive() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const { data: senior } = await supabase
    .from('seniors')
    .select('er_aktiv')
    .eq('user_id', user.id)
    .single()

  if (!senior) return { success: false as const, error: 'Profil ikke funnet' }

  const { error } = await supabase
    .from('seniors')
    .update({ er_aktiv: !senior.er_aktiv })
    .eq('user_id', user.id)

  if (error) return { success: false as const, error: 'Kunne ikke oppdatere status' }

  revalidatePath('/senior/profil')
  return { success: true as const, data: { er_aktiv: !senior.er_aktiv } }
}

export async function getSeniorProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('seniors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return data
}

export async function uploadCV(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const file = formData.get('cv') as File
  if (!file) return { success: false as const, error: 'Ingen fil valgt' }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false as const, error: 'Filen er for stor. Maks 5MB.' }
  }

  if (file.type !== 'application/pdf') {
    return { success: false as const, error: 'Kun PDF-filer er tillatt' }
  }

  const fileName = `${user.id}/${Date.now()}.pdf`
  const { error: uploadError } = await supabase.storage
    .from('cv')
    .upload(fileName, file, { upsert: true })

  if (uploadError) {
    console.error('CV upload error:', uploadError)
    return { success: false as const, error: 'Kunne ikke laste opp CV' }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('cv')
    .getPublicUrl(fileName)

  const { error: updateError } = await supabase
    .from('seniors')
    .update({ cv_url: publicUrl })
    .eq('user_id', user.id)

  if (updateError) return { success: false as const, error: 'Kunne ikke lagre CV-lenke' }

  revalidatePath('/senior/profil')
  return { success: true as const, data: { url: publicUrl } }
}
