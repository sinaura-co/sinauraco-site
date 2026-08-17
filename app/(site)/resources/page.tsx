import type { Metadata } from 'next'
import { getDocBySlug } from '@/lib/content'
import { HUB_META } from '@/content/hubs'
import { RESOURCE_CATEGORIES } from '@/content/resourceCategories'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ResourceFilter } from '@/components/resources/ResourceFilter'

export const metadata: Metadata = pageMetadata({
  title: 'Resources',
  description:
    'Operator guides for US creators — choosing an agency, pricing and contracts, getting started, safety, tax and legal, and growth. Every guide sourced and dated.',
  path: '/resources',
})

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
  // Card data is assembled on the server (getDocBySlug reads the MDX) and handed
  // to the client filter as plain serializable values.
  const items = HUB_META.map((hub, i) => {
    const doc = getDocBySlug(hub.slug)
    const live = Boolean(doc && doc.type === 'hub')
    return {
      slug: hub.slug,
      index: String(i + 1).padStart(2, '0'),
      question: hub.question,
      title: hub.title,
      category: hub.category,
      href: live ? `/resources/${hub.slug}` : undefined,
      updated: live && doc ? fmt(doc.dateModified) : undefined,
    }
  })

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
          listicles, no numbers we can&rsquo;t stand behind.
        </p>
      </header>

      <div className="mt-14">
        <ResourceFilter items={items} categories={RESOURCE_CATEGORIES} />
      </div>
    </main>
  )
}
