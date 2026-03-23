import { z } from 'zod/v4'

export const seniorRegistrationStep1Schema = z.object({
  navn: z
    .string()
    .min(2, 'Navn må være minst 2 tegn')
    .max(100, 'Navn kan ikke være mer enn 100 tegn'),
  epost: z
    .string()
    .email('Ugyldig e-postadresse'),
  telefon: z
    .string()
    .min(8, 'Telefonnummer må være minst 8 siffer')
    .max(15, 'Telefonnummer kan ikke være mer enn 15 siffer')
    .regex(/^[0-9+\s-]+$/, 'Ugyldig telefonnummer'),
  postnummer: z
    .string()
    .length(4, 'Postnummer må være 4 siffer')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
})

export const seniorRegistrationStep2Schema = z.object({
  sektorer: z
    .array(z.enum([
      'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
      'offentlig_admin', 'finans', 'transport', 'industri',
      'handel', 'annet',
    ]))
    .min(1, 'Velg minst én sektor'),
  kompetanser: z
    .array(z.string().min(1, 'Kompetanse kan ikke være tom'))
    .min(1, 'Legg til minst én kompetanse')
    .max(20, 'Du kan legge til maks 20 kompetanser'),
})

export const seniorRegistrationStep3Schema = z.object({
  bio: z
    .string()
    .min(20, 'Bio må være minst 20 tegn')
    .max(2000, 'Bio kan ikke være mer enn 2000 tegn'),
  tilgjengelig_fra: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ugyldig datoformat (ÅÅÅÅ-MM-DD)')
    .optional(),
  onsket_timer_per_uke: z
    .number()
    .int('Timer per uke må være et heltall')
    .min(1, 'Må være minst 1 time per uke')
    .max(40, 'Kan ikke være mer enn 40 timer per uke')
    .optional(),
})

export const seniorUpdateSchema = z.object({
  navn: z
    .string()
    .min(2, 'Navn må være minst 2 tegn')
    .max(100, 'Navn kan ikke være mer enn 100 tegn')
    .optional(),
  epost: z
    .string()
    .email('Ugyldig e-postadresse')
    .optional(),
  telefon: z
    .string()
    .min(8, 'Telefonnummer må være minst 8 siffer')
    .max(15, 'Telefonnummer kan ikke være mer enn 15 siffer')
    .regex(/^[0-9+\s-]+$/, 'Ugyldig telefonnummer')
    .optional(),
  postnummer: z
    .string()
    .length(4, 'Postnummer må være 4 siffer')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer')
    .optional(),
  bio: z
    .string()
    .min(20, 'Bio må være minst 20 tegn')
    .max(2000, 'Bio kan ikke være mer enn 2000 tegn')
    .optional(),
  sektorer: z
    .array(z.enum([
      'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
      'offentlig_admin', 'finans', 'transport', 'industri',
      'handel', 'annet',
    ]))
    .min(1, 'Velg minst én sektor')
    .optional(),
  kompetanser: z
    .array(z.string().min(1, 'Kompetanse kan ikke være tom'))
    .min(1, 'Legg til minst én kompetanse')
    .max(20, 'Du kan legge til maks 20 kompetanser')
    .optional(),
  tilgjengelig_fra: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ugyldig datoformat (ÅÅÅÅ-MM-DD)')
    .optional(),
  onsket_timer_per_uke: z
    .number()
    .int('Timer per uke må være et heltall')
    .min(1, 'Må være minst 1 time per uke')
    .max(40, 'Kan ikke være mer enn 40 timer per uke')
    .optional(),
  er_aktiv: z.boolean().optional(),
})

export type SeniorRegistrationStep1 = z.infer<typeof seniorRegistrationStep1Schema>
export type SeniorRegistrationStep2 = z.infer<typeof seniorRegistrationStep2Schema>
export type SeniorRegistrationStep3 = z.infer<typeof seniorRegistrationStep3Schema>
export type SeniorUpdate = z.infer<typeof seniorUpdateSchema>
