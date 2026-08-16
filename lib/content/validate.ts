import { frontmatterSchema } from './schema'
import {
  BRAND_SUFFIX,
  DESCRIPTION_MIN,
  DESCRIPTION_MAX,
  TITLE_MAX,
  STATISTIC_RE,
  ORGANIZATION_AUTHOR,
} from './constants'

// A doc as read from disk, before zod parsing. Kept fs-free so these rules are
// unit-testable with hand-built inputs.
export type RawDoc = {
  file: string
  data: Record<string, unknown>
  body: string
}

export type Violation = {
  rule: string
  level: 'error' | 'warn'
  file: string
  message: string
}

type Options = {
  authorSlugs?: Set<string>
  now?: Date
}

// Narrowed view of a doc's fields that the graph rules read, tolerant of docs
// that failed structural validation (so we still report their graph problems).
type Lite = {
  file: string
  slug: string
  type: string
  parentHub?: string
  relatedSpokes: string[]
  body: string
  sourcesCount: number
  description: string
  title: string
  nextReview?: string
}

function toLite(d: RawDoc): Lite {
  const s = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)
  return {
    file: d.file,
    slug: s(d.data.slug) ?? '',
    type: s(d.data.type) ?? '',
    parentHub: s(d.data.parentHub),
    relatedSpokes: Array.isArray(d.data.relatedSpokes)
      ? (d.data.relatedSpokes.filter((x) => typeof x === 'string') as string[])
      : [],
    body: d.body,
    sourcesCount: Array.isArray(d.data.sources) ? d.data.sources.length : 0,
    description: s(d.data.description) ?? '',
    title: s(d.data.title) ?? '',
    nextReview: s(d.data.nextReview),
  }
}

// Runs the full validation suite over already-read docs. Returns every
// violation; the caller decides how to surface them (the build script fails on
// any `error`). This is the mechanical enforcement of BUILD_SPEC §4.2 + §5.3.
export function validateDocs(docs: RawDoc[], opts: Options = {}): Violation[] {
  const authorSlugs = opts.authorSlugs ?? new Set<string>()
  const now = opts.now ?? new Date()
  const out: Violation[] = []
  const push = (rule: string, level: 'error' | 'warn', file: string, message: string) =>
    out.push({ rule, level, file, message })

  // Structural: the frontmatter contract itself.
  for (const d of docs) {
    const parsed = frontmatterSchema.safeParse(d.data)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path.join('.') || '(root)'
        push('schema', 'error', d.file, `${path}: ${issue.message}`)
      }
    }
  }

  const lite = docs.map(toLite)

  // Unique slugs — the whole graph keys off slug.
  const bySlug = new Map<string, Lite>()
  for (const l of lite) {
    if (!l.slug) continue
    if (bySlug.has(l.slug)) push('slug-unique', 'error', l.file, `duplicate slug "${l.slug}"`)
    else bySlug.set(l.slug, l)
  }

  // Rule 1 — description within the SERP-safe window.
  for (const l of lite) {
    if (!l.description) continue
    const len = l.description.length
    if (len < DESCRIPTION_MIN || len > DESCRIPTION_MAX)
      push('1-description-length', 'error', l.file, `description is ${len} chars; must be ${DESCRIPTION_MIN}–${DESCRIPTION_MAX}`)
  }

  // Rule 2 — rendered <title> (with brand suffix) fits.
  for (const l of lite) {
    if (!l.title) continue
    const rendered = l.title.includes(BRAND_SUFFIX) ? l.title : `${l.title}${BRAND_SUFFIX}`
    if (rendered.length > TITLE_MAX)
      push('2-title-length', 'error', l.file, `rendered <title> is ${rendered.length} chars; must be ≤ ${TITLE_MAX}`)
  }

  // Rule 3 — brand suffix is appended exactly once (never authored in).
  for (const l of lite) {
    if (l.title && l.title.includes(BRAND_SUFFIX))
      push('3-brand-suffix', 'error', l.file, 'title already contains the brand suffix; it is appended automatically')
  }

  // Rule 4 — author resolves to a real author file or the literal organization.
  for (const d of docs) {
    const a = d.data.author
    if (a === undefined) continue // schema defaults to organization
    if (typeof a !== 'string' || a.trim() === '') {
      push('4-author', 'error', d.file, 'author must not be blank')
      continue
    }
    if (a !== ORGANIZATION_AUTHOR && !authorSlugs.has(a))
      push('4-author', 'error', d.file, `author "${a}" does not resolve to /content/authors or the literal "${ORGANIZATION_AUTHOR}"`)
  }

  // Rule 5 — a statistic anywhere in the body demands a source. The single most
  // important rule in the build (BUILD_SPEC §8, Amendment 01 §2.5).
  for (const l of lite) {
    if (STATISTIC_RE.test(l.body) && l.sourcesCount === 0)
      push('5-statistic-sources', 'error', l.file, 'body contains a statistic (%/$/x) but the sources array is empty')
  }

  // Rule 6 — bidirectional hub <-> spoke linking.
  const hubs = lite.filter((l) => l.type === 'hub')
  const hubBySlug = new Map(hubs.map((h) => [h.slug, h]))
  for (const s of lite) {
    if (s.type === 'hub' || !s.parentHub) continue
    const parent = hubBySlug.get(s.parentHub)
    if (!parent) {
      push('6-linking', 'error', s.file, `parentHub "${s.parentHub}" does not match any hub`)
      continue
    }
    if (!parent.relatedSpokes.includes(s.slug))
      push('6-linking', 'error', s.file, `hub "${parent.slug}" does not list this spoke ("${s.slug}") in relatedSpokes`)
  }
  for (const h of hubs) {
    for (const rs of h.relatedSpokes) {
      const spoke = bySlug.get(rs)
      if (!spoke) {
        push('6-linking', 'error', h.file, `relatedSpokes entry "${rs}" does not resolve to a doc`)
        continue
      }
      if (spoke.parentHub !== h.slug)
        push('6-linking', 'error', h.file, `spoke "${rs}" does not point back via parentHub`)
    }
  }

  // Orphan check — any non-hub URL with zero inbound internal links. Hubs are
  // reachable from the /resources index and are exempt.
  const referenced = new Set<string>()
  for (const l of lite) {
    for (const rs of l.relatedSpokes) referenced.add(rs)
    if (l.parentHub) referenced.add(l.parentHub)
    for (const other of lite) {
      if (other.slug && other.slug !== l.slug && l.body.includes(other.slug)) referenced.add(other.slug)
    }
  }
  for (const l of lite) {
    if (!l.slug || l.type === 'hub') continue
    if (!referenced.has(l.slug))
      push('orphan', 'error', l.file, `"${l.slug}" has zero inbound internal links (orphan)`)
  }

  // Rule 7 — nextReview should be in the future (warn, do not fail).
  for (const l of lite) {
    if (!l.nextReview) continue
    const t = Date.parse(l.nextReview)
    if (!Number.isNaN(t) && t < now.getTime())
      push('7-next-review', 'warn', l.file, `nextReview (${l.nextReview}) is in the past`)
  }

  return out
}
