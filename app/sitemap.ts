import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getAllDocs } from '@/lib/content'

// Every indexable static route that resolves today. Never list a URL that 404s,
// and never list a NOINDEX page: `/partner-program` and `/referrals` are omitted
// on purpose (they stay out of search until the program's launch gate clears),
// and `/styleguide` is an internal reference (noindex). Add `/partner-program`
// and `/referrals` here at launch, together with flipping their robots to index.
const STATIC_ROUTES = [
  '',
  '/about',
  '/services',
  '/creators',
  '/brands',
  '/contact',
  '/apply',
  '/faq',
  '/careers',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r}`,
  }))

  // Content-driven entries; lastmod from the doc's own dateModified (§11).
  const docEntries: MetadataRoute.Sitemap = getAllDocs().map((d) => ({
    url: `${site.url}${d.type === 'hub' ? `/resources/${d.slug}` : `/resources/${d.parentHub}/${d.slug}`}`,
    lastModified: d.dateModified,
  }))

  return [...staticEntries, ...docEntries]
}
