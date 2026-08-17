'use client'

import { type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Scroll-reveal wrapper — fades and rises its children into view once, then stops
 * (§A1). Motion is opacity + transform only (compositor-friendly), so the children
 * stay real DOM for SEO and screen readers the whole time. `prefers-reduced-motion`
 * — or missing IntersectionObserver support — renders the final state immediately
 * (§A4). `delay` staggers siblings within a group; keep it small (~60–90ms/step).
 * Easing is the ported `--ease-cinematic` curve via the `ease-cinematic` token.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const shown = inView || reduced

  return (
    <div
      ref={ref}
      data-reveal={shown ? 'shown' : 'hidden'}
      className={`${className} transition-[opacity,transform] duration-700 ease-cinematic motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
      style={{ transitionDelay: shown && !reduced ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
