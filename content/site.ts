// Typed content — components read from here so copy can move to a CMS later
// without touching markup. Naming rules (BRAND.md): "Sinaura Collectives LLC"
// is binding; "Sinaura Collectives" leads elsewhere; "SinauraCo" is social-only.

export const site = {
  name: 'Sinaura Collectives',
  legalName: 'Sinaura Collectives LLC',
  monogram: 'SC.',
  tagline: 'Management, Growth, Ops',
  location: 'New Jersey',
  email: 'contact@sinauraco.com',
  domain: 'sinauraco.com',
  // Apex is canonical; www 301s to it (Amendment 01 §1). Used in every @id,
  // canonical, sitemap URL and the AI files.
  url: 'https://sinauraco.com',
  // Registered-agent address (Amendment 01 §4), now resolved. Organization.address
  // schema and the site footer both render from these fields so the two match exactly.
  address: {
    name: 'ZenBusiness Inc.',
    street: '400 Riverview Plaza Suite 104',
    locality: 'Trenton',
    region: 'NJ',
    postalCode: '08611',
    country: 'US',
  },
  social: {
    // "SinauraCo" is sanctioned for social handles only
    instagram: '@sinauraco',
    instagramUrl: 'https://instagram.com/sinauraco',
  },
} as const

export type Site = typeof site
