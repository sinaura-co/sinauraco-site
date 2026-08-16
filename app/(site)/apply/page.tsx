import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { ApplyForm } from '@/components/ApplyForm'

const DESCRIPTION =
  'Apply to join the Sinaura Collectives roster — a short application, reviewed by us in confidence within three business days. Open to 18+ creators.'

export const metadata: Metadata = pageMetadata({
  title: 'Apply',
  description: DESCRIPTION,
  path: '/apply',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Apply', route: '/apply' },
]

export default function ApplyPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="Apply Now"
          title={
            <>
              Start your <em className="not-italic text-ember">application</em>
            </>
          }
          lead="Answer every question honestly — incomplete applications may not be reviewed. It takes a few minutes."
        />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-ember-deep">
          18+ creators only
        </p>
      </div>

      <div className="mt-12">
        <ApplyForm />
      </div>
    </main>
  )
}
