import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'
import { PROGRAM } from '@/content/partner-program'

// The referrals bridge — a discoverable, on-site entry that funnels into the
// focused /partner-program landing + application. It publishes the referral rate
// (the Amendment condition for building /referrals at all), sourced ONCE from
// PROGRAM so it can never drift from the program page. Because it makes the same
// earnings-adjacent, commercial claims, it inherits the SAME launch gate as the
// partner program: NOINDEX until legal review of the disclaimers and the
// Notion/Resend env wiring both clear. At launch, flip robots to index, add it to
// sitemap.ts, and it becomes the SEO entry that routes to /partner-program.
const DESCRIPTION =
  'Know creators worth managing? Introduce them to Sinaura and earn a referral commission when they join — without revealing who they are until you’re ready.'

export const metadata: Metadata = {
  ...pageMetadata({ title: 'Referrals', description: DESCRIPTION, path: '/referrals' }),
  robots: { index: false, follow: false },
}

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Referrals', route: '/referrals' },
]

const STEPS = [
  {
    title: 'Introduce a creator',
    desc: 'Point a creator in your network toward Sinaura — or apply as a referral partner first. No names required to start.',
  },
  {
    title: 'We handle the rest',
    desc: 'Qualification, onboarding and management are on us. You’re not managing anyone — you made the introduction.',
  },
  {
    title: 'You earn',
    desc: `Earn a referral commission starting at ${PROGRAM.commissionLabel} on eligible successful referrals, on the terms set in your agreement.`,
  },
]

export default function ReferralsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="Referrals"
          title={
            <>
              Know great creators? <em className="not-italic text-ember">Get rewarded.</em>
            </>
          }
          lead={
            <>
              If creators trust your recommendation, that’s worth something. Introduce them to Sinaura
              and earn a referral commission when they join — starting at {PROGRAM.commissionLabel},
              with no need to reveal who they are until you’re ready.
            </>
          }
        />
      </div>

      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">How it works</SectionLabel>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={s.title} desc={s.desc} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-10">
        <SectionLabel>The full program</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          The details, the tiers and the application live on the {PROGRAM.name} page. See exactly how
          the partnership works and register as a referral partner there.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button href={PROGRAM.route} variant="primary">
            See the partner program
          </Button>
          <Button href="/contact" variant="ghost">
            Ask a question
          </Button>
        </div>
      </section>
    </main>
  )
}
