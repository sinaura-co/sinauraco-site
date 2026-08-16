import type { ElementType, ReactNode } from 'react'

// The live section label (.section-label): a mono, ember-deep, tracked eyebrow
// preceded by a short ember-deep hairline (.section-label::before). Used for
// every section heading across the content pages. `as` renders it as an <h2>
// where the document outline needs a heading, or a <p> for a plain eyebrow.
export function SectionLabel({
  children,
  as: Tag = 'p',
  id,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  id?: string
  className?: string
}) {
  return (
    <Tag
      id={id}
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep ${className}`}
    >
      <span aria-hidden className="h-px w-7 shrink-0 bg-ember-deep" />
      {children}
    </Tag>
  )
}
