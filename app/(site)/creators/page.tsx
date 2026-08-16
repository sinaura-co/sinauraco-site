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
  'Representation for 18+ creators — 24/7 fan coverage, weekly reporting, no upfront fees. We earn when you earn; your account, content, and payouts stay yours.'

export const metadata: Metadata = pageMetadata({
  title: 'For Creators',
  description: DESCRIPTION,
  path: '/creators',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'For Creators', route: '/creators' },
]

const WHAT_YOU_GET = [
  { title: '24/7 fan coverage', desc: 'A trained team on your messages around the clock — driving engagement and upsells while you focus on creating.' },
  { title: 'Weekly reporting', desc: 'Your real numbers, every week — full transparency, zero guesswork, no black box. Always know exactly where you stand.' },
  { title: 'You keep your account', desc: 'Your account, your content, your payouts — always yours. We work as co-managers only, never with your password.' },
  { title: 'No upfront fees', desc: 'You are charged a percentage of what you earn — nothing upfront, nothing monthly. We win only when you do.' },
  { title: 'Takedown support', desc: 'DMCA takedown support for leaked content — on request, whenever you need it.' },
  { title: 'A real review', desc: 'Every application read by us personally, in confidence, within three business days. A real answer, not an auto-reply.' },
]

const STEPS = [
  { title: 'Apply', desc: 'A few honest questions about you, your content, and where you want to take it.' },
  { title: 'We review', desc: 'We read every application ourselves, in confidence, and reply within three business days.' },
  { title: 'Terms in writing', desc: 'No upfront fees, a 30-day exit, your account kept yours — every term in writing before you ever sign.' },
]

export default function CreatorsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="For Creators"
          title={
            <>
              Representation that pays when <em className="not-italic text-ember">you</em> do
            </>
          }
          lead={
            <>
              We only earn when you do — a percentage of what you make, never an upfront fee. Our
              incentive is simple: maximize your earnings and your brand, while your account, your
              content, and your payouts stay yours.
            </>
          }
        />
      </div>

      <section className="mt-16">
        <SectionLabel as="h2">What you get</SectionLabel>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_YOU_GET.map((item, i) => (
            <li key={item.title}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={item.title} desc={item.desc} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <div className="relative overflow-hidden border border-rule bg-paper p-8 md:p-12">
          <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-measure">
              <SectionLabel as="h2">The complete system</SectionLabel>
              <h3 className="mt-5 font-sans text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-[1.08] tracking-long text-ink">
                See the exact <em className="not-italic text-ember">roadmap</em> we run
              </h3>
              <p className="mt-4 text-lg leading-[1.5] text-graphite">
                The full operating system we implement for the creators we manage &mdash; weekly
                structure, platform strategy, funnel infrastructure, and a realistic timeline.
                Published in the open, so you can see how we work before you ever apply.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="/roadmap" variant="primary">
                Read the roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">How to start</SectionLabel>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={step.title} desc={step.desc} />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-10">
        <SectionLabel>Applications are open to 18+ creators</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          If you treat this like a business, so do we. Apply now, or read the guides and see exactly
          how we think first.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button href="/apply" variant="primary">
            Apply now
          </Button>
          <Button href="/resources" variant="ghost">
            Read the guides
          </Button>
        </div>
      </section>
    </main>
  )
}
