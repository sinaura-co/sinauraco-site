import { z } from 'zod'
// Relative import (not the @/ alias) so this resolves in the node/vitest env,
// which is not configured for tsconfig paths.
import { PROGRAM, SEGMENTS } from '../../content/partner-program'

// Server-side validation contract. The client sends whatever it likes — this is
// the boundary that decides what's real. Every message here is written for a
// human and rendered directly in the form UI, so it must never leak internals.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_SEGMENTS = new Set<string>(SEGMENTS)

export const applicationSchema = z.object({
  fullName: z.string().trim().min(1, 'Enter your full name.').max(200, 'That name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .max(200, 'That email is too long.')
    .regex(EMAIL_RE, 'Enter a valid email address.'),
  contact: z.string().trim().min(1, 'Enter a WhatsApp or Telegram contact.').max(100, 'That contact is too long.'),
  social: z.string().trim().max(200, 'That is too long.').optional().default(''),
  country: z.string().trim().max(100, 'That is too long.').optional().default(''),
  creatorsCount: z.string().trim().max(50).optional().default(''),
  // Never trust the client's option list: every member must be in the allowed set.
  creatorTypes: z
    .array(z.string())
    .max(SEGMENTS.length, 'Too many selections.')
    .refine(
      (arr) => arr.every((v) => ALLOWED_SEGMENTS.has(v)),
      'One or more selected creator types are not recognized.',
    )
    .optional()
    .default([]),
  audienceSize: z.string().trim().max(50).optional().default(''),
  aboutNetwork: z
    .string()
    .trim()
    .max(PROGRAM.aboutMaxLength, `Keep this under ${PROGRAM.aboutMaxLength} characters.`)
    .optional()
    .default(''),
  sessionId: z.string().trim().max(120).optional().default(''),
  utm: z.record(z.string(), z.string()).optional().default({}),
})

export type ApplicationParsed = z.infer<typeof applicationSchema>

export type ValidationResult =
  | { ok: true; data: ApplicationParsed }
  | { ok: false; error: string }

// Returns the first human-safe message. zod's own type errors (which start with
// "Invalid …") are replaced by a generic line so no schema detail reaches the UI.
export function validateApplication(raw: unknown): ValidationResult {
  const result = applicationSchema.safeParse(raw)
  if (result.success) return { ok: true, data: result.data }
  const first = result.error.issues[0]
  const message =
    first?.message && !first.message.startsWith('Invalid')
      ? first.message
      : 'Please check the form and try again.'
  return { ok: false, error: message }
}
