import type { ReactNode } from 'react'

// Thin placeholder for routes whose real content lands in a later stage.
// Still fully on-identity so the shell can be reviewed end to end.
export function StagePlaceholder({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: ReactNode
  sub: string
}) {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-24 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">{eyebrow}</p>
      <h1 className="mt-6 font-sans text-5xl font-bold uppercase leading-[1.02] tracking-display text-ink md:text-7xl">
        {title}
      </h1>
      <p className="mt-8 max-w-measure text-xl leading-[1.5] tracking-body text-graphite">{sub}</p>
      <p className="mt-16 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-label text-graphite">
        In build — returns in a later stage
      </p>
    </main>
  )
}
