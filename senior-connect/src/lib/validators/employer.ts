import { z } from 'zod/v4'

export const employerRegistrationSchema = z.object({
  org_nr: z
    .string()
    .length(9, 'Organisasjonsnummer må være 9 siffer')
    .regex(/^\d{9}$/, 'Organisasjonsnummer må bestå av 9 siffer'),
  firmanavn: z
    .string()
    .min(2, 'Firmanavn må være minst 2 tegn')
    .max(200, 'Firmanavn kan ikke være mer enn 200 tegn'),
  kontaktperson: z
    .string()
    .min(2, 'Kontaktperson må være minst 2 tegn')
    .max(100, 'Kontaktperson kan ikke være mer enn 100 tegn'),
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
  sektor: z.enum([
    'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
    'offentlig_admin', 'finans', 'transport', 'industri',
    'handel', 'annet',
  ], { message: 'Velg en gyldig sektor' }),
})

export const employerUpdateSchema = z.object({
  firmanavn: z
    .string()
    .min(2, 'Firmanavn må være minst 2 tegn')
    .max(200, 'Firmanavn kan ikke være mer enn 200 tegn')
    .optional(),
  kontaktperson: z
    .string()
    .min(2, 'Kontaktperson må være minst 2 tegn')
    .max(100, 'Kontaktperson kan ikke være mer enn 100 tegn')
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
  sektor: z.enum([
    'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
    'offentlig_admin', 'finans', 'transport', 'industri',
    'handel', 'annet',
  ], { message: 'Velg en gyldig sektor' }).optional(),
})

export type EmployerRegistration = z.infer<typeof employerRegistrationSchema>
export type EmployerUpdate = z.infer<typeof employerUpdateSchema>
