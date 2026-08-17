import Link from 'next/link'
import type { ReactNode } from 'react'
import { Mark } from '@/components/Mark'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/content/site'

// Focused conversion shell — deliberately NOT the full site chrome. Only the
// logo (→ home) and a single "Back to site" exit; the main nav is removed on
// purpose so the page has one job. The full site footer is kept for trust +
// legal links. Sits outside the (site) route group, like /styleguide.
export default function PartnerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <Link href="/" aria-label={`${site.name} — home`} className="flex shrink-0 items-center gap-3">
            <Mark size={26} />
            <span className="font-sans text-[15px] font-extrabold uppercase leading-none tracking-[-0.01em] text-ink">
              Sinaura Collectives<span className="text-ember">.</span>
            </span>
          </Link>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-label text-graphite transition-colors hover:text-ink"
          >
            &larr; Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  )
}
