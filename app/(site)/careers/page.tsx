import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, jobPostingSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GuideCard } from '@/components/content/GuideCard'
import { CareersForm } from '@/components/CareersForm'
import { CAREERS } from '@/content/careers'

const DESCRIPTION =
  'Join the team behind the roster: Sinaura is hiring remote chat specialists — strong writers with a sales instinct — to handle messaging for the creators we manage.'

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description: DESCRIPTION,
  path: '/careers',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Careers', route: '/careers' },
]

// The build date — genuinely when this deploy posted the role, not a fabricated
// fixed date (CLAUDE.md: never invent a date).
const DATE_POSTED = new Date().toISOString().slice(0, 10)

export default function CareersPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={jobPostingSchema({
          title: CAREERS.role,
          description: CAREERS.jobDescription,
          route: '/careers',
          datePosted: DATE_POSTED,
        })}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow={CAREERS.eyebrow}
          title={
            <>
              We’re hiring <em className="not-italic text-ember">chat specialists</em>
            </>
          }
          lead={CAREERS.lead}
        />
      </div>

      {/* What you'd do — numbered cards */}
      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">{CAREERS.whatYouDo.title}</SectionLabel>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {CAREERS.whatYouDo.items.map((item, i) => (
            <li key={item}>
              <GuideCard index={String(i + 1).padStart(2, '0')} title={item} />
            </li>
          ))}
        </ul>
      </section>

      {/* Who we're looking for — checklist rhythm */}
      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">{CAREERS.whoWereLookingFor.title}</SectionLabel>
        <ul className="mt-8 max-w-measure divide-y divide-rule border-y border-rule">
          {CAREERS.whoWereLookingFor.items.map((item) => (
            <li key={item} className="flex items-baseline gap-4 py-4 text-graphite">
              <span aria-hidden className="font-bold text-ink">
                &#10003;
              </span>
              <span className="leading-[1.55]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-16 border-t border-rule pt-10">
        <SectionLabel as="h2">{CAREERS.howItWorks.title}</SectionLabel>
        <ul className="mt-8 max-w-measure space-y-4">
          {CAREERS.howItWorks.items.map((item, i) => (
            <li key={item} className="flex gap-4 leading-[1.55] text-graphite">
              <span className="font-mono text-[11px] tabular tracking-label text-ember-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Apply */}
      <section className="mt-16 border-t-2 border-ink pt-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel as="h2">Apply</SectionLabel>
            <p className="mt-5 max-w-measure text-lg leading-[1.5] text-ink">
              No CV gymnastics. Tell us who you are and write a few lines in your own voice — the
              writing is the audition. If it’s a fit, we’ll be in touch.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-ember-deep">
              18+ only · Remote
            </p>
          </div>
          <div>
            <CareersForm />
          </div>
        </div>
      </section>
    </main>
  )
}
