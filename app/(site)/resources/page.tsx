import type { Metadata } from 'next'
import { getDocBySlug } from '@/lib/content'
import { HUB_META } from '@/content/hubs'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GuideCard } from '@/components/content/GuideCard'

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

      <ul className="mt-14 grid gap-5 sm:grid-cols-2">
        {HUB_META.map((hub, i) => {
          const doc = getDocBySlug(hub.slug)
          const live = Boolean(doc && doc.type === 'hub')
          return (
            <li key={hub.slug}>
              <GuideCard
                href={live ? `/resources/${hub.slug}` : undefined}
                index={String(i + 1).padStart(2, '0')}
                eyebrow={hub.question}
                title={hub.title}
                footer={
                  live && doc ? (
                    <span className="text-ember-deep">
                      Sinaura Collectives · Updated {fmt(doc.dateModified)} &rarr;
                    </span>
                  ) : (
                    <span className="text-rule-strong">In progress</span>
                  )
                }
              />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
