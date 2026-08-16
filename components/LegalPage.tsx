import type { ReactNode } from 'react'

// Shared frame for the ported legal pages (/privacy, /terms). The body copy is
// reproduced VERBATIM from the live site (legacy/{privacy,terms}.html) inside
// `children`; this component only supplies the on-brand masthead and the
// `.legal-prose` typography (globals.css). The single ember accent lands on the
// title's second word — the one permitted accent per composition (BRAND).
export function LegalPage({
  title,
  accent,
  updated,
  children,
}: {
  title: string
  accent: string
  updated: string
  children: ReactNode
}) {
  return (
    <main className="mx-auto max-w-[800px] px-6 pb-24 pt-16 md:pt-20">
      <h1 className="font-sans text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-long text-ink">
        {title} <span className="text-ember">{accent}</span>
      </h1>
      <p className="mt-2 font-counter text-[15px] italic text-graphite">Last Updated: {updated}</p>
      <div className="legal-prose mt-12">{children}</div>
    </main>
  )
}
