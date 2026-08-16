import Link from 'next/link'

export type Crumb = { name: string; route: string }

// Visual breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
// separately by the page (BUILD_SPEC §7.5) with the same, untruncated names.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-label text-graphite">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.route} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden className="text-rule-strong">
                  /
                </span>
              )}
              {last ? (
                <span className="text-ink" aria-current="page">
                  {it.name}
                </span>
              ) : (
                <Link href={it.route} className="transition-colors hover:text-ink">
                  {it.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
