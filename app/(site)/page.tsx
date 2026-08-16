import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { organizationGraph } from '@/lib/seo/schema'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GuideCard } from '@/components/content/GuideCard'

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

const HERO_STATS = [
  { num: '24/7', label: 'Fan management' },
  { num: '6+', label: 'Platforms covered' },
  { num: '0', label: 'Upfront fees' },
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
    title: 'Fan management & engagement',
    desc: 'Our trained team handles daily messaging, upsells, and relationship-building so you can focus on content. 24/7 coverage that keeps your fans engaged.',
  },
  {
    title: 'Revenue growth strategies',
    desc: 'Data-driven promotions, campaigns, and upsell systems designed to increase your income consistently. We optimize pricing, offers, and conversion flows.',
  },
  {
    title: 'Content scheduling & optimization',
    desc: 'Guidance on when and how to post for maximum engagement. We plan, schedule, and analyze so every piece of content works harder for you.',
  },
  {
    title: 'Ongoing support & reporting',
    desc: 'Weekly updates, strategy sessions, and performance reports so you always know your progress. Full transparency, zero guesswork.',
  },
  {
    title: 'Professional branding',
    desc: 'Assistance with organizing your vault, structuring your offers, and building a fan experience that keeps subscribers coming back for more.',
  },
  {
    title: 'Multi-platform marketing',
    desc: 'Strategic growth across Instagram, TikTok, Twitter, Reddit, and more. We drive traffic from every angle to maximize your reach and revenue.',
  },
]

const COMMIT_STATS = [
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

      {/* ── HERO ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="max-w-[860px]">
            <SectionLabel>Creator management agency</SectionLabel>
            <h1 className="mt-8 font-sans text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold uppercase leading-[0.98] tracking-display text-ink">
              We help creators{' '}
              <em className="not-italic text-ember">maximize their earnings &amp; brand</em>
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
                    {s.num}
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
            <SectionLabel as="h2">Who we are</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              Built for creators who mean <em className="not-italic text-ember">business</em>
            </h3>
            <p className="mt-5 max-w-measure text-lg leading-[1.5] text-graphite">
              Sinaura Collectives helps creators focus on creating while we handle growth and
              operations. No cookie-cutter strategies &mdash; everything is tailored to your brand.
            </p>
            <div className="mt-10 flex flex-col gap-7">
              {ABOUT_FEATURES.map((f) => (
                <div key={f.n} className="flex gap-5">
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
              ))}
            </div>
          </div>

          <div className="md:self-center">
            <figure className="relative overflow-hidden border border-rule bg-paper p-10 md:p-12">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
              <blockquote className="font-sans text-[26px] font-bold leading-[1.3] tracking-tight text-ink">
                &ldquo;We don&rsquo;t just manage accounts &mdash; we build empires.&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-counter text-[15px] italic leading-[1.65] text-graphite">
                Sinaura Collectives operates as a dedicated creator management agency. We review all
                applications with the highest level of confidentiality to ensure your personal
                information and business details remain private and secure.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              What we do
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              All-in-one <em className="not-italic text-ember">creator support</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              From content planning to fan engagement &mdash; we&rsquo;ve got every angle covered so
              you can focus on what you do best.
            </p>
          </div>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <li key={s.title}>
                <GuideCard index={String(i + 1).padStart(2, '0')} title={s.title} desc={s.desc} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── COMMITMENTS ── */}
      <section id="commitments" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              Commitments
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              What you get in <em className="not-italic text-ember">writing</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              Commitments you can hold us to, stated before you apply &mdash; not projections.
            </p>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {COMMIT_STATS.map((s) => (
              <li
                key={s.label}
                className="group relative overflow-hidden border border-rule bg-paper p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-ink"
              >
                <div className="font-sans text-5xl font-extrabold tracking-tight text-ink tabular">
                  {s.num}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-graphite">
                  {s.label}
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
                />
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h4 className="font-sans text-2xl font-bold tracking-tight text-ink">What you get</h4>
              <ul className="mt-6 divide-y divide-rule border-y border-rule">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex items-baseline gap-4 py-4 text-[17px] text-graphite">
                    <span aria-hidden className="font-bold text-ink">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-2xl font-bold tracking-tight text-ink">Say goodbye to</h4>
              <ul className="mt-6 flex flex-col gap-4">
                {GOODBYES.map((g) => (
                  <li
                    key={g}
                    className="font-sans text-[22px] font-bold text-ember line-through decoration-rule-strong decoration-2"
                  >
                    No more {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-measure text-center">
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
          </div>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {WHY.map((w) => (
              <li
                key={w.n}
                className="group relative overflow-hidden border border-rule bg-paper p-9 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-ink"
              >
                <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
                  {w.n}
                </span>
                <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">{w.title}</h4>
                <p className="mt-3 leading-[1.55] text-graphite">{w.desc}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA BAND ── the one ember composition ── */}
      <section className="bg-ember">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
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
        </div>
      </section>
    </main>
  )
}
