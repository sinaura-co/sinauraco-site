import Link from 'next/link'
import { site } from '@/content/site'

// Layout shell — footer, wearing the LIVE site's chrome (CLAUDE.md LAYOUT lock):
// a single hairline-topped row. Legal line + registered-agent address on the
// left (the address is a launch-gate requirement, wired from site.ts so it can
// never drift from Organization.address); Privacy / Terms on the right. The
// binding legal name is used, never "SinauraCo"; the year renders from the
// current date, never hardcoded.
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10">
        <div className="font-mono text-[11px] tracking-[0.06em] text-graphite">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="mt-1.5">
            {site.address.name}, {site.address.street}, {site.address.locality},{' '}
            {site.address.region} {site.address.postalCode}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link
              href="/faq"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              Careers
            </Link>
          </li>
          <li>
            <Link
              href="/roadmap"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
              href="/partner-program"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              Partner program
            </Link>
          </li>
          <li>
            <Link
              href="/services#what-you-keep"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              What you keep
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ember-deep"
            >
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
