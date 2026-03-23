import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function handleWebhookEvent(event: Stripe.Event) {
  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.customer && session.subscription) {
        await supabase
          .from('employers')
          .update({
            stripe_customer_id: session.customer as string,
            subscription_id: session.subscription as string,
            subscription_status: 'active',
            kontakter_maks_per_mnd: 20,
          })
          .eq('user_id', session.metadata?.user_id ?? '')
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const status = subscription.status === 'active' ? 'active'
        : subscription.status === 'past_due' ? 'past_due'
        : 'canceled'
      await supabase
        .from('employers')
        .update({ subscription_status: status })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from('employers')
        .update({
          subscription_status: 'canceled',
          kontakter_maks_per_mnd: 0,
        })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      if (invoice.customer) {
        await supabase
          .from('employers')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', invoice.customer as string)
      }
      break
    }
  }
}
