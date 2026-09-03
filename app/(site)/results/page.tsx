import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import { ResultsSection } from '@/components/results/ResultsSection'

// A standalone, indexable home for the proof that previously lived only at the
// homepage `/#results` anchor — so it can be linked, shared, and advertised against
// on its own URL. Reuses the same <ResultsSection> (self-contained: own eyebrow,
// H2, and figures), so the numbers can never drift between here and the homepage.
export const metadata: Metadata = pageMetadata({
  title: 'Results',
  description:
    'Real before-and-after monthly earnings for three managed creators — a new account, a self-managed year, and a damaged-account recovery — taken from platform statements.',
  path: '/results',
})

export default function ResultsPage() {
  return (
    <main>
      <ResultsSection />
    </main>
  )
}
