import { z } from 'zod/v4'

export const createMatchSchema = z.object({
  senior_id: z
    .string()
    .uuid('Ugyldig senior-ID'),
  melding: z
    .string()
    .max(500, 'Meldingen kan ikke være mer enn 500 tegn')
    .optional(),
})

export const updateMatchStatusSchema = z.object({
  match_id: z
    .string()
    .uuid('Ugyldig match-ID'),
  status: z.enum(['accepted', 'rejected'], {
    message: 'Ugyldig status',
  }),
})

export type CreateMatch = z.infer<typeof createMatchSchema>
export type UpdateMatchStatus = z.infer<typeof updateMatchStatusSchema>
