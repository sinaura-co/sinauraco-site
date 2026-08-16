import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs, type Crumb } from '@/components/content/Breadcrumbs'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import {
  STATS,
  TRUTHS,
  WEEK,
  METHOD,
  PILLARS,
  PLATFORMS,
  TRAP,
  FIX,
  STRIKES,
  TIMELINE,
  TEAM,
} from '@/content/roadmap'

// /roadmap — "The Creator Roadmap": the operating system we run for managed
// creators, published in the open as a mid-funnel trust asset. Rebuilt from an
// owner-supplied HTML mock into the REAL design system (live tokens, self-hosted
// Archivo + IBM Plex Mono, the shared SectionLabel/Button primitives + the
// home/services section grammar) and mounted in the (site) shell, so the real
// SiteHeader/SiteFooter provide the chrome — the mock's own nav/footer/progress
// bar are dropped. Copy lives in content/roadmap.ts (the content/*.ts convention);
// this file is presentation only. Accent scarcity is honoured: ember appears only
// on eyebrows, one heading accent per section, card index numbers, the dark
// pull-quotes (ember-light on ink, per the contrast rule), and the single bg-ember
// CTA band.
//
// INDEXED at launch (owner content sign-off): linked from /creators + footer and
// listed in sitemap.ts. The mock's one unsourced growth multiple ("3–10x") was
// softened to a hedged, numberless line in content/roadmap.ts (CLAUDE.md: never
// publish an unsourced number). Note: the "we build & host a domain" service line
// is now on the indexed live site — soften it here if it ever stops being accurate.
const DESCRIPTION =
  'The full operating system we run for the creators we manage — weekly structure, platform strategy, funnel infrastructure, and a realistic timeline.'

export const metadata: Metadata = pageMetadata({
  title: 'The Creator Roadmap',
  description: DESCRIPTION,
  path: '/roadmap',
})

const crumbs: Crumb[] = [
  { name: 'Home', route: '/' },
  { name: 'The Creator Roadmap', route: '/roadmap' },
]

