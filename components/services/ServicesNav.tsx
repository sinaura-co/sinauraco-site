'use client'

import { useEffect, useState } from 'react'

interface Section {
  id: string
  label: string
}

// Sticky scroll-spy sub-nav for the services page (§F). The jump-links read as
// controls, not text: bounded, square, ink-outlined at rest; ink on hover; the
// active section fills Ember — and because only one section is current at a time,
// that is exactly one Ember per composition (Rev 02 accent-scarcity, honored). An
// IntersectionObserver lights whichever section owns the upper third of the
// viewport, so the control tracks the reader as they scroll.
export function ServicesNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      // Active band sits in the upper third — a section becomes current once its
      // heading crosses ~28% down, and stays current until the next one does.
      { rootMargin: '-28% 0px -62% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[56px] z-40 -mx-6 mt-8 border-y border-rule bg-[var(--bone-glass)] px-6 py-3 backdrop-blur-[12px] backdrop-saturate-[1.1]"
    >
      <ul className="flex flex-wrap gap-2">
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActive(s.id)}
                className={`inline-flex items-center whitespace-nowrap border px-4 py-2 font-mono text-[11px] uppercase tracking-label transition-all duration-200 ${
                  isActive
                    ? 'border-ember bg-ember text-ink'
                    : 'border-rule-strong text-graphite hover:border-ink hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
