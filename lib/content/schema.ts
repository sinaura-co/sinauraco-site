import { z } from 'zod'
import { HUBS, DOC_TYPES, ORGANIZATION_AUTHOR } from './constants'

// A URL that must parse as absolute. Avoids zod's deprecated `.url()` in v4.
const urlString = z.string().refine((s) => {
  try {
    // eslint-disable-next-line no-new
    new URL(s)
    return true
  } catch {
    return false
  }
}, 'must be a valid absolute URL')

// An ISO 8601 date string. YAML auto-parses an unquoted date (2026-08-14) into a
// JS Date, so normalize that back to a 'YYYY-MM-DD' string before validating —
// authors can write the date quoted or not and it behaves the same.
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'must be an ISO 8601 date'),
)

export const sourceSchema = z.object({
  label: z.string().min(1),
  url: urlString,
  accessed: isoDate,
})

export const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
})

// The frontmatter contract (BUILD_SPEC §4.1, as amended by Amendment 01 §2.4).
// Structure and presence are enforced here; the seven business rules
// (lengths, link graph, statistic sourcing) live in ./validate so every
// violation is collected and reported together rather than throwing on the
// first failure.
export const frontmatterSchema = z.object({
  title: z.string().min(1),
  h1: z.string().min(1).optional(),
  // Optional 40–70 word direct answer, rendered before the body and reused as
  // the AI summary meta (BUILD_SPEC §5.2 #3, §10.3).
  shortAnswer: z.string().min(1).optional(),
  description: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a kebab-case slug'),
  hub: z.enum(HUBS),
  type: z.enum(DOC_TYPES),
  // Accepts the literal "organization" (default) or an author slug that must
  // resolve to /content/authors. Never blank, never a free-text name.
  author: z.string().min(1).default(ORGANIZATION_AUTHOR),
  datePublished: isoDate,
  dateModified: isoDate,
  nextReview: isoDate,
  sources: z.array(sourceSchema).default([]),
  faqs: z.array(faqSchema).default([]),
  relatedSpokes: z.array(z.string()).default([]),
  parentHub: z.string().min(1).optional(),
  gated: z.boolean().default(false),
})

export type Frontmatter = z.infer<typeof frontmatterSchema>
export type Source = z.infer<typeof sourceSchema>
export type Faq = z.infer<typeof faqSchema>
