import Link from 'next/link'
import { site } from '@/content/site'

// Footer wayfinding that deliberately duplicates the menu — people scroll to the
// bottom looking for these (§D1). Hierarchy (§D3): the link group leads, in
// ember-deep (#9A330A — the sanctioned link/small-text tone, so it never spends
// the Ember accent); the legal line and registered agent sit below a hairline at
// reduced weight, offset to the opposite edge rather than stacked flush-left. The
// year auto-generates (§D5); the registered-agent address renders from site.ts so
// it can never drift from Organization.address.
const FOOTER_LINKS = [
  { label: 'Resources', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Careers', href: '/careers' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Partner Program', href: '/partner-program' },
  { label: 'What You Keep', href: '/services#what-you-keep' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { address } = site

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-label text-ember-deep transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-2 border-t border-rule pt-6 text-graphite sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.06em]">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] sm:text-right">
            <span className="uppercase tracking-label">Registered Agent:</span> {address.name} &mdash;{' '}
            {address.street}, {address.locality}, {address.region} {address.postalCode}
          </p>
        </div>
      </div>
    </footer>
  )
}
