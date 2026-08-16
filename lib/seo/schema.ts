import { site } from '../../content/site'
import type { Source, Faq } from '../content/schema'

// Absolute origin, apex host, used in every @id (Amendment 01 §1 canonicals).
const ORIGIN = site.url
const ORG_ID = `${ORIGIN}/#organization`
const WEBSITE_ID = `${ORIGIN}/#website`

// The entity @graph — declared once on the homepage, referenced by @id
// everywhere else (BUILD_SPEC §7.1). No `founder`, no `foundingDate`, no
// `Person` node (Amendment 01 §1c, §2). The single entity is typed as BOTH
// Organization and LocalBusiness — one node, one @id — which is the correct way
// to say "this org is a NJ business", rather than a second, duplicate node. The
// registered-agent PostalAddress (§4, resolved) carries the New Jersey location;
// NJ stays in this verification context, never in marketing copy. `logo` resolves
// to the generated /logo route (the locked mark on bone).
export function organizationGraph() {
  const sameAs = [site.social.instagramUrl].filter(Boolean)
  const org: Record<string, unknown> = {
    '@id': ORG_ID,
    '@type': ['Organization', 'LocalBusiness'],
    name: site.name,
    legalName: site.legalName,
    url: ORIGIN,
    logo: { '@type': 'ImageObject', url: `${ORIGIN}/logo`, width: 1024, height: 1024 },
    image: `${ORIGIN}/logo`,
    areaServed: 'US',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.email,
      areaServed: 'US',
    },
  }
  if (sameAs.length) org.sameAs = sameAs
  // Registered-agent address, resolved (Amendment 01 §4). Matches the footer exactly.
  org.address = {
    '@type': 'PostalAddress',
    name: site.address.name,
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      { '@id': WEBSITE_ID, '@type': 'WebSite', url: ORIGIN, name: site.name, publisher: { '@id': ORG_ID } },
      {
        '@id': `${ORIGIN}/#webpage`,
        '@type': 'WebPage',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
      },
    ],
  }
}

// Article — author and publisher both point at the Organization (never a
// Person), per Amendment 01 §2.2 / BUILD_SPEC §7.3.
export function articleSchema(p: {
  title: string
  description: string
  route: string
  image?: string
  datePublished: string
  dateModified: string
  sources?: Source[]
}) {
  const url = `${ORIGIN}${p.route}`
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    datePublished: p.datePublished,
    dateModified: p.dateModified,
  }
  if (p.image) node.image = p.image.startsWith('http') ? p.image : `${ORIGIN}${p.image}`
  if (p.sources?.length)
    node.citation = p.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url }))
  return node
}

// Breadcrumbs — full, untruncated names (BUILD_SPEC §7.5).
export function breadcrumbSchema(items: { name: string; route: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.route}`,
    })),
  }
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Tools carry SoftwareApplication (BUILD_SPEC §7.2). No `priceCurrency` /
// `Offer` price — Amendment 01 §3.2 bans price markup sitewide; a free tool
// declares `isAccessibleForFree` instead.
export function softwareApplicationSchema(p: { name: string; description: string; route: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    description: p.description,
    url: `${ORIGIN}${p.route}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
  }
}

// /services carries a Service node — provider is the Organization, area served
// US. Deliberately NO `Offer`, `priceSpecification`, or `priceCurrency`: the fee
// STRUCTURE is published, never a number (Amendment 01 §3.2, CLAUDE.md content
// rules). A Service without offers is valid and honest.
export function serviceSchema(p: { name: string; description: string; route: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    description: p.description,
    url: `${ORIGIN}${p.route}`,
    serviceType: 'Creator management',
    provider: { '@id': ORG_ID },
    areaServed: 'US',
  }
}

// /careers carries a JobPosting. Honest fields only — no fabricated baseSalary,
// employmentType, or validThrough (CLAUDE.md: never fabricate). `datePosted` is
// the build date, which is genuinely when this deploy posted the role, not an
// invented one. The role is remote; `applicantLocationRequirements` mirrors the
// site's consistent US scope (contactPoint/Service areaServed = US) — broaden it
// if the owner hires internationally.
export function jobPostingSchema(p: {
  title: string
  description: string
  route: string
  datePosted: string
  employmentType?: string
}) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: p.title,
    description: p.description,
    datePosted: p.datePosted,
    url: `${ORIGIN}${p.route}`,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.legalName,
      url: ORIGIN,
      sameAs: ORIGIN,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: { '@type': 'Country', name: 'US' },
  }
  if (p.employmentType) node.employmentType = p.employmentType
  return node
}

// /editorial-standards — WebPage + AboutPage, never ProfilePage (Amendment 01
// §2.2: a ProfilePage without a Person mainEntity is semantically wrong).
export function aboutPageSchema(p: { title: string; description: string; route: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': ['WebPage', 'AboutPage'],
    name: p.title,
    description: p.description,
    url: `${ORIGIN}${p.route}`,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  }
}
