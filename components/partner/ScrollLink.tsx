'use client'

import { track } from '@/lib/analytics'
import type { MouseEvent, ReactNode } from 'react'

// In-page smooth-scroll link that ALSO moves keyboard/AT focus to the target
// section, respects reduced-motion, and fires the CTA analytics event. Falls back
// to native hash navigation if the target isn't found.
export function ScrollLink({
  to,
  children,
  variant = 'primary',
  cta,
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  cta: string
  className?: string
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    track('referral_cta_clicked', { cta })
    const el = document.getElementById(to.replace(/^#/, ''))
    if (!el) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
    window.history.replaceState(null, '', to)
  }

  const base =
    'group inline-flex items-center justify-center gap-2.5 border px-9 py-[16px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-500'
  const look =
    variant === 'primary'
      ? 'border-transparent bg-ink text-bone hover:-translate-y-0.5'
      : 'border-rule-strong bg-transparent text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bone'

  return (
    <a href={to} onClick={onClick} className={`${base} ${look} ${className}`}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
        &rarr;
      </span>
    </a>
  )
}
