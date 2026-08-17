// Resource library taxonomy (§G) — drives the filter tabs and the shareable
// ?category= URL keys. Modeled on the SirenCY blog architecture. Order here is
// display order; the filter injects an "All" default ahead of these. Hubs (and,
// later, individual articles) carry one of these ids so 300+ pieces drop into a
// structure instead of a pile. `content` has no guide yet — it renders an empty
// state until the first one lands.
export type ResourceCategory = 'monetization' | 'marketing' | 'agency' | 'content' | 'strategy'

export const RESOURCE_CATEGORIES: { id: ResourceCategory; label: string }[] = [
  { id: 'monetization', label: 'Monetization' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'agency', label: 'Agency' },
  { id: 'content', label: 'Content' },
  { id: 'strategy', label: 'Strategy' },
]
