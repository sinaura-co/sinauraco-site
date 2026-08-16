import { describe, it, expect } from 'vitest'
import {
  toPos,
  toVal,
  computeTakeHome,
  formatCurrency,
  formatCurrencyExact,
  formatCompact,
  parseState,
  toQuery,
  clamp,
  GROSS_MIN,
  GROSS_MAX,
  DEFAULT_STATE,
  type CalcState,
} from './takehome'

describe('log slider mapping', () => {
  it('round-trips toVal(toPos(v)) ≈ v across the domain', () => {
    for (const v of [100, 250, 500, 1_000, 2_500, 10_000, 50_000, 100_000]) {
      const rt = toVal(toPos(v, GROSS_MIN, GROSS_MAX), GROSS_MIN, GROSS_MAX)
      expect(Math.abs(rt - v)).toBeLessThanOrEqual(Math.max(1, v * 0.005))
    }
  })

  it('maps the track midpoint (pos = 500) to the geometric mean of [min, max]', () => {
    const geoMean = Math.sqrt(GROSS_MIN * GROSS_MAX) // √(100 · 100000) = 3162.27…
    const mid = toVal(500, GROSS_MIN, GROSS_MAX)
    expect(mid).toBe(3162)
    expect(Math.abs(mid - geoMean)).toBeLessThanOrEqual(1)
  })

  it('anchors the endpoints', () => {
    expect(toVal(0, GROSS_MIN, GROSS_MAX)).toBe(GROSS_MIN)
    expect(toVal(1000, GROSS_MIN, GROSS_MAX)).toBe(GROSS_MAX)
  })
})

describe('formatCurrency (compact axis labels)', () => {
  it('formats the spec cases', () => {
    expect(formatCurrency(800)).toBe('$800')
    expect(formatCurrency(10_500)).toBe('$11k') // toFixed(0) rounds the .5 up
    expect(formatCurrency(1_200_000)).toBe('$1.2M')
  })

  it('honours the strict > boundaries exactly', () => {
    // 1000 is NOT > 1000 → falls through to the plain branch
    expect(formatCurrency(1_000)).toBe('$1000')
    // 1_000_000 is NOT > 1_000_000 → falls to the "k" branch
    expect(formatCurrency(1_000_000)).toBe('$1000k')
    expect(formatCurrency(1_001)).toBe('$1k')
  })
})

describe('formatCurrencyExact (result) & formatCompact', () => {
  it('shows the result in full with grouping', () => {
    expect(formatCurrencyExact(2_000)).toBe('$2,000')
    expect(formatCurrencyExact(24_000)).toBe('$24,000')
    expect(formatCurrencyExact(0)).toBe('$0')
  })

  it('formatCompact matches the spec', () => {
    expect(formatCompact(2_500)).toBe('2.5k')
    expect(formatCompact(840)).toBe('840')
  })
})

describe('computeTakeHome (the honest math)', () => {
  it('subtracts the fee for the monthly view', () => {
    const r = computeTakeHome(2_500, 20, 'month')
    expect(r.fee).toBe(500)
    expect(r.keep).toBe(2_000)
    expect(r.keepPct).toBe(80)
  })

  it('scales by 12 for the annual view', () => {
    const r = computeTakeHome(2_500, 20, 'year')
    expect(r.fee).toBe(6_000)
    expect(r.keep).toBe(24_000)
    expect(r.keepPct).toBe(80) // percentage is period-independent
  })

  it('handles the 0% and 50% edges', () => {
    expect(computeTakeHome(1_000, 0, 'month').keep).toBe(1_000)
    expect(computeTakeHome(1_000, 50, 'month')).toMatchObject({ fee: 500, keep: 500, keepPct: 50 })
  })

  it('clamps an out-of-range rate rather than going negative', () => {
    const r = computeTakeHome(1_000, 120, 'month')
    expect(r.ratePct).toBe(100)
    expect(r.keep).toBe(0)
    expect(r.keepPct).toBe(0)
  })
})

describe('clamp', () => {
  it('bounds both ends', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-3, 0, 10)).toBe(0)
    expect(clamp(99, 0, 10)).toBe(10)
  })
})

describe('URL state hydration', () => {
  it('reads valid params', () => {
    expect(parseState('g=2500&r=20&p=year')).toEqual({ gross: 2_500, ratePct: 20, period: 'year' })
  })

  it('falls back to defaults when absent', () => {
    expect(parseState('')).toEqual(DEFAULT_STATE)
  })

  it('recovers field-by-field from malformed params', () => {
    // g invalid → default; r out of range → clamped+snapped to 50; p invalid → default month
    expect(parseState('g=abc&r=999&p=foo')).toEqual({ gross: 2_500, ratePct: 50, period: 'month' })
  })

  it('clamps and snaps in-range-but-off-grid values', () => {
    // gross below min → 100; rate 7 snaps to nearest step of 5 → 5
    expect(parseState('g=50&r=7&p=year')).toEqual({ gross: 100, ratePct: 5, period: 'year' })
    // gross above max → 100000
    expect(parseState('g=250000').gross).toBe(GROSS_MAX)
  })

  it('round-trips through toQuery', () => {
    const state: CalcState = { gross: 7_400, ratePct: 25, period: 'year' }
    expect(parseState(toQuery(state))).toEqual(state)
    expect(toQuery(DEFAULT_STATE)).toBe('g=2500&r=20&p=month')
  })
})
