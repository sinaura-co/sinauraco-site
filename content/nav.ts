// Primary navigation — one route per destination. Per the cleanup spec the menu
// is the primary wayfinding surface and carries the full set: the offering
// (Services, For Creators, Resources, Referral Program) then company/support
// (About, Careers, FAQ) and Contact to close. `/services` keeps its anchored
// Management / Growth / Ops sections rather than three thin pages. NOTE: `/brands`
// still exists as a page — it was pulled from the top nav (15 Aug) for space, not
// deleted; link it elsewhere if wanted.

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'For Creators', href: '/creators' },
  { label: 'Resources', href: '/resources' },
  { label: 'Referral Program', href: '/referrals' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export type NavItem = (typeof nav)[number]
