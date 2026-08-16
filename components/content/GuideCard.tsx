import Link from 'next/link'
import type { ReactNode } from 'react'

// The live card treatment (.service-card / .result-stat): a paper surface with a
// hairline border that lifts and gains an ink border on hover, an ember-deep mono
// index, and a bottom ink accent bar that wipes in on hover. Used for every
// navigation card in the resource pages (hub index, in-this-guide, more-guides,
// siblings). When `href` is omitted the card is inert (a not-yet-live hub).
export function GuideCard({
  href,
  index,
  eyebrow,
  title,
  desc,
  footer,
}: {
  href?: string
  index?: string
  eyebrow?: string
  title: string
  desc?: string
  footer?: ReactNode
}) {
  const inner = (
    <div className="group relative flex h-full flex-col overflow-hidden border border-rule bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink">
      {index && (
        <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
          {index}
        </span>
      )}
      {eyebrow && (
        <p
          className={`font-mono text-[11px] uppercase tracking-label text-graphite ${index ? 'mt-5' : ''}`}
        >
          {eyebrow}
        </p>
      )}
      <h3
        className={`font-sans text-xl font-bold leading-snug tracking-tight text-ink ${index || eyebrow ? 'mt-3' : ''}`}
      >
        {title}
      </h3>
      {desc && <p className="mt-2 leading-[1.55] text-graphite">{desc}</p>}
      {footer && (
        <div className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-label">{footer}</div>
      )}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
      />
    </div>
  )

  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  )
}
