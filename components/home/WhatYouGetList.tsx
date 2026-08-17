'use client'

import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

// "What you get" list (Commitments) — as the section arrives, each check lights up
// Ember in sequence. The check is decorative (aria-hidden); the item text carries
// the meaning. prefers-reduced-motion renders them lit immediately.
export function WhatYouGetList({ items }: { items: string[] }) {
  const [ref, inView] = useInView<HTMLUListElement>()
  const reduced = usePrefersReducedMotion()
  const lit = inView || reduced

  return (
    <ul ref={ref} className="mt-6 divide-y divide-rule border-y border-rule">
      {items.map((item, i) => (
        <li key={item} className="flex items-baseline gap-4 py-4 text-[17px] text-graphite">
          <span
            aria-hidden
            className={`font-bold transition-colors duration-500 ease-out ${
              lit ? 'text-ember' : 'text-ink'
            }`}
            style={{ transitionDelay: lit && !reduced ? `${i * 110}ms` : '0ms' }}
          >
            &#10003;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
