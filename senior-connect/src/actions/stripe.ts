'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getStripeClient } from '@/lib/stripe/client'
import { PLANS } from '@/lib/stripe/config'
import { redirect } from 'next/navigation'

export async function createCheckoutSession() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const { data: employer } = await supabase
    .from('employers')
    .select('stripe_customer_id, firmanavn, epost')
    .eq('user_id', user.id)
    .single()

  if (!employer) return { success: false as const, error: 'Arbeidsgiverprofil ikke funnet' }

  const sessionParams: Record<string, unknown> = {
    mode: 'subscription' as const,
    payment_method_types: ['card'] as const,
    line_items: [{ price: PLANS.pro.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement?canceled=true`,
    metadata: { user_id: user.id },
  }

  if (employer.stripe_customer_id) {
    sessionParams.customer = employer.stripe_customer_id
  } else {
    sessionParams.customer_email = employer.epost
  }

  const stripeClient = getStripeClient()
  const session = await stripeClient.checkout.sessions.create(sessionParams as Parameters<typeof stripeClient.checkout.sessions.create>[0])

  if (session.url) {
    redirect(session.url)
  }

  return { success: false as const, error: 'Kunne ikke opprette betalingssesjon' }
}

export async function createPortalSession() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false as const, error: 'Ikke innlogget' }

  const { data: employer } = await supabase
    .from('employers')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (!employer?.stripe_customer_id) {
    return { success: false as const, error: 'Ingen betalingsinformasjon funnet' }
  }

  const stripeClient2 = getStripeClient()
  const session = await stripeClient2.billingPortal.sessions.create({
    customer: employer.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement`,
  })

  redirect(session.url)
}
