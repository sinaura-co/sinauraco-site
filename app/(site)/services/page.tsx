import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { serviceSchema, softwareApplicationSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'
import { WhatYouKeep } from '@/components/WhatYouKeep'

const DESCRIPTION =
  'Management, growth, and operations for creators — sold as one, run as one operation. No upfront fees, no hidden markups, every term in writing.'

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description: DESCRIPTION,
  path: '/services',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Services', route: '/services' },
]

const LINES: { id: string; label: string; title: string; blurb: string; items: string[] }[] = [
  {
    id: 'management',
    label: 'Management',
    title: 'The day-to-day, handled',
    blurb: 'The fan-facing grind that eats your week — messaging, scheduling, offers — handled around the clock by a trained team, so you’re free to focus on content.',
    items: [
      '24/7 fan management that keeps fans engaged',
      'Daily messaging that turns fans into regulars',
      'Content scheduled and optimized for reach',
      'Vaults and offers structured to sell',
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    title: 'More revenue from the audience you have',
    blurb: 'We turn the attention you already have into income — sharper pricing, smarter promotion, traffic from every angle, and retention that compounds.',
    items: [
      'Revenue and promotion strategy built to scale',
      'Pricing and offers tuned to lift revenue',
      'Multi-platform marketing and traffic from every angle',
      'Retention, rebills, and win-backs that compound',
    ],
  },
  {
    id: 'ops',
    label: 'Ops',
    title: 'The infrastructure you can trust',
    blurb: 'The part most agencies keep vague — and the one we lead with: full visibility into your numbers, account access that stays yours, and terms in writing you can hold us to.',
    items: [
      'Weekly reports on your numbers — no guesswork',
      'Co-manager access only — never your password',
      'DMCA takedown support, on request',
      'Every term in writing, before you sign',
    ],
  },
]

const FEE_STRUCTURE = [
  'You pay a percentage of what you actually earn — nothing up front.',
  'No setup fees, no onboarding fees, no monthly retainer — zero fixed costs.',
  'No markups, no hidden deductions, no surprises — the fee is the fee.',
  'Your platform pays you in full, straight to your own bank — we invoice separately for our commission.',
  'The exact figure and every term are spelled out in your agreement, in writing, before you sign.',
]

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd
        data={serviceSchema({
          name: 'Creator management, growth, and operations',
          description: DESCRIPTION,
          route: '/services',
        })}
      />
      <JsonLd
        data={softwareApplicationSchema({
          name: 'Take-home calculator',
          description:
            'Model any management rate against your own monthly earnings to see your take-home. Not a quote or earnings projection.',
          route: '/services',
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="Services"
          title={
            <>
              Management, growth, <em className="not-italic text-ember">ops</em>
            </>
          }
          lead={
            <>
              Three lines, sold as one. We don’t split management, growth, and ops into separate
              retainers — every creator on the roster gets all three, run as a single operation so
              nothing falls through the cracks.
            </>
          }
        />

        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            ...LINES.map((l) => ({ id: l.id, label: l.label })),
            { id: 'fees', label: 'How we are paid' },
            { id: 'what-you-keep', label: 'What you keep' },
          ].map(
            (l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="font-mono text-[12px] uppercase tracking-label text-graphite underline decoration-from-font underline-offset-4 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
      </div>

      {LINES.map((line) => (
        <section key={line.id} id={line.id} className="mt-16 scroll-mt-24 border-t border-rule pt-10">
          <SectionLabel as="h2">{line.label}</SectionLabel>
          <h3 className="mt-5 max-w-measure font-sans text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {line.title}
          </h3>
          <p className="mt-4 max-w-measure text-lg leading-[1.5] text-graphite">{line.blurb}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {line.items.map((item, i) => (
              <li key={item}>
                <GuideCard index={String(i + 1).padStart(2, '0')} title={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section id="fees" className="mt-16 scroll-mt-24 border-t-2 border-ink pt-10">
        <SectionLabel as="h2">How we are paid</SectionLabel>
        <h3 className="mt-5 max-w-measure font-sans text-2xl font-bold tracking-tight text-ink md:text-3xl">
          How the fee works — and what you keep
        </h3>
        <p className="mt-4 max-w-measure text-lg leading-[1.5] text-graphite">
          We put the whole structure in front of you up front — because how the fee is built, not a
          headline number, is what really decides what you keep. You’ll see the exact figure spelled
          out in your agreement, in writing, before you sign.
        </p>
        <ul className="mt-8 max-w-measure divide-y divide-rule border-y border-rule">
          {FEE_STRUCTURE.map((point) => (
            <li key={point} className="flex items-baseline gap-4 py-4 text-graphite">
              <span aria-hidden className="font-bold text-ink">
                &#10003;
              </span>
              <span className="leading-[1.55]">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="what-you-keep" className="mt-16 scroll-mt-24 border-t border-rule pt-10">
        <SectionLabel as="h2">What you keep</SectionLabel>
        <h3 className="mt-5 max-w-measure font-sans text-2xl font-bold tracking-tight text-ink md:text-3xl">
          No upfront fees. Just the math.
        </h3>
        <p className="mt-4 max-w-measure text-lg leading-[1.5] text-graphite">
          Enter your monthly earnings and the rate you&rsquo;re quoted &mdash; see your take-home.
          Move either slider; nothing is sent anywhere.
        </p>
        <WhatYouKeep />
      </section>

      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel>Ready when you are</SectionLabel>
        <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
          Representation is by application — we’re selective about who we take on, because the model
          only works when the fit is right. Want the specifics for your situation? Apply now, or read
          the guides first.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button href="/apply" variant="primary">
            Apply
          </Button>
          <Button href="/resources" variant="ghost">
            Read the guides
          </Button>
        </div>
      </section>
    </main>
  )
}
