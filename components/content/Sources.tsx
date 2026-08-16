import type { Source } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'

// The Sources section (BUILD_SPEC §8.2). Rendered at the foot of any page that
// carries statistics; the same entries feed Article.citation in the schema.
export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null

  return (
    <section aria-labelledby="sources-heading" className="mt-16 border-t-2 border-ink pt-6">
      <SectionLabel as="h2" id="sources-heading">
        Sources
      </SectionLabel>
      <ol className="mt-4 space-y-2 text-sm text-graphite">
        {sources.map((s, i) => (
          <li key={s.url} className="flex gap-3">
            <span className="font-mono tabular text-rule-strong">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <a
                href={s.url}
                rel="nofollow noopener"
                target="_blank"
                className="text-ember-deep underline decoration-from-font underline-offset-2 transition-colors hover:text-ink"
              >
                {s.label}
              </a>
              <span className="text-rule-strong"> — accessed {s.accessed}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
