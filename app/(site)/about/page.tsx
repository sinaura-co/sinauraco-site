import type { Metadata } from 'next'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { aboutPageSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'

const DESCRIPTION =
  'Sinaura Collectives is a New Jersey creator management company built to maximize what creators earn and scale their brand — paid on a percentage.'

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: DESCRIPTION,
  path: '/about',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'About', route: '/about' },
]

const PRINCIPLES = [
  {
    title: 'No upfront fees',
    desc: 'You’re charged on a percentage of what you earn — never a setup, onboarding, or monthly fee. No cost to start, no monthly drag on what you make.',
  },
  {
    title: 'You keep your account',
    desc: 'Your account stays in your name and your content stays yours — full stop. We operate through the platform’s co-manager access, never your password.',
  },
  {
    title: 'Your payouts, your bank',
    desc: 'The platform pays you your full amount, straight into your own bank. We invoice separately for commission — we’re never in the middle of your money.',
  },
  {
    title: 'Weekly reporting',
    desc: 'See your numbers every week — no chasing, no guesswork. The infrastructure behind the roster is the real product here, not a slogan.',
  },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd
        data={aboutPageSchema({
          title: 'About Sinaura Collectives',
          description: DESCRIPTION,
          route: '/about',
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="About"
          title={
            <>
              Built for creators who mean <em className="not-italic text-ember">business</em>
            </>
          }
          lead={
            <>
              {site.name} is a creator management company in {site.location}. We represent creators
              and run the entire brand side — maximizing what you earn and scaling the brand behind
              it. Paid on a percentage of what the roster earns, so we only grow when you grow.
            </>
          }
        />
      </div>

      <section className="mt-16">
        <SectionLabel as="h2">How we operate</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-graphite">
          The parts that matter aren’t slogans — they’re the terms. Every one of them lands in
          writing before you sign anything. Full transparency, zero guesswork.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={p.title} desc={p.desc} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">The company</SectionLabel>
        <div className="mt-5 max-w-measure space-y-4 text-lg leading-[1.5] text-graphite">
          <p>
            {site.legalName} is registered in {site.location}. We operate as a dedicated creator
            management agency and review every application ourselves, in confidence.
          </p>
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-ember-deep">
          18+ creators only
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-graphite">
          {site.address.name}, {site.address.street}, {site.address.locality}, {site.address.region}{' '}
          {site.address.postalCode}
        </p>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-10">
        <SectionLabel>See the terms</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          Everything above is on the table before you commit — no fine print, nothing hidden. See
          exactly how we work, or apply when you’re ready to grow.
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
    </main>
  )
}
