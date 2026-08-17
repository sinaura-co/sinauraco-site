'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mark } from './Mark'
import { nav } from '@/content/nav'

// Header — a deliberately minimal masthead: wordmark left, and a top-right cluster
// of the Apply CTA + a MENU toggle that carries the FULL navigation at every width.
// Every route lives in the menu (the primary wayfinding surface) instead of a
// crowded inline bar. Transparent at the top of the page; past 60px it gains the
// live nav's blurred bone ground, a hairline, and tighter padding. On small
// screens the Apply CTA drops into the menu so the bar never crams.
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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

        <div className="flex items-center gap-4">
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="hidden bg-ink px-[18px] py-[9px] font-mono text-[11px] uppercase tracking-label text-bone transition-transform duration-300 hover:-translate-y-px sm:inline-flex"
          >
            Apply Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="inline-flex items-center font-mono text-[12px] uppercase tracking-label text-ink transition-colors hover:text-ember-deep"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav id="site-menu" aria-label="Primary" className="border-t border-rule bg-bone">
          <ul className="mx-auto max-w-[1200px] px-6 py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-sans text-xl font-bold uppercase tracking-tight text-ink transition-colors hover:text-ember-deep sm:text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-5 sm:hidden">
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
