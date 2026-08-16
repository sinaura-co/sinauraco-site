// Careers copy — the chatter recruiting funnel. One role, stated straight.
// Honesty rules apply here too: we do NOT invent a pay figure, a fixed schedule,
// or a formal "training program" the owner hasn't confirmed — those are deferred
// to a direct conversation ("discussed with you"), which is also on-brand (we
// don't publish our own rate either). 18+ is real and load-bearing. The
// jobDescription below is what the JobPosting schema advertises, and it matches
// the visible page word-for-idea so the structured data stays honest.

export const CAREERS = {
  role: 'Creator Chat Specialist',
  eyebrow: 'Careers · Remote',
  lead: 'The roster only works because a real team runs the day-to-day. Chat specialists are the front line of that — the people who turn fan conversations into revenue, in the creator’s voice. It’s remote, it rewards people who are genuinely good with words and with people, and it’s where most of our hiring happens.',

  whatYouDo: {
    title: 'What you’d do',
    items: [
      'Handle fan messaging for the creators we manage — in their voice, inside guidelines they’ve approved.',
      'Turn conversations into sales: build rapport, read the room, and make the offer at the right moment.',
      'Keep regulars coming back — retention is the game, not one-off blasts.',
      'Log what’s working and flag what isn’t, so the reporting behind the roster stays honest.',
    ],
  },

  whoWereLookingFor: {
    title: 'Who we’re looking for',
    items: [
      'Genuinely strong written English — warm, sharp and human over text.',
      'A sales instinct: you notice buying signals and you’re comfortable making the ask.',
      'Reliability and discretion — you’re handling someone’s business and their audience.',
      'Comfortable with adult-industry context. 18+ only. (We manage non-adult creators too, so some work is SFW.)',
    ],
  },

  howItWorks: {
    title: 'How it works',
    items: [
      'Fully remote — work from wherever you are.',
      'How the role pays is discussed with you directly, before you start. We don’t post a number, but we won’t be vague about it either.',
      'You’re onboarded onto the systems and the voice guidelines before you handle a single conversation.',
      'Tell us your availability — we’ll be straight about the hours the role needs.',
    ],
  },

  // Plain-text advert for the JobPosting schema — matches the visible page.
  jobDescription:
    'Sinaura Collectives is hiring remote Creator Chat Specialists. You handle fan messaging for the creators we manage — in each creator’s voice, inside approved guidelines — turning conversations into revenue and keeping regulars coming back. We’re looking for strong written English, a real sales instinct, and people who are reliable and discreet. The role is fully remote and strictly 18+. Compensation and hours are discussed directly before you start. Apply through the form on this page.',
} as const
