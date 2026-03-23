'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { z } from 'zod/v4'

const loginSchema = z.object({
  email: z.email('Ugyldig e-postadresse'),
  password: z.string().min(6, 'Passord må være minst 6 tegn'),
})

const signUpSchema = z.object({
  email: z.email('Ugyldig e-postadresse'),
  password: z.string().min(8, 'Passord må være minst 8 tegn'),
  role: z.enum(['senior', 'employer']),
})

export async function login(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { success: false as const, error: 'Feil e-post eller passord' }
  }

  // Get user role for redirect
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false as const, error: 'Kunne ikke hente brukerdata' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile) return { success: false as const, error: 'Profil ikke funnet' }

  if (profile.role === 'senior') redirect('/senior/profil')
  if (profile.role === 'employer') redirect('/arbeidsgiver/sok')
  if (profile.role === 'admin') redirect('/admin')

  redirect('/')
}

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const parsed = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  })

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/bekreft-epost`,
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false as const, error: 'Denne e-postadressen er allerede registrert' }
    }
    return { success: false as const, error: 'Kunne ikke opprette konto. Prøv igjen.' }
  }

  if (data.user) {
    // Create profile with role using admin client to bypass RLS
    const admin = createAdminClient()
    const { error: profileError } = await admin
      .from('profiles')
      .insert({ id: data.user.id, role: parsed.data.role })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      return { success: false as const, error: 'Kunne ikke opprette profil' }
    }
  }

  return { success: true as const, data: { requiresConfirmation: true } }
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getSession() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile ? { user, role: profile.role } : null
}
