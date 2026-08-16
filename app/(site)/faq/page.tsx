import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqPageSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/Faq'
import { CREATOR_FAQ } from '@/content/faq'

const DESCRIPTION =
  'Straight answers for creators — commission, upfront fees, contracts, who owns your account and content, whether we need your password, and what you get weekly.'

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description: DESCRIPTION,
  path: '/faq',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'FAQ', route: '/faq' },
]

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqPageSchema(CREATOR_FAQ)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="FAQ"
          title={
            <>
              The questions worth <em className="not-italic text-ember">asking</em>
            </>
          }
          lead="Before you sign with anyone, these are the answers that matter. Here are ours — in writing, the same way every term lands before you commit."
        />
      </div>

      <section className="mt-14">
        <SectionLabel as="h2">Common questions</SectionLabel>
        <div className="mt-6">
          <Faq items={CREATOR_FAQ} idPrefix="creator-faq" />
        </div>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-10">
        <SectionLabel>Still deciding?</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          Every term above is on the table before you commit — nothing hidden, nothing you find out
          later. See exactly how we work, or send the question that isn’t here.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button href="/apply" variant="primary">
            Apply
          </Button>
          <Button href="/services" variant="ghost">
            How we work
          </Button>
          <Button href="/contact" variant="ghost">
            Ask us directly
          </Button>
        </div>
      </section>
    </main>
  )
}
