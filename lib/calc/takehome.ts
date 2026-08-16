// "What you keep" calculator — pure math, formatting, and URL state. No React,
// no DOM: everything here is unit-tested in the node env (lib/**/*.test.ts).
//
// The honest reframe of an earnings estimator: instead of multiplying a user's
// numbers by an invented growth factor, this computes real arithmetic on the
// creator's OWN gross at a management rate THEY enter. No fabricated statistic,
// no projection — so it clears both the site's no-unsourced-numbers rule and the
// FTC earnings-claim line. The rate is a user input, so no Sinaura rate ships.

export const SCALE = 1000

// Gross-earnings domain for the logarithmic primary slider (USD / month).
export const GROSS_MIN = 100
export const GROSS_MAX = 100_000
export const GROSS_DEFAULT = 2_500

// Management-rate domain for the linear secondary slider (percent).
export const RATE_MIN = 0
export const RATE_MAX = 50
export const RATE_STEP = 5
export const RATE_DEFAULT = 20

export type Period = 'month' | 'year'
export const PERIOD_DEFAULT: Period = 'month'

// ── logarithmic mapping ──────────────────────────────────────────────────────
// The primary slider renders a normalized 0–SCALE track and maps to/from real
// gross values on a log scale, so an $800 creator and a $50k creator both get
// usable travel. min must be > 0. Track midpoint lands on the geometric mean of
// [min, max], not the arithmetic mean — that is the whole point of the log map.
export function toPos(value: number, min: number, max: number): number {
  return (Math.log(value / min) / Math.log(max / min)) * SCALE
}

export function toVal(pos: number, min: number, max: number): number {
  return Math.round(min * Math.pow(max / min, pos / SCALE))
}

// ── the honest math ──────────────────────────────────────────────────────────
export interface TakeHome {
  gross: number // per month, as entered
  ratePct: number // 0–100
  fee: number // management fee, per selected period
  keep: number // take-home, per selected period
  keepPct: number // 0–100
  period: Period
}

// take-home = gross − management fee; fee = gross × rate. One multiply, one
// subtract, scaled by 12 for the annual view. No growth factor, no compounding.
export function computeTakeHome(grossMonthly: number, ratePct: number, period: Period): TakeHome {
  const months = period === 'year' ? 12 : 1
  const boundedRate = clamp(ratePct, 0, 100)
  const rate = boundedRate / 100
  const grossPeriod = grossMonthly * months
  const fee = grossPeriod * rate
  const keep = grossPeriod - fee
  return { gross: grossMonthly, ratePct: boundedRate, fee, keep, keepPct: 100 - boundedRate, period }
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

// ── formatters ───────────────────────────────────────────────────────────────
// Compact currency for slider axis labels ($2.5k, $1.2M). Implemented to the
// spec exactly (strict > boundaries and all) and unit-tested at the edges.
export function formatCurrency(n: number): string {
  if (n > 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n > 1_000) return `$${(n / 1_000).toFixed(0)}k`
  return `$${Math.round(n)}`
}

// Exact currency for the RESULT. Take-home is a real figure the creator entered,
// so it shows in full ($2,000, not "$2k"). Deliberate deviation from the compact
// formatter, which stays on the axis labels where lossy rounding reads fine.
export function formatCurrencyExact(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

// Compact non-currency value (spec deliverable: 2.5k / 840). The gross slider
// readout uses formatCurrencyExact instead — its value is money and must match
// the result exactly — but this stays exported and tested per the spec.
export const formatCompact = (v: number): string =>
  v > 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)

// ── URL state ────────────────────────────────────────────────────────────────
// Shareable, not persisted. Query keys: g=gross, r=rate, p=period. Invalid or
// missing values fall back to the default field by field — a malformed param
// never throws and never wipes the other two.
export interface CalcState {
  gross: number
  ratePct: number
  period: Period
}

export const DEFAULT_STATE: CalcState = {
  gross: GROSS_DEFAULT,
  ratePct: RATE_DEFAULT,
  period: PERIOD_DEFAULT,
}

export function parseState(query: string | URLSearchParams): CalcState {
  const params = typeof query === 'string' ? new URLSearchParams(query) : query
  const p = params.get('p')
  return {
    gross: clampToDomain(toNum(params.get('g')), GROSS_MIN, GROSS_MAX, GROSS_DEFAULT),
    ratePct: snapRate(toNum(params.get('r'))),
    period: p === 'year' ? 'year' : p === 'month' ? 'month' : PERIOD_DEFAULT,
  }
}

export function toQuery(state: CalcState): string {
  return new URLSearchParams({
    g: String(state.gross),
    r: String(state.ratePct),
    p: state.period,
  }).toString()
}

function toNum(raw: string | null): number | null {
  if (raw == null || raw.trim() === '') return null
  const n = Number(raw)
  return Number.isFinite(n) ? n : null
}

function clampToDomain(n: number | null, min: number, max: number, fallback: number): number {
  if (n == null) return fallback
  return Math.round(clamp(n, min, max))
}

function snapRate(n: number | null): number {
  if (n == null) return RATE_DEFAULT
  return Math.round(clamp(n, RATE_MIN, RATE_MAX) / RATE_STEP) * RATE_STEP
}
