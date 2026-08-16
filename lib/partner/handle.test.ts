import { describe, it, expect, beforeEach } from 'vitest'
import { handleApplication, type HandleDeps } from './handle'
import { validateApplication } from './schema'
import { sanitizeApplication } from './sanitize'
import { rateLimit, __resetRateLimit } from './ratelimit'
import type { ApplicationRecord, RequestMeta } from './types'

const META: RequestMeta = { ip: '1.2.3.4', userAgent: 'ua', referer: '', utm: {} }

const validBody = () => ({
  fullName: 'Jordan Lee',
  email: 'Jordan@Example.com',
  contact: '@jordan_tg',
  social: '@jordan',
  country: 'US',
  creatorsCount: '2–5 creators',
  creatorTypes: ['Fitness', 'Fashion'],
  audienceSize: '50K–100K',
  aboutNetwork: 'A few fitness creators looking to scale.',
  sessionId: 'sess-1',
})

function makeDeps(over: Partial<HandleDeps> = {}) {
  const persisted: ApplicationRecord[] = []
  const notified: ApplicationRecord[] = []
  const deps: HandleDeps = {
    rateLimit: () => true,
    persist: async (r) => {
      persisted.push(r)
    },
    notify: async (r) => {
      notified.push(r)
    },
    now: () => 1_700_000_000_000,
    log: () => {},
    ...over,
  }
  return { deps, persisted, notified }
}

describe('handleApplication — happy path', () => {
  it('persists a normalized record and returns 200', async () => {
    const { deps, persisted, notified } = makeDeps()
    const res = await handleApplication(validBody(), META, deps)
    expect(res).toEqual({ status: 200, body: { ok: true } })
    expect(persisted).toHaveLength(1)
    expect(notified).toHaveLength(1)
    const rec = persisted[0]
    expect(rec.email).toBe('jordan@example.com') // lowercased + trimmed
    expect(rec.status).toBe('new')
    expect(rec.ip).toBe('1.2.3.4')
    expect(rec.createdAt).toBe(new Date(1_700_000_000_000).toISOString())
    expect(rec.creatorTypes).toEqual(['Fitness', 'Fashion'])
  })
})

describe('handleApplication — validation (each → 400 with a human message)', () => {
  it('rejects a missing required field', async () => {
    const { deps, persisted } = makeDeps()
    const res = await handleApplication({ ...validBody(), fullName: '' }, META, deps)
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Enter your full name.')
    expect(persisted).toHaveLength(0)
  })

  it('rejects a malformed email', async () => {
    const { deps } = makeDeps()
    const res = await handleApplication({ ...validBody(), email: 'not-an-email' }, META, deps)
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Enter a valid email address.')
  })

  it('rejects an over-length aboutNetwork', async () => {
    const { deps } = makeDeps()
    const res = await handleApplication({ ...validBody(), aboutNetwork: 'x'.repeat(2001) }, META, deps)
    expect(res.status).toBe(400)
    expect(String(res.body.error)).toMatch(/under 2000 characters/)
  })

  it('rejects a creatorTypes value outside the allowed set', async () => {
    const { deps, persisted } = makeDeps()
    const res = await handleApplication(
      { ...validBody(), creatorTypes: ['Fitness', 'Crypto Scams'] },
      META,
      deps,
    )
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('One or more selected creator types are not recognized.')
    expect(persisted).toHaveLength(0)
  })
})

describe('handleApplication — honeypot', () => {
  it('returns a benign 200 and persists nothing when the honeypot is filled', async () => {
    const { deps, persisted, notified } = makeDeps()
    const res = await handleApplication({ ...validBody(), _b8x2k: 'i am a bot' }, META, deps)
    expect(res).toEqual({ status: 200, body: { ok: true } })
    expect(persisted).toHaveLength(0)
    expect(notified).toHaveLength(0)
  })
})

describe('handleApplication — rate limit', () => {
  it('returns 429 when the limiter rejects', async () => {
    const { deps, persisted } = makeDeps({ rateLimit: () => false })
    const res = await handleApplication(validBody(), META, deps)
    expect(res.status).toBe(429)
    expect(res.body.error).toMatch(/too many requests/i)
    expect(persisted).toHaveLength(0)
  })
})

describe('handleApplication — resilience', () => {
  it('still returns 200 (and keeps the record) when notify throws', async () => {
    const { deps, persisted } = makeDeps({
      notify: async () => {
        throw new Error('resend down')
      },
    })
    const res = await handleApplication(validBody(), META, deps)
    expect(res.status).toBe(200)
    expect(persisted).toHaveLength(1)
  })

  it('returns 500 when persistence throws (nothing silently lost)', async () => {
    const { deps } = makeDeps({
      persist: async () => {
        throw new Error('notion down')
      },
    })
    const res = await handleApplication(validBody(), META, deps)
    expect(res.status).toBe(500)
    expect(res.body.error).toBeTruthy()
  })
})

describe('rateLimit (real, in-memory)', () => {
  beforeEach(() => __resetRateLimit())

  it('allows 5 per hour then blocks the 6th', () => {
    const now = 1_700_000_000_000
    const ip = '9.9.9.9'
    for (let i = 0; i < 5; i++) expect(rateLimit(ip, now)).toBe(true)
    expect(rateLimit(ip, now)).toBe(false)
  })

  it('frees up after the window passes', () => {
    const ip = '8.8.8.8'
    const base = 1_700_000_000_000
    for (let i = 0; i < 5; i++) rateLimit(ip, base)
    expect(rateLimit(ip, base)).toBe(false)
    expect(rateLimit(ip, base + 60 * 60 * 1000 + 1)).toBe(true) // one hour later
  })
})

describe('schema + sanitize units', () => {
  it('defaults optional fields and coerces types', () => {
    const parsed = validateApplication({ fullName: 'A', email: 'a@b.co', contact: 'x' })
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      expect(parsed.data.creatorTypes).toEqual([])
      expect(parsed.data.social).toBe('')
    }
  })

  it('strips control characters while keeping newlines', () => {
    const parsed = validateApplication({
      fullName: 'A',
      email: 'a@b.co',
      contact: 'x',
      aboutNetwork: 'line1\nline2\x00\x07bad',
    })
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      const clean = sanitizeApplication(parsed.data)
      expect(clean.aboutNetwork).toBe('line1\nline2bad')
    }
  })
})
