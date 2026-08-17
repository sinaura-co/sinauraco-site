'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

// useLayoutEffect warns during SSR; there is nothing to measure on the server, so
// fall back to useEffect there and run the pre-paint seed only in the browser.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DEFAULT_DURATION_MS = 1100

/**
 * Counts a figure up (or down) once, when it scrolls into view (§B). Only the
 * leading numeral animates; any suffix/symbol (`%`, `+`, `/7`) stays pinned so the
 * label never reflows, and figures render with tabular numerals. The true value is
 * always in the DOM — the server render seeds the final value and an sr-only mirror
 * carries it — so no-JS visitors, crawlers, and screen readers get the real number.
 * `prefers-reduced-motion` snaps straight to it.
 *
 * `from` overrides the start of the count — e.g. fees animate 100 → 0 to dramatize
 * dropping to nothing.
 */
export function Counter({
  value,
  from = 0,
  durationMs = DEFAULT_DURATION_MS,
}: {
  value: string
  from?: number
  durationMs?: number
}) {
  const match = /^(-?\d+)(.*)$/.exec(value.trim())
  const target = match ? Number(match[1]) : NaN
  const suffix = match ? match[2] : ''
  const animatable = match !== null && Number.isFinite(target)

  const [ref, inView] = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(target) // SSR + no-JS render the final value
  const rafRef = useRef<number | null>(null)
  const doneRef = useRef(false)

  // Pre-paint on the client: seed the start value so there is no flash of the final
  // number before the count begins. Skipped when we won't animate at all.
  useIsomorphicLayoutEffect(() => {
    if (animatable && !reduced && typeof IntersectionObserver !== 'undefined') {
      setDisplay(from)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!animatable || doneRef.current) return
    if (reduced) {
      setDisplay(target)
      doneRef.current = true
      return
    }
    if (!inView) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(from + (target - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(target)
        doneRef.current = true
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [animatable, inView, reduced, from, target, durationMs])

  if (!animatable) return <>{value}</>

  return (
    <span ref={ref} className="tabular">
      <span aria-hidden="true">
        {Math.round(display)}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
