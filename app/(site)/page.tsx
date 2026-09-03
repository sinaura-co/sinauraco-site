import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { organizationGraph } from '@/lib/seo/schema'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
import { WhatYouGetList } from '@/components/home/WhatYouGetList'
import { SayGoodbyeList } from '@/components/home/SayGoodbyeList'
import { ResultsSection } from '@/components/results/ResultsSection'

const HOME_DESCRIPTION =
  'Creator management, growth and ops in one operation — Sinaura runs the brand side so you keep more of what you earn. No upfront fees, every term in writing.'

// The home page previously set only a canonical — no OG/Twitter/description, so
// it had no social card at all. pageMetadata supplies the full set; the document
// <title> is pinned to the brand default via `absolute` so it does not become
// "Creator management… | Sinaura Collectives".
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Creator management, growth & ops',
    description: HOME_DESCRIPTION,
    path: '/',
  }),
  title: { absolute: `${site.name} — ${site.tagline}` },
}

// Home — the full landing experience, ported from the live single-page site into
// the rebuild's visual language (additive; nothing dropped). Two unfalsifiable
// claims were softened to keep the site honest: "Proven Revenue Growth" → plain
// "Revenue growth", and the hero's "100% Confidential" → the verifiable "0
// Upfront fees". Everything else keeps the live energy. Content lives in data
// arrays (plain strings need no JSX escaping); display headings use entities.
//
// Motion (§A/§B): sections below the fold reveal on scroll via <Reveal>; figures
// count up on view via <Counter>. The hero paints immediately (it is the LCP
// element) — only its figures animate.

// `from` overrides a figure's starting count — fees run 100 → 0 to dramatize
// dropping to nothing; everything else counts up from 0.
type Stat = { num: string; label: string; from?: number }

const HERO_STATS: Stat[] = [
  { num: '24/7', label: 'Fan management' },
  { num: '6+', label: 'Platforms covered' },
  { num: '0', label: 'Upfront fees', from: 100 },
]

const ABOUT_FEATURES = [
  {
    n: '01',
    title: 'Revenue growth',
    desc: 'Data-driven promotions, campaigns, and upsell systems designed to increase your income consistently.',
  },
  {
    n: '02',
    title: 'Experienced team',
    desc: 'Our trained team handles daily messaging, fan engagement, upsells, and relationship-building around the clock.',
  },
  {
    n: '03',
    title: 'Full privacy & discretion',
    desc: 'Confidentiality and professionalism every step of the way. Your privacy is non-negotiable.',
  },
]

const SERVICES = [
  {
    title: 'Managed chatting, 24/7',
    desc: 'A trained team runs your inbox around the clock — messaging, upselling, and building the relationships that make a page pay — so it never goes quiet and you never touch a DM you don’t want to.',
  },
  {
    title: 'Written in your voice',
    desc: 'A fan can tell within a few messages when the person writing isn’t the one they subscribed to. We learn your voice before we send a word — the part most outsourced chatting skips.',
  },
  {
    title: 'One account first, then widen',
    desc: 'We go deep on your primary account before adding a second. Splitting chat time thin across every platform costs you the one that pays best — so we run one operation properly, not five at half strength.',
  },
  {
    title: 'Revenue that compounds',
    desc: 'Pricing, offers, and upsell flows built for repeat buyers and retention — not the vanity spike a discount buys for a week. Any metric won by damaging the page isn’t a metric.',
  },
  {
    title: 'You keep everything',
    desc: 'Your content, your account, your audience. Co-manager access only — never your password — and it all stays yours to walk away with on 30 days’ notice.',
  },
  {
    title: 'Weekly reporting',
    desc: 'Weekly updates on your real numbers and the calls we made on your behalf. Full transparency, zero guesswork — you always know where the account stands.',
  },
]

const COMMIT_STATS: Stat[] = [
  { num: '3', label: 'Business days to review' },
  { num: '30', label: 'Day exit notice' },
  { num: '100%', label: 'Account ownership' },
  { num: '24/7', label: 'Fan coverage' },
]

const WHAT_YOU_GET = [
  "No upfront fees — you're charged only on what you earn",
  'Co-manager access only — never your password',
  'You keep your content',
  'DMCA takedown support for leaked content, on request',
  'Weekly reporting on your numbers',
]

const GOODBYES = ['inconsistency', 'stress', 'missed revenue', 'doing it alone', 'broken promises']

const WHY = [
  {
    n: '01',
    title: 'No cookie-cutter approach',
    desc: 'Personalized strategies tailored to your brand, your audience, and your goals. Nothing generic — everything custom.',
  },
  {
    n: '02',
    title: 'Privacy first',
    desc: 'Confidentiality and professionalism every step of the way. Your personal information and business details stay private and secure.',
  },
  {
    n: '03',
    title: 'We only win when you win',
    desc: 'Our success is tied to yours. We are invested in your growth because our business depends on your results.',
  },
]

