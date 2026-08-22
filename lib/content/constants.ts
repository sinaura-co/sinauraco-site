// Shared constants for the content pipeline. Imported by the zod schema, the
// build-time validators, and the tests — one source of truth so a rule can
// never drift between where it is declared and where it is enforced.

// The six hubs (BUILD_SPEC §5.1; content-ops added per CONTENT_TOPIC_MAP §5).
// A doc's `hub` is its cluster membership.
export const HUBS = [
  'agency-selection',
  'pricing',
  'getting-started',
  'compliance',
  'growth',
  'content-ops',
] as const

export type HubSlug = (typeof HUBS)[number]

// Document kinds (BUILD_SPEC §4.1 `type`).
export const DOC_TYPES = ['hub', 'guide', 'tool', 'reference'] as const
export type DocType = (typeof DOC_TYPES)[number]

// The brand suffix is appended to <title> exactly once (§4.2 rules 2–3). The
// visible brand — "Sinaura Collectives", not the legal name — carries it.
export const BRAND_SUFFIX = ' | Sinaura Collectives'

// SERP-safe meta description window (§4.2 rule 1).
export const DESCRIPTION_MIN = 140
export const DESCRIPTION_MAX = 158

// Rendered <title> ceiling including the brand suffix (§4.2 rule 2).
export const TITLE_MAX = 60

// A "statistic" is any percentage, dollar figure, or multiplier (§4.2 rule 5,
// §8.1). Any body matching this must carry a non-empty `sources` array.
export const STATISTIC_RE = /\d+%|\$[\d,]+|\b\d+x\b/

// The literal author value for the organization-attribution model
// (Amendment 01 §2). There is no Person node anywhere on the site.
export const ORGANIZATION_AUTHOR = 'organization'
