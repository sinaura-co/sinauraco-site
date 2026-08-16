import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

// BUILD_SPEC §11. AI crawlers are named explicitly — the benchmark names none,
// leaving them ambiguous. `/portal-app` is the real creator app, distinct from
// the `/portal` marketing page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/portal-app', '/sign-in', '/sign-up'],
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
