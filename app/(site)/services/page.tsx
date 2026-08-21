import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { serviceSchema, softwareApplicationSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { WhatYouKeep } from '@/components/WhatYouKeep'
import { PackagesCarousel } from '@/components/services/PackagesCarousel'

// /services — the managed-chatting page. One service, explained rather than sold.
// Full-width main; each section owns its container so the ink grounds (§5, §11)
// can bleed edge-to-edge. Accent scarcity is enforced per section: at most one
// bright ember (bone grounds) or ember-light (ink grounds) element each — ember-deep
// is the standard link/eyebrow colour and is not counted as the scarce accent.

const DESCRIPTION =
  'We run managed chatting for content creators — real people, structured shifts, in your voice, no AI. Start with a free page audit, no obligation.'

export const metadata: Metadata = pageMetadata({
  title: 'Managed chatting for creators',
  description: DESCRIPTION,
  path: '/services',
})

const crumbs = [
  { name: 'Home', route: '/' },
  { name: 'Services', route: '/services' },
]

const RUN_IT: { head: string; body: string }[] = [
  {
    head: 'Shifts, not an inbox queue',
    body: 'Most accounts treat chatting as replying — a fan writes, someone answers eventually. We run structured shifts with proactive outreach woven through every hour. A shift starts by reading the previous chatter’s handoff and ends by writing the next one.',
  },
  {
    head: 'Coverage that matches buying hours',
    body: 'Fans do not buy on a nine-to-five. Coverage is built around when your specific audience is actually awake and spending, not around a generic follow-the-sun template.',
  },
  {
    head: 'Segmentation underneath everything',
    body: 'New subscribers, active buyers, lapsed fans, and long-term high spenders are four different audiences who should never receive the same message. Everything we send sits on top of that split.',
  },
  {
    head: 'Continuity across people',
    body: 'Every detail a fan shares is logged. Whoever is on shift can pick up a conversation from three weeks ago cold, without asking the fan to repeat themselves and without contradicting what someone else said.',
  },
]

const VOICE_STEPS: { n: string; head: string; body: string }[] = [
  {
    n: '01',
    head: 'Profiling',
    body: 'A recorded call, roughly ninety minutes, that captures far more than a content list. Your actual vocabulary and the phrases you repeat. Your humour. Your hard limits and the things you will not do at any price. Your pricing floor. Your timezone, your schedule, the trip you are taking next month. It becomes one document, and it is the only brief the team works from.',
  },
  {
    n: '02',
    head: 'Voice matching',
    body: 'Before anyone touches a live conversation, they read your existing messages and work against practice scenarios until their drafts sound like you rather than like a script. Somebody who does not clear that step does not get assigned to your page.',
  },
  {
    n: '03',
    head: 'Supervised go-live',
    body: 'The first stretch of conversations on a new page is reviewed message by message by a senior operator — tone, pricing discipline, and whether the details being logged are consistent enough for someone else to inherit. Anything below standard gets corrected the same day, not at a monthly review.',
  },
]

const MANAGE_TOWARD: string[] = [
  'Response time during active conversations',
  'Conversion from subscriber to first purchase',
  'Repeat purchase rate per paying fan',
  'Renewal and retention over months, not weeks',
  'Lifetime value per fan',
  'Chargeback and refund rate as a hard ceiling',
]

const WONT_CHASE: string[] = [
  'A chatting ratio inflated by pressure selling',
  'Any single month’s revenue at the cost of the next six',
  'Message volume as a proxy for effort',
  'Total sends, which measures activity, not results',
]

const PRICING: { head: string; body: string }[] = [
  {
    head: 'Net, never gross',
    body: 'The platform takes twenty percent before you see anything. Our percentage is calculated on what is left. Some agencies quote against gross, which sounds like a lower number and is not — it takes a larger share of what actually reaches you. If any agency cannot answer “gross or net” instantly and in writing, that is the answer.',
  },
  {
    head: 'Scope sets the rate',
    body: 'Your rate depends on what we are actually doing. A creator who already has an audience does not carry the cost of building one, and should not pay as though she does. A page starting from zero is a different amount of work and a different number. That is the entire logic.',
  },
  {
    head: 'What we do not charge for',
    body: 'No setup fee. No onboarding fee. No monthly retainer, no minimums, no platform fees. We invoice after revenue exists, and if we produce nothing we invoice nothing. Nobody should be paying an agency before that agency has earned anything.',
  },
  {
    head: 'When it ends, it ends',
    body: 'No trailing commission. If we stop working together, we stop being paid — including on fans acquired while we were working. Some contracts do not work this way. Read yours.',
  },
]

const WONT_DO: string[] = [
  'We will not run four platforms at full intensity. Chat time is the scarcest thing in this business, and splitting it evenly across platforms takes revenue from the one that pays best. One primary account gets the full operation; a second runs lighter, deliberately.',
  'We will not cross a limit you set because a fan offered more money. Your no-go list is a floor, not an opening position.',
  'We will not sell below your pricing floor to close a slow day.',
  'We will not put AI on your page.',
  'We will not take a commission after our agreement ends.',
  'We will not send fans to a channel you have not agreed to, and we will not build a relationship with your audience that belongs to us instead of you.',
  'We will not take on a page we do not think we can move. If the audit says the constraint is something other than chatting, we will tell you that instead of selling you chatting.',
]

const CONTAINER = 'mx-auto max-w-[1120px] px-6'
const PROSE = 'max-w-measure text-lg leading-[1.55] text-graphite'

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: 'Managed chatting for content creators',
          description: DESCRIPTION,
          route: '/services',
        })}
      />
      <JsonLd
        data={softwareApplicationSchema({
          name: 'Take-home calculator',
          description:
            'Model any management rate against your own monthly earnings to see your take-home. Not a quote or earnings projection.',
          route: '/services',
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* ── 1 · HERO ── the single ember element is the rule under the eyebrow ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} flex min-h-[86vh] flex-col justify-center py-24`}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
            Managed chatting for creators
          </p>
          <span aria-hidden className="mt-5 block h-0.5 w-16 bg-ember" />
          <h1 className="mt-8 max-w-[15ch] font-sans text-[clamp(2.5rem,7.5vw,5rem)] font-bold uppercase leading-[0.98] tracking-display text-ink">
            Your inbox is the business.
          </h1>
          <div className="mt-8 max-w-measure space-y-4 text-lg leading-[1.55] tracking-body text-graphite md:text-xl">
            <p>
              Subscriptions are the entry ticket. Almost everything a page earns is closed in direct
              messages — and that is a full-time sales job running on a clock that never stops.
            </p>
            <p>We run that job. Real people, structured shifts, in your voice, on your terms.</p>
          </div>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Button href="/contact?topic=page-audit" variant="primary">
              Request a page audit
            </Button>
            <a
              href="#how-we-run-it"
              className="group inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep"
            >
              See how we work
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5">
                &darr;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2 · WHY THE INBOX IS THE BUSINESS ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">Why the inbox is the business</SectionLabel>
          <div className={`mt-8 space-y-6 ${PROSE}`}>
            <p>
              Three things make direct messages different from everything else on a subscription
              platform.
            </p>
            <p>
              There is no cap on what can be sold inside a conversation. A feed post is published
              once. A conversation can carry an offer today, tomorrow, and the day after that, each
              one priced to the person reading it.
            </p>
            <p>
              The close happens privately. Scarcity, timing, and attention all work harder
              one-to-one than they do in public.
            </p>
            <p>
              And chat is not throttled the way a feed is. Reach into a fan who already subscribed is
              uncapped — the only limit is whether someone is there to use it.
            </p>
            <p>
              That is the whole argument. The inbox is not customer service attached to a content
              business. It is the sales floor, and the content is what gets sold on it.
            </p>
          </div>
          <p className="mt-10 max-w-measure border-l-2 border-rule-strong pl-5 font-counter text-xl italic leading-[1.5] text-graphite">
            Most pages are not underperforming because the content is wrong. They are
            underperforming because nobody is working the room.
          </p>
        </div>
      </section>

      {/* ── 3 · PACKAGES (the services) ── carousel (one ember: the active dot) + separate Card 4 ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">Where to start</SectionLabel>
          <p className={`mt-8 ${PROSE}`}>
            Four ways to work with us. Most creators start narrow and widen once the inbox is
            producing.
          </p>

          <PackagesCarousel />

          {/* Card 4 — a different buyer; deliberately set apart from the carousel */}
          <div className="mt-16 max-w-[44rem] border border-rule-strong bg-bone p-8 md:p-10">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
              04 &mdash; For agencies, not creators
            </p>
            <h3 className="mt-4 font-sans text-2xl font-bold uppercase tracking-display text-ink">
              Chatting Bench
            </h3>
            <p className="mt-3 max-w-measure leading-[1.55] text-graphite">
              A trained chatting team working inside your existing systems, under your brand, with a
              team lead, quality scoring, and shift reporting.
            </p>
            <Link
              href="/contact?topic=agency"
              className="mt-6 inline-flex items-center gap-2 self-start border-b border-ink pb-1 font-mono text-[11px] font-semibold uppercase tracking-label text-ink transition-colors duration-200 hover:border-ember-deep hover:text-ember-deep"
            >
              Talk to us about agency partnerships
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 · HOW WE RUN IT ── (anchor target for "See how we work") ── */}
      <section id="how-we-run-it" className="scroll-mt-24 border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">How we run it</SectionLabel>
          <div className="mt-10 divide-y divide-rule border-y border-rule">
            {RUN_IT.map((b) => (
              <div key={b.head} className="grid gap-2 py-8 md:grid-cols-[1fr_1.9fr] md:gap-10">
                <h3 className="font-sans text-xl font-bold tracking-tight text-ink">{b.head}</h3>
                <p className="max-w-measure leading-[1.55] text-graphite">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · HOW WE LEARN YOUR VOICE ── ember-deep numerals, ink headings ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">How we learn your voice</SectionLabel>
          <p className={`mt-8 ${PROSE}`}>
            This is the part most operations skip, and it is the reason most outsourced chatting
            reads as outsourced. A fan can tell within about three messages when the person writing
            is not the person they subscribed to.
          </p>
          <ol className="mt-12 space-y-10">
            {VOICE_STEPS.map((s) => (
              <li key={s.n} className="grid gap-3 md:grid-cols-[auto_1fr] md:gap-8">
                <span
                  aria-hidden
                  className="font-mono text-2xl font-semibold leading-none text-ember-deep tabular"
                >
                  {s.n}
                </span>
                <div className="max-w-measure">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-ink">{s.head}</h3>
                  <p className="mt-3 leading-[1.55] text-graphite">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-measure text-lg font-medium leading-[1.55] text-ink">
            The document is yours. If we stop working together, you keep it.
          </p>
        </div>
      </section>

      {/* ── 6 · EVERYTHING HUMAN. NO AI. ── ink ground, single ember-light rule ── */}
      <section className="bg-ink text-bone">
        <div className={`${CONTAINER} py-24 md:py-32`}>
          <span aria-hidden className="block h-0.5 w-16 bg-ember-light" />
          <h2 className="mt-8 max-w-[16ch] font-sans text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[1.0] tracking-display text-bone">
            Everything human. No AI.
          </h2>
          <div className="mt-10 max-w-measure space-y-6 text-lg leading-[1.55] text-bone">
            <p>
              There is no AI writing messages on your page. Not drafting, not suggesting, not
              handling the conversations someone decided were low-value. Every message a fan receives
              was written by a person who read what that fan said.
            </p>
            <p>
              We understand the argument for the alternative. Automated chat is cheaper, it scales
              without hiring, and on a spreadsheet it looks like the obvious decision.
            </p>
            <p>
              Here is why we did not make it. The thing being sold is a relationship with a specific
              person. The moment a fan senses that the person is not there, the product stops being
              what they paid for — and they generally do not announce that they noticed. They just
              stop buying.
            </p>
            <p>
              Fans who feel handled by software churn. Fans who feel known stay for years. We would
              rather run a smaller, more expensive operation that keeps them.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7 · WHAT WE MEASURE ── two columns, no red, headings carry meaning ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">What we measure — and what we refuse to optimize for</SectionLabel>
          <p className={`mt-8 ${PROSE}`}>
            You will get reporting. What matters more is which numbers we are managing toward,
            because a team optimizing the wrong metric can produce a very good-looking month and a
            permanently damaged page.
          </p>
          <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2">
            <div className="bg-bone p-7 md:p-9">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-label text-ink">
                We manage toward
              </h3>
              <ul className="mt-6 divide-y divide-rule border-t border-rule">
                {MANAGE_TOWARD.map((item) => (
                  <li key={item} className="py-3 leading-[1.5] text-graphite">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bone p-7 md:p-9">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
                We will not chase
              </h3>
              <ul className="mt-6 divide-y divide-rule border-t border-rule">
                {WONT_CHASE.map((item) => (
                  <li key={item} className="py-3 leading-[1.5] text-graphite">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`mt-10 space-y-5 ${PROSE}`}>
            <p>
              The industry’s favourite number is the ratio of message revenue to subscription
              revenue. It can be moved quickly by selling harder to everyone, all the time. What
              follows is rising chargebacks, exhausted high spenders, climbing churn, and eventually
              a flagged account.
            </p>
            <p className="font-medium text-ink">
              Any metric that can be won by damaging the page is not a metric. It is a temptation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8 · WHO IS IN YOUR INBOX ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">Who is in your inbox</SectionLabel>
          <div className={`mt-8 space-y-6 ${PROSE}`}>
            <p>A fair question, and one most agencies answer vaguely.</p>
            <p>
              Everyone on your page is screened before they are hired and trained before they are
              assigned. Screening covers written English, typing speed under real conditions, sales
              instinct, and whether someone treats this as a sales role or as casual texting. The
              final stage is a paid trial shift on a live inbox, watched in real time — because no
              interview predicts shift behaviour.
            </p>
            <p>
              Training covers platform mechanics, pricing logic, fan segmentation, handling refusals
              without damaging the relationship, and the platform rules that get accounts suspended.
              Then the voice work described above.
            </p>
            <p>
              Access is scoped per person and revocable. Work is logged and reviewable. Everyone
              signs confidentiality and non-circumvention terms before they see anything.
            </p>
          </div>
          <p className="mt-10 max-w-measure text-lg font-medium leading-[1.55] text-ink">
            Turnover is the real risk in outsourced chatting, and no operator is immune to it. Ours
            is managed by paying properly and keeping people on the same pages long enough to be good
            at them.
          </p>
        </div>
      </section>

      {/* ── 9 · HOW PRICING WORKS ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">How pricing works</SectionLabel>
          <div className={`mt-8 space-y-6 ${PROSE}`}>
            <p>
              We do not publish a rate, because a rate quoted before anyone has looked at your page
              is a guess.
            </p>
            <p>
              What we will explain up front is the structure, since this is where most creators get
              quietly taken.
            </p>
          </div>
          <div className="mt-12 divide-y divide-rule border-y border-rule">
            {PRICING.map((b) => (
              <div key={b.head} className="grid gap-2 py-8 md:grid-cols-[1fr_1.9fr] md:gap-10">
                <h3 className="font-sans text-lg font-bold tracking-tight text-ink">{b.head}</h3>
                <p className="max-w-measure leading-[1.55] text-graphite">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9b · WHAT YOU KEEP ── the calculator, folded in; #what-you-keep anchor ── */}
      <section id="what-you-keep" className="scroll-mt-24 border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">What you keep</SectionLabel>
          <h3 className="mt-5 max-w-measure font-sans text-2xl font-bold tracking-tight text-ink md:text-3xl">
            No upfront fees. Just the math.
          </h3>
          <p className="mt-4 max-w-measure text-lg leading-[1.5] text-graphite">
            Enter your monthly earnings and the rate you&rsquo;re quoted &mdash; see your take-home.
            Move either slider; nothing is sent anywhere.
          </p>
          <WhatYouKeep />
        </div>
      </section>

      {/* ── 10 · WHAT WE WILL NOT DO ── plain list, ink, hairline rules, no red ── */}
      <section className="border-b border-rule">
        <div className={`${CONTAINER} py-20 md:py-28`}>
          <SectionLabel as="h2">What we will not do</SectionLabel>
          <ul className="mt-10 max-w-measure divide-y divide-rule border-y border-rule">
            {WONT_DO.map((item) => (
              <li key={item} className="py-5 text-lg leading-[1.55] text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 11 · CLOSE ── ink ground; single ember-light element is the rule above ── */}
      <section className="bg-ink text-bone">
        <div className={`${CONTAINER} py-24 md:py-32`}>
          <span aria-hidden className="block h-0.5 w-16 bg-ember-light" />
          <h2 className="mt-8 max-w-[16ch] font-sans text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[1.0] tracking-display text-bone">
            Start with the audit
          </h2>
          <div className="mt-8 max-w-measure space-y-5 text-lg leading-[1.55] text-bone">
            <p>
              Before any agreement, we look at your page and tell you what we find. What the inbox is
              currently producing, where conversations are being lost, what the segmentation looks
              like, and whether chatting is actually your constraint right now.
            </p>
            <p>
              It is free, and there is no obligation attached to it. If the answer is that you do not
              need us, that is a legitimate outcome and you will hear it.
            </p>
            <p>
              If it looks like a fit, we run a trial period before anything long-term is signed. You
              should see how we work before you commit to it, and we should see your page before we
              promise anything about it.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/contact?topic=page-audit"
              className="group inline-flex items-center gap-2.5 border border-bone bg-bone px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-ink transition-all duration-500 hover:-translate-y-0.5"
            >
              Request a page audit
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </Link>
          </div>
          <p className="mt-6 font-mono text-[12px] leading-relaxed tracking-[0.04em] text-bone">
            Already earning and want to see the numbers first?{' '}
            <Link href="/#results" className="underline underline-offset-4 hover:no-underline">
              Read our results &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
