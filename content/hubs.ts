import type { HubSlug } from '@/lib/content'

// Display metadata for the five hubs (BUILD_SPEC §5.1). Kept separate from the
// MDX so the /resources index and cross-hub links render before every hub has
// been written. `compliance` leads — it is the priority build and the clearest
// whitespace in the competitive set.
export type HubMeta = {
  slug: HubSlug
  title: string
  question: string
}

export const HUB_META: HubMeta[] = [
  {
    slug: 'compliance',
    title: 'Safety, Privacy, Tax & Legal for US Creators',
    question: 'How do I not get hurt doing this?',
  },
  {
    slug: 'agency-selection',
    title: 'Choosing a Creator Management Agency',
    question: 'How do I know if an agency is legit?',
  },
  {
    slug: 'pricing',
    title: 'Agency Pricing, Commission & Contracts',
    question: 'What does this cost, and what am I signing?',
  },
  {
    slug: 'getting-started',
    title: 'Starting & Scaling as a Creator',
    question: 'What do I actually do first?',
  },
  {
    slug: 'growth',
    title: 'Traffic, Marketing & Retention',
    question: 'How do I get and keep subscribers?',
  },
]

export function hubMeta(slug: string): HubMeta | undefined {
  return HUB_META.find((h) => h.slug === slug)
}
