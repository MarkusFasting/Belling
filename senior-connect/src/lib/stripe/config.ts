export const PLANS = {
  pro: {
    name: 'Senior Connect Pro',
    price: 1990, // NOK per month
    priceId: process.env.STRIPE_PRICE_ID!,
    contactsPerMonth: 20,
    features: [
      'Se fulle seniorprofiler',
      'Inntil 20 kontakter per måned',
      'Direkte kontaktinformasjon',
      'E-postvarsler ved nye seniorer',
    ],
  },
} as const
