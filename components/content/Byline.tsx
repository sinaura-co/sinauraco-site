import type { ContentDoc } from '@/lib/content'

// Renders a UTC date so build-time and reader time zones never disagree.
function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

type BylineDoc = Pick<
  ContentDoc,
  'author' | 'datePublished' | 'dateModified' | 'nextReview' | 'readingTime'
>

// The trust row (BUILD_SPEC §5.2 #2, §8.3). The forward-looking next-review date
// is the single strongest trust artifact in the audit — it reads as maintained.
export function Byline({ doc }: { doc: BylineDoc }) {
  const author = doc.author === 'organization' ? 'Sinaura Collectives' : doc.author
  const dot = <span aria-hidden className="text-rule-strong">·</span>

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-label text-graphite">
      <span className="text-ink">{author}</span>
      {dot}
      <span>Published {fmt(doc.datePublished)}</span>
      {dot}
      <span>Reviewed {fmt(doc.dateModified)}</span>
      {dot}
      <span>Next review {fmt(doc.nextReview)}</span>
      {dot}
      <span>{doc.readingTime} min read</span>
    </div>
  )
}
