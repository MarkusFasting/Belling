import { getEmployerProfile } from '@/actions/employer'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PLANS } from '@/lib/stripe/config'
import { formatCurrency } from '@/lib/utils/helpers'
import { getStripeClient } from '@/lib/stripe/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function createCheckoutSession() {
  'use server'

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: employer } = await supabase
    .from('employers')
    .select('id, stripe_customer_id, epost')
    .eq('user_id', user.id)
    .single()

  if (!employer) return

  let customerId = employer.stripe_customer_id

  if (!customerId) {
    const customer = await getStripeClient().customers.create({
      email: employer.epost,
      metadata: { employer_id: employer.id },
    })
    customerId = customer.id

    await supabase
      .from('employers')
      .update({ stripe_customer_id: customerId })
      .eq('id', employer.id)
  }

  const session = await getStripeClient().checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PLANS.pro.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement?status=canceled`,
    metadata: { employer_id: employer.id },
  })

  if (session.url) {
    redirect(session.url)
  }
}

async function createPortalSession() {
  'use server'

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: employer } = await supabase
    .from('employers')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (!employer?.stripe_customer_id) return

  const session = await getStripeClient().billingPortal.sessions.create({
    customer: employer.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/arbeidsgiver/abonnement`,
  })

  redirect(session.url)
}

export default async function ArbeidsgiverAbonnementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const employer = await getEmployerProfile()
  if (!employer) {
    redirect('/registrer/arbeidsgiver')
  }

  const params = await searchParams
  const status = typeof params.status === 'string' ? params.status : undefined

  const plan = PLANS.pro
  const hasActiveSubscription = employer.subscription_status === 'active'

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Abonnement</h1>
        <p className="text-muted-foreground">
          Administrer ditt Senior Connect-abonnement
        </p>
      </div>

      {status === 'success' && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Abonnementet ditt er aktivert! Du kan nå kontakte seniorer.
        </div>
      )}

      {status === 'canceled' && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          Betaling ble avbrutt. Du kan prøve igjen når som helst.
        </div>
      )}

      {hasActiveSubscription ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                <Badge variant="default">Aktivt</Badge>
              </div>
              <CardDescription>
                {formatCurrency(plan.price)}/mnd
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kontakter denne måneden</span>
                  <span className="text-sm">
                    {employer.kontakter_brukt_denne_mnd} / {employer.kontakter_maks_per_mnd}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted-foreground/20">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(
                        (employer.kontakter_brukt_denne_mnd / employer.kontakter_maks_per_mnd) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <form action={createPortalSession}>
                <Button variant="outline" type="submit">
                  Administrer abonnement
                </Button>
              </form>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              Alt du trenger for å finne erfarne seniorer til din bedrift
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">
                {formatCurrency(plan.price)}
              </p>
              <p className="text-sm text-muted-foreground">per måned</p>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <form action={async () => { 'use server'; await createCheckoutSession() }} className="w-full">
              <Button type="submit" className="w-full" size="lg">
                Start abonnement
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
