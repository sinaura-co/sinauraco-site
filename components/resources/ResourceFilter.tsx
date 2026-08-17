'use client'

import { useEffect, useState } from 'react'
import { GuideCard } from '@/components/content/GuideCard'

interface ResourceItem {
  slug: string
  index: string
  question: string
  title: string
  category: string
  href?: string
  /** Formatted date if the hub is live; absent = in progress. */
  updated?: string
}

interface Category {
  id: string
  label: string
}

const ALL = 'all'

// Client-side resource filter (§G). Same control vocabulary as the services
// scroll-spy (§F) — bounded, square, ink-outlined chips; the selected one fills
// Ember (one active = one Ember per composition). Filtering is instant, no reload
// (§G2), and the choice syncs to a shareable ?category= URL (§G3). The server
// renders every card (active defaults to All), so all guides stay in the HTML for
// crawlers; a shared ?category= link is adopted on mount.
export function ResourceFilter({
  items,
  categories,
}: {
  items: ResourceItem[]
  categories: Category[]
}) {
  const [active, setActive] = useState<string>(ALL)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('category')
    if (fromUrl && categories.some((c) => c.id === fromUrl)) setActive(fromUrl)
  }, [categories])

  const select = (id: string) => {
    setActive(id)
    const url = id === ALL ? window.location.pathname : `${window.location.pathname}?category=${id}`
    window.history.replaceState(null, '', url)
  }

  const tabs: Category[] = [{ id: ALL, label: 'All' }, ...categories]
  const shown = active === ALL ? items : items.filter((i) => i.category === active)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter resources by category"
        className="flex flex-wrap gap-2 border-b border-rule pb-6"
      >
        {tabs.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(t.id)}
              className={`inline-flex items-center whitespace-nowrap border px-4 py-2 font-mono text-[11px] uppercase tracking-label transition-all duration-200 ${
                isActive
                  ? 'border-ember bg-ember text-ink'
                  : 'border-rule-strong text-graphite hover:border-ink hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {shown.length > 0 ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {shown.map((item) => (
            <li key={item.slug}>
              <GuideCard
                href={item.href}
                index={item.index}
                eyebrow={item.question}
                title={item.title}
                footer={
                  item.href && item.updated ? (
                    <span className="text-ember-deep">
                      Sinaura Collectives · Updated {item.updated} &rarr;
                    </span>
                  ) : (
                    <span className="text-rule-strong">In progress</span>
                  )
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 border border-dashed border-rule-strong p-12 text-center font-mono text-[12px] uppercase tracking-label text-graphite">
          New guides landing here soon
        </p>
      )}
    </div>
  )
}
