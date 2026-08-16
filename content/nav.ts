// Primary navigation — one route per destination. Argued IA (BRAND.md left the
// service-line structure to us): a single /services page with anchored
// Management / Growth / Ops sections, because the three lines are sold as one
// integrated offering ("Management, Growth, Ops") and three thin pages would
// dilute that. Resources is the content library (hubs + spokes); About and
// Contact close it out. NOTE: `/brands` still exists as a page — it was pulled
// from the top nav (15 Aug) for space, not deleted; link it elsewhere if wanted.

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'For Creators', href: '/creators' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export type NavItem = (typeof nav)[number]
