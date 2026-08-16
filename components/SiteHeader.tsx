'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mark } from './Mark'
import { nav } from '@/content/nav'

// Layout shell — header, wearing the LIVE site's chrome (CLAUDE.md LAYOUT lock):
// the mark beside an inline single-line wordmark, a top-right mono text nav, and
// an ink "Apply Now" CTA. Transparent at the top of the page; past 60px it gains
// a blurred bone ground, a hairline, and tighter padding — the live nav's
// scrolled state. Mobile keeps the MENU/CLOSE word toggle (a standing decision,
// not the live hamburger). The parked stacked lockup is deliberately not used.
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b transition-all duration-500',
        scrolled
          ? 'border-rule bg-[var(--bone-glass)] py-[14px] backdrop-blur-[20px] backdrop-saturate-[1.1]'
          : 'border-transparent py-[22px]',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Sinaura Collectives — home"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <Mark size={28} />
          <span className="font-sans text-[15px] font-extrabold uppercase leading-none tracking-[-0.01em] text-ink">
            Sinaura Collectives<span className="text-ember">.</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[12px] uppercase tracking-label text-graphite transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="bg-ink px-[22px] py-[9px] font-mono text-[11px] uppercase tracking-label text-bone transition-transform duration-300 hover:-translate-y-px"
          >
            Apply Now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="font-mono text-[12px] uppercase tracking-label text-ink md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-rule bg-bone md:hidden">
          <ul className="mx-auto max-w-[1200px] px-6">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-sans text-2xl font-bold uppercase tracking-tight text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="inline-block bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-label text-bone"
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
