import { validateApplication } from './schema'
import { sanitizeApplication } from './sanitize'
import type { ApplicationRecord, RequestMeta } from './types'

// The pure application pipeline. All side effects (rate-limit store, persistence,
// email, clock, logging) are injected, so the whole thing unit-tests in node with
// zero network. The route handler is a thin wrapper that supplies the real deps.
//
// Pipeline order (do not reorder): honeypot → rate-limit → validate → sanitize →
// persist → notify → 200.

export interface HandleDeps {
  rateLimit: (ip: string, now: number) => boolean // true = allowed
  persist: (record: ApplicationRecord) => Promise<void> // throws on real failure
  notify: (record: ApplicationRecord) => Promise<void> // best-effort; may throw
  now: () => number
  log: (message: string, error?: unknown) => void
}

export interface HandleResult {
  status: number
  body: Record<string, unknown>
}

function readHoneypot(raw: unknown): string {
  if (raw && typeof raw === 'object' && '_b8x2k' in raw) {
    const value = (raw as Record<string, unknown>)._b8x2k
    return typeof value === 'string' ? value : ''
  }
  return ''
}

export async function handleApplication(
  raw: unknown,
  meta: RequestMeta,
  deps: HandleDeps,
): Promise<HandleResult> {
  // Honeypot: a filled hidden field means a bot. Return a benign 200 and discard
  // silently — never signal failure, never persist.
  if (readHoneypot(raw).trim() !== '') {
    return { status: 200, body: { ok: true } }
  }

  const now = deps.now()

  // Rate limit per IP.
  if (!deps.rateLimit(meta.ip, now)) {
    return { status: 429, body: { error: 'Too many requests. Please try again later.' } }
  }

  // Validate — the client-rendered error must be human-safe (schema guarantees it).
  const parsed = validateApplication(raw)
  if (!parsed.ok) {
    return { status: 400, body: { error: parsed.error } }
  }

  // Sanitize + assemble the record with server-side metadata.
  const clean = sanitizeApplication(parsed.data)
  const record: ApplicationRecord = {
    fullName: clean.fullName,
    email: clean.email,
    contact: clean.contact,
    social: clean.social,
    country: clean.country,
    creatorsCount: clean.creatorsCount,
    creatorTypes: clean.creatorTypes,
    audienceSize: clean.audienceSize,
    aboutNetwork: clean.aboutNetwork,
    sessionId: clean.sessionId,
    ip: meta.ip,
    userAgent: meta.userAgent,
    referer: meta.referer,
    utm: { ...meta.utm, ...clean.utm },
    createdAt: new Date(now).toISOString(),
    status: 'new',
  }

  // Persist — the primary durable record. A failure here is worth a retry.
  try {
    await deps.persist(record)
  } catch (error) {
    deps.log('partner-application: persist failed', error)
    return {
      status: 500,
      body: { error: 'Something went wrong saving your application. Please try again.' },
    }
  }

  // Notify (team + applicant) — best-effort. A failure must never fail the request
  // or lose the already-saved record.
  try {
    await deps.notify(record)
  } catch (error) {
    deps.log('partner-application: notify failed (record was saved)', error)
  }

  return { status: 200, body: { ok: true } }
}
