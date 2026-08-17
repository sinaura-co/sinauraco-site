'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting, live. Starts `false` so the
 * server render and first client render agree (no hydration mismatch); the effect
 * corrects it on mount and on change. Callers should render the final, unanimated
 * state when this returns `true`.
 */
export function usePrefersReducedMotion(): boolean {
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
