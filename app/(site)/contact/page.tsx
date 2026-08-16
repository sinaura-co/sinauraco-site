import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ContactForm } from '@/components/ContactForm'

const DESCRIPTION =
  'Got questions before you apply? Message or email Sinaura Collectives directly. Ready to join the roster? Head to the application form.'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: DESCRIPTION,
  path: '/contact',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'Contact', route: '/contact' },
]

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-8">
        <PageHeader
          eyebrow="Contact"
          title={
            <>
              Get in <em className="not-italic text-ember">touch</em>
            </>
          }
          lead="Got questions before you apply? Reach out — we read every message ourselves, and we'd love to hear from you."
        />
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionLabel as="h2">Reach us</SectionLabel>
          <dl className="mt-8 space-y-8">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-label text-graphite">Email</dt>
              <dd className="mt-2 text-lg text-ink">
                <a
                  href={`mailto:${site.email}`}
                  className="text-ember-deep underline decoration-from-font underline-offset-4 transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-label text-graphite">Instagram</dt>
              <dd className="mt-2 text-lg text-ink">
                <a
                  href={site.social.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-ember-deep underline decoration-from-font underline-offset-4 transition-colors hover:text-ink"
                >
                  {site.social.instagram}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 border-t border-rule pt-6">
            <p className="max-w-measure leading-[1.6] text-graphite">
              Ready to join the roster? Applications run through the{' '}
              <Link
                href="/apply"
                className="text-ember-deep underline decoration-from-font underline-offset-4 transition-colors hover:text-ink"
              >
                application form
              </Link>
              , not this message box.
            </p>
          </div>
        </div>

        <div>
          <SectionLabel as="h2">Send a message</SectionLabel>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
