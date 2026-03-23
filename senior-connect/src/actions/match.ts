'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod/v4'
import { revalidatePath } from 'next/cache'
import { sendEmail } from '@/lib/email/send'
import { newMatchTemplate } from '@/lib/email/templates/new-match'
import { matchAcceptedTemplate } from '@/lib/email/templates/match-accepted'

const createMatchSchema = z.object({
  senior_id: z.string().uuid('Ugyldig senior-ID'),
  melding: z.string().min(10, 'Melding må være minst 10 tegn').max(500, 'Melding kan ikke være lenger enn 500 tegn'),
})

export async function createMatch(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const parsed = createMatchSchema.safeParse({
    senior_id: formData.get('senior_id'),
    melding: formData.get('melding'),
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  // Get employer profile
  const { data: employer } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!employer) return { success: false as const, error: 'Arbeidsgiverprofil ikke funnet' }

  if (employer.subscription_status !== 'active') {
    return { success: false as const, error: 'Du trenger et aktivt abonnement for å kontakte seniorer' }
  }

  if (employer.kontakter_brukt_denne_mnd >= employer.kontakter_maks_per_mnd) {
    return { success: false as const, error: 'Du har brukt alle kontaktene dine denne måneden' }
  }

  // Check for existing match
  const { data: existingMatch } = await supabase
    .from('matches')
    .select('id')
    .eq('employer_id', employer.id)
    .eq('senior_id', parsed.data.senior_id)
    .single()

  if (existingMatch) {
    return { success: false as const, error: 'Du har allerede kontaktet denne senioren' }
  }

  // Create match
  const { error: matchError } = await supabase
    .from('matches')
    .insert({
      employer_id: employer.id,
      senior_id: parsed.data.senior_id,
      melding: parsed.data.melding,
    })

  if (matchError) {
    console.error('Match creation error:', matchError)
    return { success: false as const, error: 'Kunne ikke opprette henvendelse' }
  }

  // Increment contact counter
  await supabase
    .from('employers')
    .update({ kontakter_brukt_denne_mnd: employer.kontakter_brukt_denne_mnd + 1 })
    .eq('id', employer.id)

  // Send email to senior
  const admin = createAdminClient()
  const { data: senior } = await admin
    .from('seniors')
    .select('epost, navn')
    .eq('id', parsed.data.senior_id)
    .single()

  if (senior) {
    await sendEmail({
      to: senior.epost,
      subject: 'Ny henvendelse på Senior Connect',
      html: newMatchTemplate({ seniorNavn: senior.navn, firmanavn: employer.firmanavn }),
    })
  }

  revalidatePath('/arbeidsgiver/henvendelser')
  return { success: true as const, data: undefined }
}

export async function respondToMatch(matchId: string, response: 'accepted' | 'rejected') {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  // Verify the match belongs to this senior
  const { data: match } = await supabase
    .from('matches')
    .select('*, seniors!inner(user_id, navn, epost, telefon), employers!inner(user_id, epost, firmanavn)')
    .eq('id', matchId)
    .single()

  if (!match) return { success: false as const, error: 'Henvendelse ikke funnet' }

  const senior = (match as Record<string, unknown>).seniors as { user_id: string; navn: string; epost: string; telefon: string | null }
  const employer = (match as Record<string, unknown>).employers as { user_id: string; epost: string; firmanavn: string }

  if (senior.user_id !== user.id) {
    return { success: false as const, error: 'Du har ikke tilgang til denne henvendelsen' }
  }

  if (match.status !== 'sent') {
    return { success: false as const, error: 'Denne henvendelsen er allerede besvart' }
  }

  const { error } = await supabase
    .from('matches')
    .update({ status: response, responded_at: new Date().toISOString() })
    .eq('id', matchId)

  if (error) return { success: false as const, error: 'Kunne ikke oppdatere henvendelse' }

  // Send email to employer
  if (response === 'accepted') {
    await sendEmail({
      to: employer.epost,
      subject: 'En senior har akseptert din henvendelse!',
      html: matchAcceptedTemplate({
        kontaktperson: employer.firmanavn,
        seniorNavn: senior.navn,
        seniorEpost: senior.epost,
        seniorTelefon: senior.telefon,
      }),
    })
  } else {
    await sendEmail({
      to: employer.epost,
      subject: 'Oppdatering på din henvendelse',
      html: `<p>Hei ${employer.firmanavn},</p><p>Dessverre er senioren du kontaktet ikke tilgjengelig for øyeblikket.</p><p>Du kan fortsette å søke etter andre seniorer på Senior Connect.</p>`,
    })
  }

  revalidatePath('/senior/henvendelser')
  return { success: true as const, data: undefined }
}

export async function getSeniorMatches() {
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
    .select('*, employers(firmanavn, sektor, postnummer)')
    .eq('senior_id', senior.id)
    .order('created_at', { ascending: false })

  return matches ?? []
}

export async function getEmployerMatches() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: employer } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!employer) return []

  const { data: matches } = await supabase
    .from('matches')
    .select('*, seniors(navn, sektorer, kompetanser, postnummer)')
    .eq('employer_id', employer.id)
    .order('created_at', { ascending: false })

  return matches ?? []
}
