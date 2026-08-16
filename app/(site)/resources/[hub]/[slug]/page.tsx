import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSpokes, getDocBySlug, type ContentDoc } from '@/lib/content'
import { hubMeta } from '@/content/hubs'
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
import { GuideCard } from '@/components/content/GuideCard'

export const dynamicParams = false

export function generateStaticParams() {
  return getSpokes()
    .filter((s) => s.parentHub)
    .map((s) => ({ hub: s.parentHub as string, slug: s.slug }))
}

function getSpoke(hub: string, slug: string): ContentDoc | undefined {
  const doc = getDocBySlug(slug)
  return doc && doc.type !== 'hub' && doc.parentHub === hub ? doc : undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string; slug: string }>
}): Promise<Metadata> {
  const { hub, slug } = await params
  const doc = getSpoke(hub, slug)
  if (!doc) return {}
  const base = pageMetadata({
    title: doc.title,
    description: doc.description,
    path: `/resources/${hub}/${doc.slug}`,
    ogType: 'article',
    publishedTime: doc.datePublished,
    modifiedTime: doc.dateModified,
  })
  return {
    ...base,
    other: {
      'ai:content_type': 'reference',
      'ai:fact_check_status': doc.sources.length ? 'sourced' : 'editorial-guidance',
      'ai:content_freshness': doc.dateModified,
      'ai:original_research': 'false',
      ...(doc.shortAnswer ? { 'claude:summary': doc.shortAnswer } : {}),
    },
  }
}

export default async function SpokePage({
  params,
}: {
  params: Promise<{ hub: string; slug: string }>
}) {
  const { hub: hubSlug, slug } = await params
  const doc = getSpoke(hubSlug, slug)
  if (!doc) notFound()

  const hub = hubMeta(hubSlug)
  const hubRoute = `/resources/${hubSlug}`
  const route = `${hubRoute}/${doc.slug}`
  const crumbs: Crumb[] = [
    { name: 'Home', route: '/' },
    { name: 'Resources', route: '/resources' },
    { name: hub?.title ?? hubSlug, route: hubRoute },
    { name: doc.h1 ?? doc.title, route },
  ]
  const siblings = getSpokes().filter((s) => s.parentHub === hubSlug && s.slug !== doc.slug)

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
          <SectionLabel>
            <Link href={hubRoute} className="transition-colors hover:text-ink">
              {hub?.title ?? 'Guide'}
            </Link>
          </SectionLabel>
          <h1 className="mt-5 font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-long text-ink">
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

        {doc.faqs.length > 0 && (
          <section className="mt-16 max-w-measure">
            <SectionLabel as="h2">Questions</SectionLabel>
            <div className="mt-6">
              <Faq items={doc.faqs} idPrefix={`faq-${doc.slug}`} />
            </div>
          </section>
        )}

        <Sources sources={doc.sources} />

        <section className="mt-16 border-t border-rule pt-10">
          {siblings.length > 0 && (
            <>
              <SectionLabel as="h2">More in {hub?.title ?? 'this guide'}</SectionLabel>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {siblings.map((s, i) => (
                  <li key={s.slug}>
                    <GuideCard
                      href={`/resources/${hubSlug}/${s.slug}`}
                      index={String(i + 1).padStart(2, '0')}
                      title={s.h1 ?? s.title}
                      desc={s.description}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-10">
            <Link
              href={hubRoute}
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-ink underline decoration-from-font underline-offset-4 transition-colors hover:text-ember-deep"
            >
              <span aria-hidden>&larr;</span> Back to {hub?.title ?? 'the guide'}
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
