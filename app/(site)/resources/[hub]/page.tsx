import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getHubs, getDocBySlug, type ContentDoc } from '@/lib/content'
import { HUB_META, hubMeta } from '@/content/hubs'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo/schema'
import { RenderMDX } from '@/lib/content/render'
import { Byline } from '@/components/content/Byline'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { ShortAnswer } from '@/components/content/ShortAnswer'
import { Faq } from '@/components/Faq'
import { Sources } from '@/components/content/Sources'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'

export const dynamicParams = false

export function generateStaticParams() {
  return getHubs().map((h) => ({ hub: h.slug }))
}

function getHub(slug: string): ContentDoc | undefined {
  const doc = getDocBySlug(slug)
  return doc && doc.type === 'hub' ? doc : undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string }>
}): Promise<Metadata> {
  const { hub } = await params
  const doc = getHub(hub)
  if (!doc) return {}
  const base = pageMetadata({
    title: doc.title,
    description: doc.description,
    path: `/resources/${doc.slug}`,
    ogType: 'article',
    publishedTime: doc.datePublished,
    modifiedTime: doc.dateModified,
  })
  return {
    ...base,
    other: {
      'ai:content_type': 'hub-guide',
      'ai:topic_authority': 'high',
      'ai:fact_check_status': doc.sources.length ? 'sourced' : 'editorial-guidance',
      'ai:content_freshness': doc.dateModified,
      'ai:original_research': 'false',
      ...(doc.shortAnswer ? { 'claude:summary': doc.shortAnswer } : {}),
    },
  }
}

export default async function HubPage({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params
  const doc = getHub(hub)
  if (!doc) notFound()

  const meta = hubMeta(doc.slug)
  const route = `/resources/${doc.slug}`
  const crumbs: Crumb[] = [
    { name: 'Home', route: '/' },
    { name: 'Resources', route: '/resources' },
    { name: meta?.title ?? doc.title, route },
  ]

  const spokes = doc.relatedSpokes
    .map((s) => getDocBySlug(s))
    .filter((s): s is ContentDoc => Boolean(s))
  const liveHubs = new Set(getHubs().map((h) => h.slug))
  const otherHubs = HUB_META.filter((h) => h.slug !== doc.slug)

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <JsonLd
        data={articleSchema({
          title: doc.title,
          description: doc.description,
          route,
          datePublished: doc.datePublished,
          dateModified: doc.dateModified,
          sources: doc.sources,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {doc.faqs.length > 0 && <JsonLd data={faqPageSchema(doc.faqs)} />}

      <Breadcrumbs items={crumbs} />

      <article className="mt-8">
        <header className="max-w-measure">
          <h1 className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.06] tracking-long text-ink">
            {doc.h1 ?? doc.title}
          </h1>
          <div className="mt-6">
            <Byline doc={doc} />
          </div>
        </header>

        {doc.shortAnswer && (
          <div className="mt-10 max-w-measure">
            <ShortAnswer>{doc.shortAnswer}</ShortAnswer>
          </div>
        )}

        <div className="mt-10 max-w-measure">
          <RenderMDX source={doc.body} />
        </div>

        {spokes.length > 0 && (
          <section aria-labelledby="in-this-guide" className="mt-16">
            <SectionLabel as="h2" id="in-this-guide">
              In this guide
            </SectionLabel>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {spokes.map((s, i) => (
                <li key={s.slug}>
                  <GuideCard
                    href={`/resources/${doc.slug}/${s.slug}`}
                    index={String(i + 1).padStart(2, '0')}
                    title={s.h1 ?? s.title}
                    desc={s.description}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {doc.faqs.length > 0 && (
          <section className="mt-16 max-w-measure">
            <SectionLabel as="h2">Questions</SectionLabel>
            <div className="mt-6">
              <Faq items={doc.faqs} idPrefix={`faq-${doc.slug}`} />
            </div>
          </section>
        )}

        <Sources sources={doc.sources} />

        <section className="mt-16">
          <SectionLabel as="h2">More guides</SectionLabel>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {otherHubs.map((h) => {
              const live = liveHubs.has(h.slug)
              return (
                <li key={h.slug}>
                  <GuideCard
                    href={live ? `/resources/${h.slug}` : undefined}
                    eyebrow={h.question}
                    title={h.title}
                    footer={
                      live ? (
                        <span className="text-ember-deep">Read &rarr;</span>
                      ) : (
                        <span className="text-rule-strong">Soon</span>
                      )
                    }
                  />
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mt-16 border-t-2 border-ink pt-10">
          <SectionLabel>Thinking about management?</SectionLabel>
          <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
            See exactly how we work — the terms, the reporting, and the access model, in writing
            before you sign anything.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button href="/services" variant="primary">
              How we work
            </Button>
            <Button href="/apply" variant="ghost">
              Apply
            </Button>
          </div>
        </section>
      </article>
    </main>
  )
}
