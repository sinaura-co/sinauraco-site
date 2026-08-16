// Content for /roadmap ("The Creator Roadmap"). Data lives here — the content/*.ts
// convention (see faq.ts, careers.ts, partner-program.ts) — so the page file stays
// presentation-only. Prose uses real typographic characters (curly quotes, en/em
// dashes) directly, matching the services.ts-style content strings.
//
// Honesty notes (enforced in the copy below):
// - The source mock's unsourced "3–10x growth" line is deliberately softened here
//   to a hedged, numberless version (CLAUDE.md: never publish an unsourced number).
//   Do NOT reintroduce a growth multiple unless it can be sourced.
// - The Month-3–4 "revenue settles at a higher floor" line is qualitative on
//   purpose — no figure implied.

export type Stat = { num: string; label: string }
export type Day = { day: string; job: string; rest?: boolean }
export type Pillar = { n: string; name: string; role: string; items: string[] }
export type Platform = { name: string; role: string; desc: string; items: string[] }
export type TimelineStep = { n: string; when: string; title: string; desc: string }
export type TeamArea = { n: string; title: string; items: string[] }

export const STATS: Stat[] = [
  { num: '7', label: 'Day operating week' },
  { num: '3', label: 'Content pillars' },
  { num: '6+', label: 'Platforms covered' },
  { num: '6–9', label: 'Months to scale' },
]

export const TRUTHS: string[] = [
  'Fresh daily traffic from platforms you treat as channels',
  'Followers who actually resonate — not just volume',
  'Back-end offers: bundles, premium tiers, experiences',
]

export const WEEK: Day[] = [
  { day: 'Sun', job: 'Planning' },
  { day: 'Mon', job: 'Bulk creation' },
  { day: 'Tue', job: 'Editing' },
  { day: 'Wed', job: 'Live + connect' },
  { day: 'Thu', job: 'Off day', rest: true },
  { day: 'Fri', job: 'Traffic push' },
  { day: 'Sat', job: 'Flex day' },
]

export const METHOD: string[] = [
  'Shoot 3–4 short videos in one look before changing anything',
  'Capture a structured photo set at every layer of that look',
  'Repeat with new looks until you’re a full week ahead — then stop',
]

export const PILLARS: Pillar[] = [
  {
    n: '01',
    name: 'Personality',
    role: 'Who you are off-camera',
    items: ['Street and public interviews', 'Day-in-the-life vlogs', 'Podcast and long-form clips'],
  },
  {
    n: '02',
    name: 'Aesthetic',
    role: 'The look they follow you for',
    items: ['Outfit transitions', 'Edited aesthetic sequences', 'POV and scene-driven content'],
  },
  {
    n: '03',
    name: 'Entertainment',
    role: 'The reason they stay',
    items: ['Gym and routine content', 'Reactions and commentary', 'Skits and comedy'],
  },
]

export const PLATFORMS: Platform[] = [
  {
    name: 'Instagram',
    role: 'The trust hub',
    desc: 'Where people decide whether you’re real and worth following long-term. Everything else funnels here to be validated.',
    items: [
      '3–5 reels per day for reach',
      'Daily stories — where relationships form',
      '1–2 lives per week to warm cold traffic',
      'Link to a domain you own, never a shared tool',
    ],
  },
  {
    name: 'TikTok',
    role: 'The lab',
    desc: 'Where you test ideas cheaply and let the algorithm find the people who respond to your specific energy.',
    items: [
      '2–4 posts per day while you’re dialing in',
      'Optimise for energy and relatability, not polish',
      '2–4 lives per week to warm the account',
      'Send traffic to Instagram first, never straight to the offer',
    ],
  },
  {
    name: 'Reddit',
    role: 'High intent',
    desc: 'Nobody lands here by accident. People actively choose to click, which makes this traffic convert differently than passive scrolling.',
    items: [
      'Warm accounts up before you promote anything',
      '1–3 posts per day across different communities',
      'Follow each community’s rules exactly — no shortcuts',
      'Route to a landing page, not a direct offer link',
    ],
  },
  {
    name: 'X / Twitter',
    role: 'Personality engine',
    desc: 'Your written voice. The cheapest way to stay in someone’s feed every day without producing a single video.',
    items: [
      'Short thoughts and observations, posted often',
      'Reply to larger accounts in your niche daily',
      'Thread-style storytelling for reach spikes',
      'Pin your owned domain to the profile',
    ],
  },
]

export const TRAP: string[] = [
  'Reputation damage when other users on it get flagged',
  'Suppressed reach and lost discovery',
  'Random safety flags when you’re completely clean',
]

export const FIX: string[] = [
  'Zero shared-reputation risk',
  'Full tracking and analytics on every click',
  'A brand presence that reads professional, not templated',
]

export const STRIKES: string[] = ['shared-domain risk', 'guessing where your traffic came from']

export const TIMELINE: TimelineStep[] = [
  {
    n: '01',
    when: 'Month 1',
    title: 'Foundation',
    desc: 'Systems get cleaned up, the funnel gets fixed, new habits get built. Very little visible from the outside.',
  },
  {
    n: '02',
    when: 'Month 2',
    title: 'Momentum',
    desc: 'The audience starts responding differently. Certain videos land harder than anything you’ve posted before.',
  },
  {
    n: '03',
    when: 'Months 3–4',
    title: 'Patterns',
    desc: 'You can finally read what works and repeat it on purpose. Revenue settles at a higher floor.',
  },
  {
    n: '04',
    when: 'Months 6–9',
    title: 'Scale',
    desc: 'With genuine consistency, real compounding growth becomes realistic — because the system builds on itself instead of resetting every month.',
  },
]

export const TEAM: TeamArea[] = [
  {
    n: '01',
    title: 'Content operations',
    items: [
      'Editing and repurposing one shoot into every format',
      'Daily posting and scheduling across every platform',
      'Hook writing, story structure, and approval flow',
    ],
  },
  {
    n: '02',
    title: 'Fan relations & sales',
    items: [
      'Trained chatters covering your inbox on a real schedule',
      'A tested sales framework, not improvised conversations',
      'Identifying and protecting your highest-value buyers',
    ],
  },
  {
    n: '03',
    title: 'Growth & traffic',
    items: [
      'Weekly reporting you can actually read and act on',
      'Funnel testing and conversion optimisation',
      'Collaboration outreach, vetting, and logistics',
    ],
  },
]
