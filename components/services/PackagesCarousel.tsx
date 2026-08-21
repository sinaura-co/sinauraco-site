'use client'

import { useEffect, useRef, useState } from 'react'

// §8 packages — a scroll-snap carousel of the three creator packages. The only
// client component on /services. Keyboard: focus the track and use ←/→, or the
// arrow controls; touch: native swipe via scroll-snap. The single ember element
// for the whole component is the active-state dot — arrows, cards, and rules are
// ink. Reduced motion is honoured by the global `scroll-behavior:auto` override
// plus a matchMedia check on programmatic scrolls. Cards are square paper on the
// bone ground, separated by hairline ink borders, never shadows. Card 4 (the
// agency bench) is deliberately NOT in here — it addresses a different buyer and
// is rendered apart on the page.

interface Package {
  id: string
  name: string
  summary: string
  items: string[]
}

const PACKAGES: Package[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    summary: 'The chatting operation, complete.',
    items: [
      'Profiling document and voice matching',
      'Script and scenario library built for your page',
      'Structured shift coverage with written handoffs',
      'All inbound replies and proactive outreach',
      'Locked-content sales, tips, and custom request intake',
      'Fan segmentation and tagging',
      'Welcome flow for new subscribers',
      'Lapsed-fan follow-up and win-back sequences',
      'Content library organization and tagging',
      'Feed posting and broadcast message scheduling',
      'Profile and bio copy',
      'Quality review and message-level audit',
      'Weekly reporting',
    ],
  },
  {
    id: 'inbox-traffic',
    name: 'Inbox + Traffic',
    summary: 'Everything in Inbox, plus the work that fills it.',
    items: [
      'Social posting and audience growth on two channels',
      'Safe-for-work funnel design feeding the paid page',
      'Comment-to-message automation on the relevant platform',
      'Link-in-bio and lead capture so traffic is owned, not rented',
      'Channel-level attribution reporting — which sources produce buyers, not followers',
    ],
  },
  {
    id: 'managed',
    name: 'Managed',
    summary: 'The full operation. You create; we run everything else.',
    items: [
      'Everything in Inbox + Traffic',
      'Content direction and shot lists built from what the inbox can actually sell',
      'Custom request operations end to end — intake, pricing, scheduling, delivery',
      'Leaked-content takedown support, on request',
      'Expansion onto a second platform where it makes sense',
      'Brand and partnership representation',
      'Account security, verification, and platform compliance management',
    ],
  },
]

export function PackagesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const goTo = (i: number): void => {
    const clamped = Math.max(0, Math.min(PACKAGES.length - 1, i))
    const track = trackRef.current
    const slide = slideRefs.current[clamped]
    const first = slideRefs.current[0]
    if (!track || !slide) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: slide.offsetLeft - (first?.offsetLeft ?? 0),
      behavior: reduce ? 'auto' : 'smooth',
    })
    setActive(clamped)
  }

  // Keep the active dot in sync as the reader swipes/scrolls the track directly.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLElement)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 },
    )
    slideRefs.current.forEach((s) => s && io.observe(s))
    return () => io.disconnect()
  }, [])

  const toggle = (id: string): void =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="mt-10">
      {/* controls bar */}
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite tabular">
          <span className="text-ink">{String(active + 1).padStart(2, '0')}</span>
          <span className="px-1 text-rule-strong">/</span>
          {String(PACKAGES.length).padStart(2, '0')}
        </p>
        <div className="flex">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous package"
            className="grid h-11 w-11 place-items-center border border-rule-strong text-ink transition-colors duration-200 hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path d="M15 4 L7 12 L15 20" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === PACKAGES.length - 1}
            aria-label="Next package"
            className="-ml-px grid h-11 w-11 place-items-center border border-rule-strong text-ink transition-colors duration-200 hover:bg-ink hover:text-bone disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path d="M9 4 L17 12 L9 20" />
            </svg>
          </button>
        </div>
      </div>

      {/* track */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Packages — swipe or use arrow keys"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            goTo(active + 1)
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goTo(active - 1)
          }
        }}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PACKAGES.map((pkg, i) => {
          const open = expanded.has(pkg.id)
          const listId = `pkg-${pkg.id}-items`
          return (
            <article
              key={pkg.id}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              className="flex shrink-0 basis-[86%] snap-start flex-col border border-ink bg-paper p-7 sm:basis-[62%] md:p-9 lg:basis-[38%]"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-sans text-2xl font-bold uppercase tracking-display text-ink md:text-3xl">
                {pkg.name}
              </h3>
              <p className="mt-3 max-w-measure text-graphite">{pkg.summary}</p>

              <button
                type="button"
                onClick={() => toggle(pkg.id)}
                aria-expanded={open}
                aria-controls={listId}
                className="group mt-6 inline-flex items-center gap-2 self-start border-b border-ink pb-1 font-mono text-[11px] font-semibold uppercase tracking-label text-ink transition-colors duration-200 hover:text-ember-deep hover:border-ember-deep"
              >
                {open ? 'Hide inclusions' : "See what's included"}
                <span aria-hidden className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                  &darr;
                </span>
              </button>

              {open && (
                <ul id={listId} className="mt-6 divide-y divide-rule border-t border-rule">
                  {pkg.items.map((item) => (
                    <li key={item} className="py-3 text-[15px] leading-[1.5] text-graphite">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )
        })}
      </div>

      {/* dots — the one ember element */}
      <div className="mt-6 flex gap-2" role="tablist" aria-label="Choose package">
        {PACKAGES.map((pkg, i) => (
          <button
            key={pkg.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={pkg.name}
            onClick={() => goTo(i)}
            className={`h-1 w-9 transition-colors duration-200 ${active === i ? 'bg-ember' : 'bg-rule-strong'}`}
          />
        ))}
      </div>
    </div>
  )
}