// Hairline-divided marker list. Ember is deliberately kept OUT of the markers
// (accent scarcity) — numbers/arrows/dashes are graphite; the emphatic warn/check
// markers are ink, matching the home "What you get" checkmarks.
function RowList({
  items,
  bullet,
}: {
  items: string[]
  bullet: 'num' | 'arrow' | 'dash' | 'warn' | 'check'
}) {
  const emphatic = bullet === 'warn' || bullet === 'check'
  return (
    <ul className="mt-5 divide-y divide-rule border-t border-rule">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-baseline gap-3.5 py-3 text-[15.5px] leading-[1.55] text-graphite"
        >
          <span
            aria-hidden
            className={`w-4 shrink-0 font-mono text-[13px] ${emphatic ? 'font-bold text-ink' : 'text-graphite'}`}
          >
            {bullet === 'num'
              ? String(i + 1).padStart(2, '0')
              : bullet === 'arrow'
                ? '→'
                : bullet === 'warn'
                  ? '!'
                  : bullet === 'check'
                    ? '✓'
                    : '—'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function RoadmapPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* ── HERO ── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-10 md:pb-28">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[880px]">
            <SectionLabel>The complete system</SectionLabel>
            <h1 className="mt-8 font-sans text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold uppercase leading-[0.98] tracking-display text-ink">
              The creator <em className="not-italic text-ember">roadmap</em>
            </h1>
            <p className="mt-8 max-w-measure text-xl leading-[1.5] tracking-body text-graphite">
              The full operating system we run for the creators we manage &mdash; weekly structure,
              platform strategy, funnel infrastructure, and a realistic timeline. Published in the
              open, so you can see exactly how we work before you ever apply.
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
              <Button href="/apply" variant="primary">
                Apply now
              </Button>
              <Button href="#reality" variant="ghost">
                Read the system
              </Button>
            </div>
            <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-rule pt-10">
              {STATS.map((s) => (
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

      {/* ── 01 REALITY ── */}
      <section id="reality" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="max-w-measure">
            <SectionLabel as="h2">01 / The reality check</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              Where the money <em className="not-italic text-ember">actually comes from</em>
            </h3>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="border border-dashed border-rule-strong p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
                Most creators believe
              </p>
              <p className="mt-5 font-sans text-[22px] font-medium leading-[1.4] tracking-tight text-graphite">
                &ldquo;If I post more often and drop my price, I&rsquo;ll make more money.&rdquo;
              </p>
            </div>
            <div className="relative overflow-hidden border border-rule bg-paper p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep">
                What&rsquo;s actually true
              </p>
              <p className="mt-5 font-sans text-[22px] font-bold leading-[1.32] tracking-tight text-ink">
                Your subscription price is the smallest lever you own.
              </p>
              <RowList items={TRUTHS} bullet="num" />
            </div>
          </div>

          <div className="mt-16 bg-ink px-6 py-14 text-center md:py-16">
            <p className="mx-auto max-w-[24ch] font-sans text-[clamp(1.5rem,3.4vw,2.375rem)] font-bold leading-[1.2] tracking-long text-bone">
              The top earners aren&rsquo;t the most gifted. They&rsquo;re{' '}
              <em className="not-italic text-ember-light">better organised</em>, more consistent, and
              backed by <em className="not-italic text-ember-light">systems</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 THE WEEK ── */}
      <section id="week" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="max-w-measure">
            <SectionLabel as="h2">02 / Your operating week</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              Structure that <em className="not-italic text-ember">survives a bad mood</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              One job per day &mdash; not a to-do list, a mode. The off day is scheduled on purpose,
              because burnout ends more creator careers than bad content does.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4 lg:grid-cols-7">
            {WEEK.map((d) => (
              <div key={d.day} className={`p-6 text-center ${d.rest ? 'bg-bone' : 'bg-paper'}`}>
                <div
                  className={`font-sans text-2xl font-extrabold tracking-tight ${d.rest ? 'text-ember-deep' : 'text-ink'}`}
                >
                  {d.day}
                </div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-label text-graphite">
                  {d.job}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="border border-rule bg-paper p-8">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-label text-ember-deep">
                The multiplier
              </p>
              <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">
                One session. A week of content.
              </h4>
              <p className="mt-3 leading-[1.6] text-graphite">
                The point of a batching day isn&rsquo;t to work harder &mdash; it&rsquo;s to stop
                paying the setup cost seven separate times. One structured shoot produces short-form
                video, feed photos, subscriber posts, and premium visuals in a single pass.
              </p>
            </div>
            <div className="border border-rule bg-paper p-8">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-label text-ember-deep">
                The method
              </p>
              <RowList items={METHOD} bullet="num" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 PILLARS ── */}
      <section id="pillars" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              03 / Content strategy
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              The three <em className="not-italic text-ember">pillar framework</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              You cannot chase every trend. Pick three pillars and commit to them for months &mdash;
              long enough for an audience to know what you are.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <li key={p.n} className="relative overflow-hidden border border-rule bg-paper p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
                <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
                  {p.n}
                </span>
                <h4 className="mt-4 font-sans text-2xl font-extrabold tracking-tight text-ink">
                  {p.name}
                </h4>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-label text-graphite">
                  {p.role}
                </p>
                <RowList items={p.items} bullet="dash" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 04 PLATFORMS ── */}
      <section id="platforms" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="max-w-measure">
            <SectionLabel as="h2">04 / Platform mastery</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              Every platform has a <em className="not-italic text-ember">different job</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              Treat each one as an intentional marketing channel with its own rules &mdash; not as
              another place to dump the same clip.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {PLATFORMS.map((p) => (
              <li
                key={p.name}
                className="border border-rule bg-paper p-8 transition-colors duration-300 hover:border-ink"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
                  <h4 className="font-sans text-2xl font-extrabold tracking-tight text-ink">
                    {p.name}
                  </h4>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite">
                    {p.role}
                  </span>
                </div>
                <p className="mt-4 text-[15.5px] leading-[1.6] text-graphite">{p.desc}</p>
                <RowList items={p.items} bullet="arrow" />
              </li>
            ))}
          </ul>

          <div className="mt-5 border border-rule bg-paper p-8 md:p-10">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-label text-ember-deep">
              Sequencing
            </p>
            <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-ink md:text-2xl">
              You don&rsquo;t need all of them at once.
            </h4>
            <p className="mt-3 max-w-measure leading-[1.6] text-graphite">
              Start with Instagram and TikTok. Add Reddit once you&rsquo;re genuinely consistent.
              Layer in X and YouTube Shorts as you scale. The goal is sustainable growth &mdash; not a
              burnout sprint across five apps.
            </p>
          </div>
        </div>
      </section>

      {/* ── 05 INFRASTRUCTURE ── */}
      <section id="infrastructure" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="max-w-measure">
            <SectionLabel as="h2">05 / Infrastructure &amp; safety</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              The <em className="not-italic text-ember">link-in-bio trap</em>
            </h3>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="border border-dashed border-rule-strong p-8">
              <p className="font-mono text-[11.5px] font-semibold uppercase tracking-label text-graphite">
                The problem
              </p>
              <h4 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-ink">
                You&rsquo;re on a shared domain.
              </h4>
              <p className="mt-3 leading-[1.6] text-graphite">
                Free link tools place you on one domain shared with millions of other accounts. Their
                behaviour becomes your reputation.
              </p>
              <RowList items={TRAP} bullet="warn" />
            </div>
            <div className="relative overflow-hidden border border-rule bg-paper p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
              <p className="font-mono text-[11.5px] font-semibold uppercase tracking-label text-ember-deep">
                The fix
              </p>
              <h4 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-ink">
                Own your infrastructure.
              </h4>
              <p className="mt-3 leading-[1.6] text-graphite">
                A custom domain nobody else touches. It costs less than one month of most link tools
                &mdash; and we build and host it for the creators we manage.
              </p>
              <RowList items={FIX} bullet="check" />
              <div className="mt-6 border-t border-rule pt-5">
                {STRIKES.map((s) => (
                  <p key={s} className="py-1.5 font-sans text-[17px] font-bold tracking-tight text-ink">
                    <s className="text-graphite decoration-rule-strong decoration-2">No more</s> {s}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-ink p-8 md:p-12">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-label text-ember-light">
              The real advantage
            </p>
            <h4 className="mt-4 font-sans text-[clamp(1.5rem,3.4vw,2.375rem)] font-extrabold leading-[1.1] tracking-long text-bone">
              It&rsquo;s not a prettier link. It&rsquo;s data.
            </h4>
            <p className="mt-4 max-w-[70ch] leading-[1.6] text-bone">
              Anyone can build a nicer page. The difference is instrumentation &mdash; knowing which
              platform sends your most valuable traffic, which hours drive the most clicks, and what
              specifically to change next week. Without it, every content decision is a guess.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 TIMELINE ── */}
      <section id="timeline" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-measure text-center">
            <SectionLabel as="h2" className="justify-center">
              06 / Realistic timeline
            </SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              What implementation <em className="not-italic text-ember">actually feels like</em>
            </h3>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">
              Stated before you apply &mdash; not projections. Anyone promising results in week two is
              selling you something.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <div
                key={t.title}
                className={`p-8 ${i === TIMELINE.length - 1 ? 'bg-bone' : 'bg-paper'}`}
              >
                <span className="font-mono text-[12px] font-semibold uppercase tracking-label text-ember-deep">
                  {t.n}
                </span>
                <span className="mt-6 block font-mono text-[11px] uppercase tracking-label text-graphite">
                  {t.when}
                </span>
                <h4 className="mt-1.5 font-sans text-2xl font-extrabold tracking-tight text-ink">
                  {t.title}
                </h4>
                <p className="mt-3 text-[15px] leading-[1.6] text-graphite">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 WHERE WE COME IN ── */}
      <section id="team" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="max-w-measure">
            <SectionLabel as="h2">07 / Where we come in</SectionLabel>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-long text-ink">
              You can start solo. <em className="not-italic text-ember">You can&rsquo;t scale solo.</em>
            </h3>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <p className="max-w-measure text-lg leading-[1.6] text-graphite">
              Everything above is the work. Past a certain level, creators who insist on doing all of
              it themselves burn out, go inconsistent, and watch their income swing month to month.{' '}
              <strong className="font-bold text-ink">
                We don&rsquo;t take over your brand, and we don&rsquo;t make you an employee inside it
              </strong>{' '}
              &mdash; we run the operational half so your energy goes to the only things nobody can do
              for you: showing up, creating, and connecting.
            </p>
            <div className="relative overflow-hidden border border-rule bg-paper p-8 md:p-9">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
              <blockquote className="font-sans text-[22px] font-bold leading-[1.3] tracking-tight text-ink">
                &ldquo;We don&rsquo;t just manage accounts &mdash; we build empires.&rdquo;
              </blockquote>
              <p className="mt-4 leading-[1.6] text-graphite">
                Every creator we take on gets the system above implemented for them, not handed over
                as a PDF. No cookie-cutter strategies &mdash; everything is tailored to your brand.
              </p>
            </div>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {TEAM.map((t) => (
              <li key={t.n} className="relative overflow-hidden border border-rule bg-paper p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />
                <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
                  {t.n}
                </span>
                <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-ink">
                  {t.title}
                </h4>
                <RowList items={t.items} bullet="dash" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA — the one ember composition ── */}
      <section className="bg-ember">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
          <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[1.02] tracking-long text-ink">
            Ready for your version?
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-lg leading-[1.5] text-paper">
            This is the architecture. The leverage is in your version of it &mdash; built around your
            brand, your audience, and exactly where you are right now. Tell us where you&rsquo;re at
            and we&rsquo;ll map it out, whether or not you end up signing with us.
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
          <p className="mt-8 font-mono text-[11px] uppercase tracking-label text-paper">
            18+ creators only
          </p>
        </div>
      </section>
    </main>
  )
}