export default function Home() {
  return (
    <main>
      {/* Organization @graph declared once on the homepage; other pages reference by @id (§7.1). */}
      <JsonLd data={organizationGraph()} />

      {/* ── HERO ── paints immediately (LCP); only the figures animate ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="max-w-[860px]">
            <SectionLabel>Creator management agency</SectionLabel>
            <h1 className="mt-8 font-sans text-[clamp(2.75rem,7.5vw,5rem)] font-bold uppercase leading-[0.98] tracking-display text-ink">
              <span className="block">Maximize earnings.</span>
              <em className="block not-italic text-ember">Grow your brand.</em>
            </h1>
            <p className="mt-8 max-w-measure text-xl leading-[1.5] tracking-body text-graphite">
              Full-service growth, engagement, and monetization &mdash; so you can focus on creating
              content and doing what you love.
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
              <Button href="/apply" variant="primary">
                Apply now
              </Button>
              <Button href="/services" variant="ghost">
                What we do
              </Button>
            </div>
            <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-rule pt-10">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-sans text-4xl font-extrabold tracking-tight text-ink tabular">
                    <Counter value={s.num} from={s.from} />
                  </dt>
                  <dd className="mt-2 font-mono text-[11px] uppercase tracking-label text-graphite">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <div>
            <Reveal>
              <SectionLabel as="h2">Who we are</SectionLabel>
              <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
                Built for creators who mean <em className="not-italic text-ember">business</em>
              </h3>
              <p className="mt-5 max-w-measure text-lg leading-[1.5] text-graphite">
                Sinaura Collectives helps creators focus on creating while we handle growth and
                operations. No cookie-cutter strategies &mdash; everything is tailored to your brand.
              </p>
            </Reveal>
            <div className="mt-10 flex flex-col gap-7">
              {ABOUT_FEATURES.map((f, i) => (
                <Reveal key={f.n} delay={i * 80}>
                  <div className="flex gap-5">
                    <div className="flex h-[52px] w-[52px] min-w-[52px] items-center justify-center border border-rule bg-paper font-mono text-sm font-semibold tracking-wider text-ember-deep">
                      {f.n}
                    </div>
                    <div>
                      <h4 className="font-sans text-[17px] font-bold tracking-tight text-ink">
                        {f.title}
                      </h4>
                      <p className="mt-1 leading-[1.55] text-graphite">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:self-center">
            <Reveal delay={120}>
              <figure className="relative overflow-hidden border border-rule bg-paper p-10 md:p-12">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
                <blockquote className="font-sans text-[26px] font-bold leading-[1.3] tracking-tight text-ink">
                  &ldquo;Any metric that can be won by damaging the page is not a metric. It is a
                  temptation.&rdquo;
                </blockquote>
                <figcaption className="mt-5 font-counter text-[15px] italic leading-[1.65] text-graphite">
                  We optimize for what compounds &mdash; retention, repeat buyers, and the long-term
                  health of the page &mdash; not the vanity spikes a discount can buy for a week.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              What we do
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              The inbox is <em className="not-italic text-ember">the business</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              The money is made in the inbox. We run it with a trained team, in your voice, on the
              account that pays first &mdash; so you can focus on making content.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 60} className="h-full">
                  <GuideCard index={String(i + 1).padStart(2, '0')} title={s.title} desc={s.desc} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── RESULTS ── proof, before the commitments' risk-reversal (owner call) ── */}
      <ResultsSection />

      {/* ── COMMITMENTS ── */}
      <section id="commitments" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              Commitments
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              What you get in <em className="not-italic text-ember">writing</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              Commitments you can hold us to, stated before you apply &mdash; not projections.
            </p>
          </Reveal>

          <ul className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {COMMIT_STATS.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="group relative h-full overflow-hidden border border-rule bg-paper p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-ink">
                    <div className="font-sans text-5xl font-extrabold tracking-tight text-ink tabular">
                      <Counter value={s.num} from={s.from} />
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-graphite">
                      {s.label}
                    </div>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h4 className="font-sans text-2xl font-bold tracking-tight text-ink">What you get</h4>
              <WhatYouGetList items={WHAT_YOU_GET} />
            </Reveal>
            <Reveal delay={100}>
              <h4 className="font-sans text-2xl font-bold tracking-tight text-ink">Say goodbye to</h4>
              <SayGoodbyeList items={GOODBYES} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              Why Sinaura Collectives
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              Your life. Your future. <em className="not-italic text-ember">Your decision.</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              We&rsquo;re not just another agency. We&rsquo;re your dedicated growth partner with a
              personalized approach to everything we do.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <li key={w.n}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="group relative h-full overflow-hidden border border-rule bg-paper p-9 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-ink">
                    <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
                      {w.n}
                    </span>
                    <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">
                      {w.title}
                    </h4>
                    <p className="mt-3 leading-[1.55] text-graphite">{w.desc}</p>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA BAND ── the one ember composition ── */}
      <section className="bg-ember">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
          <Reveal>
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[1.02] tracking-long text-ink">
              Ready to scale your brand?
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-lg leading-[1.5] text-paper">
              Join Sinaura Collectives and let us handle the rest. Apply now and see what&rsquo;s
              possible.
            </p>
            <Link
              href="/apply"
              className="group mt-10 inline-flex items-center gap-2.5 border border-paper bg-paper px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-ink transition-all duration-500 hover:-translate-y-0.5 hover:bg-bone"
            >
              Apply now
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
