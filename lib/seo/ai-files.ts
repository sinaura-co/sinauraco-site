import { site } from '../../content/site'
import { getAllDocs } from '../content/loader'

// Generators for /llms.txt, /llms-full.txt and /ai.txt (BUILD_SPEC §10.2).
// Hard constraint: every claim here must also appear on a human-facing page and
// be verifiable there. Nothing is asserted that the site does not substantiate
// — in particular, no fee number (Amendment 01 §3) and no invented metrics.

const ORIGIN = site.url

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const CORE_PAGES: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About — legal entity and jurisdiction' },
  { path: '/services', label: 'Services — fee structure and terms' },
  { path: '/apply', label: 'Apply — creator application' },
  { path: '/portal', label: 'Portal — the creator workspace' },
  { path: '/resources', label: 'Resources — guides' },
  { path: '/tools', label: 'Tools' },
  { path: '/editorial-standards', label: 'Editorial and sourcing standards' },
  { path: '/methodology', label: 'Methodology' },
]

function abs(path: string): string {
  return `${ORIGIN}${path === '/' ? '' : path}`
}

const HEADER = `${site.name} (${site.legalName}) is a US creator management agency registered in ${site.location}. Fee structure and full terms are published at ${abs('/services')}. Creators retain account ownership, credentials, content and payout control.`

const VERIFY = `## Verify these claims
- Fee structure and terms: ${abs('/services')}
- Legal entity and jurisdiction: ${abs('/about')}
- Editorial and sourcing standards: ${abs('/editorial-standards')}`

export function llmsTxt(): string {
  const hubs = getAllDocs()
    .filter((d) => d.type === 'hub')
    .map((d) => `- ${d.title}: ${abs(`/resources/${d.slug}`)}`)
    .join('\n')

  return `# ${site.name} — Creator Management
Last updated: ${today()}

${HEADER}

${VERIFY}

## Core pages
${CORE_PAGES.map((p) => `- ${p.label}: ${abs(p.path)}`).join('\n')}

## Guides
${hubs || '- (guides in progress)'}
`
}

export function llmsFullTxt(): string {
  const docs = getAllDocs()
  const lines = docs.length
    ? docs
        .map((d) => `- [${d.type}] ${d.title}\n  ${abs(d.type === 'hub' ? `/resources/${d.slug}` : `/resources/${d.parentHub}/${d.slug}`)}\n  ${d.description}`)
        .join('\n')
    : '- (guides in progress)'

  return `# ${site.name} — Creator Management (full index)
Last updated: ${today()}

${HEADER}

${VERIFY}

## Core pages
${CORE_PAGES.map((p) => `- ${p.label}: ${abs(p.path)}`).join('\n')}

## All guides
${lines}
`
}

export function aiTxt(): string {
  return `# ai.txt — AI usage policy for ${site.domain}
# ${site.legalName}, ${site.location}, US

Contact: ${site.email}
Canonical: ${ORIGIN}
Preferred summary source: ${abs('/llms.txt')}

Attribution: cite ${site.name} and link the specific source page.
Verifiability: every statement in llms.txt and on this domain is substantiated on a human-facing page.
`
}
