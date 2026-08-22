'use client'

import { useEffect, useState } from 'react'
import { GuideCard } from '@/components/content/GuideCard'

// One article (spoke) card's serializable payload. Assembled on the server so
// every article is in the HTML on first load and stays crawlable with JS off.
export interface LibraryItem {
  slug: string
  hubSlug: string
  hubLabel: string
  title: string
  href: string
  /** Publish date, pre-formatted on the server (UTC) so time zones never drift. */
  date: string
  author: string
}

// A filter facet: a hub, its label, and a live count computed from the items.
export interface LibraryFacet {
  slug: string
  label: string
  count: number
}

const ALL = 'all'

// The resource library filter. Facets are the six hubs (plus All); the cards are
// the articles. Selection is client-side over server-rendered cards — instant, no
// reload — and syncs to a shareable ?hub= URL that is adopted on mount. The one
// Ember moment in the composition is the active facet chip; the cards stay ink on
// bone so the accent is never spent twice. Filter row is IBM Plex Mono uppercase.
export function ResourceLibrary({
  items,
  facets,
}: {
  items: LibraryItem[]
  facets: LibraryFacet[]
}) {
  const [active, setActive] = useState<string>(ALL)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('hub')
    if (fromUrl && facets.some((f) => f.slug === fromUrl && f.slug !== ALL)) setActive(fromUrl)
  }, [facets])

  const select = (id: string) => {
    setActive(id)
    const url = id === ALL ? window.location.pathname : `${window.location.pathname}?hub=${id}`
    window.history.replaceState(null, '', url)
  }

  const shown = active === ALL ? items : items.filter((i) => i.hubSlug === active)
  const activeFacet = facets.find((f) => f.slug === active && f.slug !== ALL)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter articles by hub"
        className="flex flex-wrap gap-2 border-b border-rule pb-6"
      >
        {facets.map((f) => {
          const isActive = active === f.slug
          return (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${f.label}, ${f.count} ${f.count === 1 ? 'article' : 'articles'}`}
              onClick={() => select(f.slug)}
              className={`inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2 font-mono text-[11px] uppercase tracking-label transition-all duration-200 ${
                isActive
                  ? 'border-ember bg-ember text-ink'
                  : 'border-rule-strong text-graphite hover:border-ink hover:text-ink'
              }`}
            >
              <span>{f.label}</span>
              <span
                aria-hidden
                className={`tabular text-[10px] ${isActive ? 'text-ink' : 'text-rule-strong'}`}
              >
                {String(f.count).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>

      {activeFacet && (
        <div className="mt-6">
          <a
            href={`/resources/${activeFacet.slug}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-ember-deep underline decoration-from-font underline-offset-4 transition-colors hover:text-ink"
          >
            Open the {activeFacet.label} hub overview <span aria-hidden>&rarr;</span>
          </a>
        </div>
      )}

      {shown.length > 0 ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <li key={item.slug}>
              <GuideCard
                href={item.href}
                eyebrow={item.hubLabel}
                title={item.title}
                footer={
                  <span className="text-graphite">
                    {item.author} · {item.date}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 border border-dashed border-rule-strong p-12 text-center font-mono text-[12px] uppercase tracking-label text-graphite">
          New articles landing here soon
        </p>
      )}
    </div>
  )
}
