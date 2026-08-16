import Link from 'next/link'
import type { ComponentProps } from 'react'
import type { MDXComponents } from 'mdx/types'

// Brand element map for rendered MDX bodies. Tokens only — no hardcoded colour,
// no rounded corners. Links use ember-deep (the on-bone link colour); the scarce
// pure-ember accent is reserved for the ShortAnswer rule, not body prose.
export const mdxComponents: MDXComponents = {
  h2: (p: ComponentProps<'h2'>) => (
    <h2 className="mt-14 scroll-mt-24 text-2xl font-bold tracking-tight text-ink md:text-3xl" {...p} />
  ),
  h3: (p: ComponentProps<'h3'>) => (
    <h3 className="mt-10 text-xl font-bold tracking-tight text-ink" {...p} />
  ),
  p: (p: ComponentProps<'p'>) => <p className="mt-5 leading-[1.65] text-graphite" {...p} />,
  ul: (p: ComponentProps<'ul'>) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-graphite marker:text-ember-deep" {...p} />
  ),
  ol: (p: ComponentProps<'ol'>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-graphite marker:text-graphite" {...p} />
  ),
  li: (p: ComponentProps<'li'>) => <li className="pl-1 leading-[1.6]" {...p} />,
  a: ({ href = '#', children, ...rest }: ComponentProps<'a'>) => (
    <Link
      href={href}
      className="text-ember-deep underline decoration-from-font underline-offset-2 transition-colors hover:text-ink"
      {...rest}
    >
      {children}
    </Link>
  ),
  strong: (p: ComponentProps<'strong'>) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote className="mt-6 border-l-2 border-rule-strong pl-5 italic text-graphite" {...p} />
  ),
  hr: () => <hr className="my-12 border-0 border-t border-rule" />,
  table: (p: ComponentProps<'table'>) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p: ComponentProps<'th'>) => (
    <th className="border-b-2 border-ink px-3 py-2 text-left font-mono text-[11px] uppercase tracking-label text-ink" {...p} />
  ),
  td: (p: ComponentProps<'td'>) => (
    <td className="border-b border-rule px-3 py-2 align-top text-graphite" {...p} />
  ),
}
