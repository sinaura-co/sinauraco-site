import type { ReactNode } from 'react'
import { SectionLabel } from './SectionLabel'

// Shared masthead for the marketing pages (/about, /services, /creators,
// /brands, /contact): ember-ruled eyebrow, a display headline (pass an <em
// className="not-italic text-ember"> for the one scarce accent), and an optional
// lead paragraph. Keeps every page's header on one rhythm.
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}) {
  return (
    <header className="max-w-measure">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1 className="mt-5 font-sans text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-long text-ink">
        {title}
      </h1>
      {lead && <p className="mt-6 text-xl leading-[1.5] tracking-body text-graphite">{lead}</p>}
    </header>
  )
}
