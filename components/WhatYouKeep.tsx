'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  SCALE,
  GROSS_MIN,
  GROSS_MAX,
  RATE_MIN,
  RATE_MAX,
  RATE_STEP,
  DEFAULT_STATE,
  type CalcState,
  type Period,
  toPos,
  toVal,
  computeTakeHome,
  formatCurrencyExact,
  parseState,
  toQuery,
} from '@/lib/calc/takehome'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { track } from '@/lib/analytics'

const CTA_HREF = '/apply'
const DEBOUNCE_MS = 400
const LIVE_DEBOUNCE_MS = 500

// ── the interactive "what you keep" calculator ───────────────────────────────
// Renders the two-column controls + result grid. The section heading/eyebrow are
// owned by the /services page in its own type system; this component is the
// interactive interior, self-contained for all state, math, a11y, and analytics.
export function WhatYouKeep() {
  const [state, setState] = useState<CalcState>(DEFAULT_STATE)
  const [hasInteracted, setHasInteracted] = useState(false)
  const firstEventSent = useRef(false)

  // Hydrate from the URL once, after mount (SSR renders defaults; no mismatch
  // because the first client paint keeps defaults until this effect runs).
  useEffect(() => {
    setState(parseState(window.location.search))
  }, [])

  const result = useMemo(
    () => computeTakeHome(state.gross, state.ratePct, state.period),
    [state],
  )
  const keep = useCountUp(result.keep)

  // Any edit: fire first-interaction once (immediately), then merge the patch.
  const update = useCallback((patch: Partial<CalcState>) => {
    if (!firstEventSent.current) {
      firstEventSent.current = true
      track('calculator_first_interaction')
    }
    setHasInteracted(true)
    setState((s) => ({ ...s, ...patch }))
  }, [])

  // Debounced: shareable URL (replaceState — never push, so the back button is
  // left alone) + the input_changed event. Only after a real interaction, so a
  // plain page view never rewrites the URL.
  useEffect(() => {
    if (!hasInteracted) return
    const h = setTimeout(() => {
      const r = computeTakeHome(state.gross, state.ratePct, state.period)
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}?${toQuery(state)}${window.location.hash}`,
      )
      track('calculator_input_changed', {
        gross: state.gross,
        rate: state.ratePct,
        period: state.period,
        keep: Math.round(r.keep),
      })
    }, DEBOUNCE_MS)
    return () => clearTimeout(h)
  }, [state, hasInteracted])

  // Debounced screen-reader announcement — dragging must not spam the live region.
  const [liveMsg, setLiveMsg] = useState('')
  useEffect(() => {
    const h = setTimeout(() => {
      setLiveMsg(
        `You keep ${formatCurrencyExact(result.keep)} per ${state.period}, ${result.keepPct} percent. ` +
          `Management fee ${formatCurrencyExact(result.fee)}.`,
      )
    }, LIVE_DEBOUNCE_MS)
    return () => clearTimeout(h)
  }, [result.keep, result.fee, result.keepPct, state.period])

  const grossPos = Math.round(toPos(state.gross, GROSS_MIN, GROSS_MAX))

  return (
    <div
      className="mt-10 grid gap-6"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))' }}
    >
      {/* ── LEFT: controls ── */}
      <div className="border border-rule bg-paper p-7 md:p-9">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
          Show
        </p>
        <div
          role="group"
          aria-label="Payout period"
          className="mt-3 inline-flex border border-rule bg-bone p-1"
        >
          {(['month', 'year'] as Period[]).map((p) => {
            const active = state.period === p
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => update({ period: p })}
                className={`px-5 py-2 font-mono text-[11px] uppercase tracking-label transition-colors duration-300 ${
                  active ? 'bg-ink text-bone' : 'text-graphite hover:text-ink'
                }`}
              >
                {p === 'month' ? 'Per month' : 'Per year'}
              </button>
            )
          })}
        </div>

        <hr className="my-8 border-0 border-t border-rule" />

        <RangeSlider
          label="Your monthly earnings"
          displayValue={formatCurrencyExact(state.gross)}
          ariaValueText={`${formatCurrencyExact(state.gross)} gross per month`}
          min={0}
          max={SCALE}
          step={1}
          value={grossPos}
          onChange={(pos) => update({ gross: toVal(pos, GROSS_MIN, GROSS_MAX) })}
          fillPct={(grossPos / SCALE) * 100}
        />

        <div className="mt-9">
          <RangeSlider
            label="Management rate — the rate you're quoted"
            displayValue={`${state.ratePct}%`}
            ariaValueText={`management rate ${state.ratePct} percent`}
            min={RATE_MIN}
            max={RATE_MAX}
            step={RATE_STEP}
            value={state.ratePct}
            onChange={(v) => update({ ratePct: v })}
            fillPct={((state.ratePct - RATE_MIN) / (RATE_MAX - RATE_MIN)) * 100}
          />
        </div>
      </div>

      {/* ── RIGHT: result + CTA + disclaimer ── */}
      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden border border-ember bg-paper p-8">
          {/* decorative ember glow, clipped by the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-60 w-60"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--ember) 22%, transparent) 8%, transparent 65%)',
            }}
          />
          <div className="relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep">
              You keep
            </p>
            <p
              aria-hidden
              className="mt-3 font-sans text-[clamp(2.5rem,7vw,4rem)] font-extrabold leading-none tracking-tight text-ink tabular"
            >
              {formatCurrencyExact(keep)}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-graphite">
              per {state.period}, after the management fee
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-label text-graphite">
                  Management fee
                </dt>
                <dd className="mt-1.5 font-sans text-xl font-bold tabular text-ink">
                  {formatCurrencyExact(result.fee)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-label text-graphite">
                  You keep
                </dt>
                <dd className="mt-1.5 font-sans text-xl font-bold tabular text-ink">
                  {result.keepPct}%
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <Link
          href={CTA_HREF}
          onClick={() =>
            track('calculator_cta_clicked', {
              gross: state.gross,
              rate: state.ratePct,
              period: state.period,
              keep: Math.round(result.keep),
            })
          }
          className="group inline-flex w-full items-center justify-center gap-2.5 border border-transparent bg-ink px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5"
        >
          Apply now
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
            &rarr;
          </span>
        </Link>

        <p className="text-center font-mono text-[11px] leading-relaxed tracking-[0.04em] text-graphite">
          A tool for modeling any management rate against your own numbers &mdash; not a quote,
          projection, or guarantee of earnings. The rate in your agreement is what governs.
        </p>
      </div>

      {/* debounced, visually-hidden live region */}
      <p className="sr-only" aria-live="polite">
        {liveMsg}
      </p>
    </div>
  )
}

// ── count-up ─────────────────────────────────────────────────────────────────
// Animates the settled take-home over ~400ms (easeOutCubic). Respects
// prefers-reduced-motion by snapping. No animation on first paint — the default
// result shows immediately, so there is no count-from-zero and no layout shift.
function useCountUp(target: number, durationMs = 400): number {
  const [display, setDisplay] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef<number | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      fromRef.current = target
      setDisplay(target)
      return
    }
    const from = fromRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (target - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, durationMs, reduced])

  return display
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}
