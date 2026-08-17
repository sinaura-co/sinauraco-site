'use client'

import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

// "Say goodbye to" list (Commitments) — as the section arrives, a strike draws
// left→right across each line in sequence. The line is decorative (aria-hidden);
// the "No more …" text carries the meaning on its own, so no-JS/screen-reader
// users lose nothing. prefers-reduced-motion renders the strikes complete.
export function SayGoodbyeList({ items }: { items: string[] }) {
  const [ref, inView] = useInView<HTMLUListElement>()
  const reduced = usePrefersReducedMotion()
  const struck = inView || reduced

  return (
    <ul ref={ref} className="mt-6 flex flex-col gap-4">
      {items.map((g, i) => (
        <li key={g} className="font-sans text-[22px] font-bold text-ember">
          <span className="relative inline-block">
            No more {g}
            <span
              aria-hidden
              className={`absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-rule-strong transition-transform duration-500 ease-out ${
                struck ? 'scale-x-100' : 'scale-x-0'
              }`}
              style={{ transitionDelay: struck && !reduced ? `${i * 110}ms` : '0ms' }}
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
