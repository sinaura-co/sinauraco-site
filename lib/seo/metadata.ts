import type { Metadata } from 'next'
import { site } from '../../content/site'

const ORIGIN = site.url

export const metadataBase = new URL(ORIGIN)

// Builds a complete per-page metadata block: self-referencing absolute
// canonical, full Open Graph set, full Twitter card, and the AEO robots
// directives (BUILD_SPEC §7.4). Every value is set explicitly — nothing falls
// back to a site default, which is exactly what QA §12 fails the build on.
export function pageMetadata(p: {
  title: string
  description: string
  path: string // absolute site path, e.g. '/services' or '/'
  ogType?: 'website' | 'article'
  image?: string
  imageAlt?: string
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const url = `${ORIGIN}${p.path === '/' ? '' : p.path}`
  // A per-page image (e.g. an article card) is used when supplied. Otherwise the
  // default is the generated on-brand card at `/og` (resolved absolute against
  // metadataBase). It is referenced EXPLICITLY here rather than left to the
  // opengraph-image file convention, because that convention does not merge into
  // a page that already declares its own `openGraph` object — so the tag would
  // silently go missing. The old `/og-default.png` default was a 404.
  const image = p.image ?? '/og'
  const imageAlt = p.imageAlt ?? `${site.name} — ${site.tagline}`

  return {
    metadataBase,
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      type: p.ogType ?? 'website',
      siteName: site.name,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(p.publishedTime ? { publishedTime: p.publishedTime } : {}),
      ...(p.modifiedTime ? { modifiedTime: p.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
      images: [image],
    },
  }
}
