import type { Metadata } from 'next'
import { getSpokes, getDocBySlug } from '@/lib/content'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { SectionLabel } from '@/components/ui/SectionLabel'
import {
  ResourceLibrary,
  type LibraryFacet,
  type LibraryItem,
} from '@/components/resources/ResourceLibrary'

export const metadata: Metadata = pageMetadata({
  title: 'Resources',
  description:
    'Operator guides for US creators — choosing an agency, pricing and contracts, getting started, safety and tax, growth, and content operations. Sourced, dated, bylined.',
  path: '/resources',
})

// Filter facets, in the exact display order and with the short labels the library
// uses. Each maps to a hub slug; counts are computed live from the content
// directory below, never hardcoded.
const FACETS: { slug: string; label: string }[] = [
  { slug: 'agency-selection', label: 'Agency' },
  { slug: 'pricing', label: 'Pricing' },
  { slug: 'getting-started', label: 'Getting Started' },
  { slug: 'compliance', label: 'Compliance' },
  { slug: 'growth', label: 'Growth' },
  { slug: 'content-ops', label: 'Content Ops' },
]

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Resources', route: '/resources' },
]

export default function ResourcesIndex() {
  const facetOrder = new Map(FACETS.map((f, i) => [f.slug, i]))
  const labelOf = (slug: string): string => FACETS.find((f) => f.slug === slug)?.label ?? slug

  // Reading order within a hub follows the hub's own relatedSpokes list, so the
  // "All" view reads as the hubs intend rather than by filename.
  const spokeRank = (hubSlug: string, slug: string): number => {
    const order = getDocBySlug(hubSlug)?.relatedSpokes ?? []
    const i = order.indexOf(slug)
    return i === -1 ? 999 : i
  }

  // Every published article (spoke) becomes a server-rendered card. All of them
  // are in the HTML on first load, so the page is complete with JavaScript off.
  const items: LibraryItem[] = getSpokes()
    .filter((s) => s.parentHub && facetOrder.has(s.parentHub))
    .map((s) => {
      const hubSlug = s.parentHub as string
      return {
        slug: s.slug,
        hubSlug,
        hubLabel: labelOf(hubSlug),
        title: s.h1 ?? s.title,
        href: `/resources/${hubSlug}/${s.slug}`,
        date: fmt(s.datePublished),
        author: s.author === 'organization' ? 'Sinaura Collectives' : s.author,
      }
    })
    .sort(
      (a, b) =>
        (facetOrder.get(a.hubSlug) ?? 99) - (facetOrder.get(b.hubSlug) ?? 99) ||
        spokeRank(a.hubSlug, a.slug) - spokeRank(b.hubSlug, b.slug) ||
        a.slug.localeCompare(b.slug),
    )

  const facets: LibraryFacet[] = [
    { slug: 'all', label: 'All', count: items.length },
    ...FACETS.map((f) => ({
      slug: f.slug,
      label: f.label,
      count: items.filter((i) => i.hubSlug === f.slug).length,
    })),
  ]

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <header className="mt-8 max-w-measure">
        <SectionLabel>Creator guides</SectionLabel>
        <h1 className="mt-5 font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.06] tracking-long text-ink">
          Resources
        </h1>
        <p className="mt-5 text-lg leading-[1.5] text-graphite">
          Written from how we actually run a roster — sourced, dated, and maintained. No recycled
          listicles, no numbers we can&rsquo;t stand behind. Every article carries a byline and the
          date it was published.
        </p>
      </header>

      <div className="mt-14">
        <ResourceLibrary items={items} facets={facets} />
      </div>
    </main>
  )
}
