import type { Faq } from '@/lib/content'

// Creator-facing FAQ — the questions creators actually ask before signing,
// answered straight. Single source of truth: the visible <Faq> and the FAQPage
// JSON-LD both read this array, so the structured data always matches what a
// reader sees (Google requires that). Answers follow the content rules: NO
// published commission rate (Amendment §3 — the number lives in the signed
// agreement, framed as "get the terms in writing"), NO guarantee about platform
// bans (a ban promise is a liability), no fabricated figures, no tenure claims.
// The 30-day notice is the resolved NOTICE_PERIOD value; "around the clock"
// mirrors the owner-approved /services copy rather than inventing a new claim.
export const CREATOR_FAQ: Faq[] = [
  {
    q: 'How much is the commission, and how is it calculated?',
    a: 'We’re paid a percentage of the revenue we manage for you — not a flat fee, and nothing up front. It’s calculated on what you actually earn, so we only get paid when you do. We don’t publish one headline rate, because the right structure depends on your situation; the exact percentage, and how it’s applied, is spelled out in your agreement, in writing, before you sign anything.',
  },
  {
    q: 'Are there any upfront fees?',
    a: 'No — no setup fee, no onboarding fee, no monthly retainer. Zero fixed costs. You’re charged a percentage of what you earn, so there’s no cost to start and nothing owed in a slow month.',
  },
  {
    q: 'How long am I locked in, and how do I leave?',
    a: 'There’s no long lock-in. Representation runs on a rolling basis, and you can leave with 30 days’ written notice — no exit fee. Your account, your content and your payouts stay yours the whole way through, so leaving just means you keep running everything you already own.',
  },
  {
    q: 'Who owns my account and my content?',
    a: 'You do — both. Your account stays in your name and your content stays yours, start to finish. We work through the platform’s own co-manager access, so nothing is ever transferred to us. If we part ways, you keep everything.',
  },
  {
    q: 'Do you need my password?',
    a: 'Never. We use the platform’s built-in co-manager (agency) access, which lets our team work on your account without ever seeing your login. You keep your password — we get the working access the platform is designed to hand a manager, and nothing more.',
  },
  {
    q: 'Who chats as me?',
    a: 'A trained team on our side handles fan messaging in your voice, inside guidelines you approve. It’s a core part of what management means here — the day-to-day messaging that turns fans into regulars, handled for you. You set the boundaries; we stay inside them, and you always see how your account is being run.',
  },
  {
    q: 'What hours are covered?',
    a: 'Fan messaging is handled around the clock — the platform never sleeps, so the coverage doesn’t either. The exact shift pattern is set with you, based on where your audience is and when they’re most active, and it’s agreed before you start.',
  },
  {
    q: 'What happens if I get banned?',
    a: 'Platform bans are ultimately the platform’s call, and no honest agency can promise they’ll never happen or guarantee a reinstatement. What we do is lower the risk — following platform rules and keeping your setup compliant — and if an account is actioned, we help you respond, appeal where that’s possible, and keep your income moving on other channels. We won’t pretend a ban is fully in our control, because it isn’t.',
  },
  {
    q: 'What do I get each week?',
    a: 'A weekly report on your numbers — revenue, growth and what actually moved — so you’re never guessing and never chasing us for an update. The reporting is the part most agencies keep vague; here it’s standard, because the infrastructure behind the roster is the real product.',
  },
  {
    q: 'Do you work with non-adult creators?',
    a: 'Yes. We manage lifestyle, fitness, fashion, gaming and other creators — not only adult. The playbook is the same across the board: grow the brand, run the day-to-day, and give you the numbers to prove it’s working. Representation is 18+ either way.',
  },
]
