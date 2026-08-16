import type { Faq as FaqItem } from '@/lib/content'

// Server-rendered FAQ. Answers are in the HTML on first load and each item is
// open by default, so the content is fully readable and crawlable with
// JavaScript disabled (BUILD_SPEC §6.1). A later client enhancement can collapse
// these into a single-open accordion; the crawlable baseline never depends on it.
// Each item gets a stable id for deep linking.
export function Faq({ items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string }) {
  if (!items.length) return null

  return (
    <section aria-label="Frequently asked questions" className="border-t border-rule">
      {items.map((item, i) => {
        const id = `${idPrefix}-${i + 1}`
        return (
          <details key={id} id={id} open className="border-b border-rule">
            <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 text-lg tracking-tight text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[11px] tabular tracking-label text-ember-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item.q}</span>
            </summary>
            <div className="max-w-measure pb-6 pl-[calc(1rem+1ch)] leading-[1.55] text-graphite">
              {item.a}
            </div>
          </details>
        )
      })}
    </section>
  )
}
