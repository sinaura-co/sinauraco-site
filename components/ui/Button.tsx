import Link from 'next/link'
import type { ReactNode } from 'react'

// The live square workhorse button (.btn). Primary is the ink fill; ghost is the
// outline that fills ink on hover. Both lift 2px and slide the trailing arrow.
// Square by system (borderRadius:{none} in the theme). Renders as a next/link
// for internal routes, or a plain anchor when `external`.
export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
}) {
  const base =
    'group inline-flex items-center gap-2.5 border px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-500'
  const look =
    variant === 'primary'
      ? 'border-transparent bg-ink text-bone hover:-translate-y-0.5'
      : 'border-rule-strong bg-transparent text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-bone'
  const content = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
        &rarr;
      </span>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={`${base} ${look} ${className}`}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={`${base} ${look} ${className}`}>
      {content}
    </Link>
  )
}
