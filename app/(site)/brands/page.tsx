import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'

const DESCRIPTION =
  'Work with the Sinaura Collectives roster — one managed point of contact for creators we represent, campaigns run end to end, reporting that stays clear.'

export const metadata: Metadata = pageMetadata({
  title: 'For Brands',
  description: DESCRIPTION,
  path: '/brands',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'For Brands', route: '/brands' },
]

const HOW = [
  { title: 'One point of contact', desc: 'Brief us once — we coordinate the whole roster, so you are never chasing creators one inbox at a time.' },
  { title: 'A managed roster', desc: 'Creators we actively represent and manage day to day — not a directory you are left to sort through alone.' },
  { title: 'Coordinated campaigns', desc: 'Briefs, timelines, and deliverables — handled end to end, on the schedule you set.' },
  { title: 'Clear reporting', desc: 'What ran and how it performed, laid out plainly — the same discipline we hold ourselves to internally.' },
]

export default function BrandsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="For Brands"
          title={
            <>
              Work with our <em className="not-italic text-ember">roster</em>
            </>
          }
          lead={
            <>
              We represent creators and run their brand side — so you brief one managed point of
              contact, not a dozen inboxes. Tell us the goal and we drive the campaign end to end,
              then report exactly what ran and how it performed.
            </>
          }
        />
      </div>

      <section className="mt-16">
        <SectionLabel as="h2">How it works</SectionLabel>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {HOW.map((item, i) => (
            <li key={item.title}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={item.title} desc={item.desc} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-10">
        <SectionLabel>Partnerships</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          Tell us what you need — we will match you with the right fit on the roster and run it
          from there.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Talk to us
          </Button>
        </div>
      </section>
    </main>
  )
}
