import type { Metadata } from 'next'
import { Mark, MarkSmall } from '@/components/Mark'
import { Lockup } from '@/components/Lockup'
import { pageMetadata } from '@/lib/seo/metadata'

// Internal design reference — kept out of search (noindex) and off the sitemap.
// (The old title double-appended the brand via the layout template.)
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Styleguide',
    description:
      'Internal brand reference for Sinaura Collectives — palette, type, the mark, and core components.',
    path: '/styleguide',
  }),
  robots: { index: false, follow: false },
}

const palette = [
  { name: 'Ink', hex: '#0A0A0A', role: 'Display type, the mark, rules', fg: 'bone' },
  { name: 'Bone', hex: '#EDE9E3', role: 'The ground — warm, never blank', fg: 'ink' },
  { name: 'Ember', hex: '#C2410C', role: 'The accent — once per composition', fg: 'paper' },
  { name: 'Graphite', hex: '#45413C', role: 'Body copy', fg: 'bone' },
  { name: 'Ember-deep', hex: '#9A330A', role: 'Links & small text on bone', fg: 'bone' },
  { name: 'Ember-light', hex: '#E8663A', role: 'Accent on ink & dark grounds', fg: 'ink' },
  { name: 'Paper', hex: '#FBFAF8', role: 'Where bone reads dirty', fg: 'ink' },
] as const

const contrast = [
  ['Ink on bone', '16.4:1', 'body ✓'],
  ['Graphite on bone', '8.4:1', 'body ✓'],
  ['Ember-deep on bone', '6.1:1', 'links & small ✓'],
  ['Ember-light on ink', '6.1:1', 'body ✓'],
  ['Ember on bone', '4.28:1', 'large only'],
  ['Ember on ink', '3.82:1', '→ ember-light'],
] as const

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono uppercase tracking-label text-[11px] text-ember-deep">
      {children}
    </span>
  )
}

function Section({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-rule py-16 md:py-24">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="font-mono text-[11px] tracking-label text-ember-deep">{index}</span>
        <h2 className="font-sans text-3xl font-bold uppercase tracking-long text-ink md:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

export default function Styleguide() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-24 pt-20">
      {/* Masthead */}
      <header className="flex flex-wrap items-end justify-between gap-8 pb-10">
        <Lockup size={30} />
        <div className="text-right">
          <Label>Styleguide — Rev 02</Label>
          <p className="mt-2 font-mono text-[11px] tracking-label text-graphite">
            Management, Growth, Ops
          </p>
        </div>
      </header>

      {/* Palette */}
      <Section index="01" title="Palette">
        <div className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {palette.map((c) => (
            <div key={c.name} className="bg-bone p-6">
              <div
                className="mb-5 h-24 w-full border border-rule"
                style={{ background: c.hex }}
              />
              <div className={`font-sans text-lg font-bold tracking-tight text-ink`}>{c.name}</div>
              <div className="mt-1 font-mono text-[11px] tracking-label text-graphite">{c.hex}</div>
              <p className="mt-3 max-w-[26ch] text-sm leading-[1.5] text-graphite">{c.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-rule">
          <div className="border-b border-rule px-5 py-3">
            <Label>Contrast — measured, do not violate</Label>
          </div>
          <table className="w-full text-left">
            <tbody>
              {contrast.map(([pair, ratio, note]) => (
                <tr key={pair} className="border-b border-rule last:border-0">
                  <td className="px-5 py-3 text-sm text-graphite">{pair}</td>
                  <td className="tabular px-5 py-3 text-sm font-bold text-ink">{ratio}</td>
                  <td className="px-5 py-3 font-mono text-[11px] tracking-label text-ember-deep">
                    {note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Type */}
      <Section index="02" title="Typography">
        <div className="space-y-12">
          <div>
            <Label>Display — short, uppercase, 700, −0.055em</Label>
            <p className="mt-3 font-sans text-6xl font-bold uppercase leading-none tracking-display text-ink md:text-8xl">
              Management
            </p>
          </div>
          <div>
            <Label>Display — long, uppercase, 700, −0.045em</Label>
            <p className="mt-3 font-sans text-4xl font-bold uppercase leading-[1.02] tracking-long text-ink md:text-6xl">
              Growth that answers <br /> to a number
            </p>
          </div>
          <div>
            <Label>Body — Graphite, 1.55, max 65ch</Label>
            <p className="mt-3 max-w-measure text-lg leading-[1.55] tracking-body text-graphite">
              The agency takes a percentage of what clients earn, so the writing sounds like
              someone answerable for a number — not someone selling a dream. Roster earnings up
              142% over ninety days, stated plainly, beats &ldquo;explosive growth&rdquo; every time.
            </p>
            <p className="mt-4 max-w-measure text-lg leading-[1.55] tracking-body text-graphite">
              Links read in{' '}
              <a
                href="#"
                className="text-ember-deep underline decoration-from-font underline-offset-2"
              >
                ember-deep
              </a>
              , the one warm thread through the body.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-x-16 gap-y-8">
            <div>
              <Label>Labels & figures — mono, +0.16em</Label>
              <p className="mt-3 font-mono text-sm uppercase tracking-label text-ink">
                Roster earnings — Q3
              </p>
            </div>
            <div>
              <Label>Tabular figures</Label>
              <p className="tabular mt-3 font-sans text-6xl font-bold tracking-tight text-ink">
                142%
              </p>
            </div>
          </div>
          <div>
            <Label>Counterweight — Georgia italic, captions only</Label>
            <p className="mt-3 font-counter text-xl italic text-graphite">
              Ninety days, one roster — the number does the talking.
            </p>
          </div>
        </div>
      </Section>

      {/* Rules */}
      <Section index="03" title="Rules & space">
        <div className="space-y-10">
          <div>
            <Label>2px — under a lockup</Label>
            <div className="mt-3 h-[2px] w-full bg-ink" />
          </div>
          <div>
            <Label>1px — elsewhere</Label>
            <div className="mt-3 h-px w-full bg-ink" />
          </div>
          <div>
            <Label>Hairline — Ink at 14%</Label>
            <div className="mt-3 h-px w-full bg-rule" />
          </div>
        </div>
      </Section>

      {/* The mark */}
      <Section index="04" title="The mark">
        <div className="flex flex-wrap items-end gap-12">
          {[200, 64, 32].map((s) => (
            <div key={s} className="flex flex-col items-start gap-3">
              <Mark size={s} />
              <span className="font-mono text-[11px] tracking-label text-graphite">{s}px</span>
            </div>
          ))}
          <div className="flex flex-col items-start gap-3">
            <MarkSmall size={16} />
            <span className="font-mono text-[11px] tracking-label text-graphite">16px · contiguous</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-px border border-rule bg-rule">
          <div className="flex flex-1 items-center justify-center bg-bone py-14">
            <Mark size={96} />
          </div>
          <div className="flex flex-1 items-center justify-center bg-ink py-14">
            <Mark size={96} onDark />
          </div>
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-label text-graphite">
          On bone · on ink (bars → bone, period → ember-light)
        </p>
      </Section>

      {/* The lockup */}
      <Section index="05" title="The lockup">
        <div className="flex flex-wrap items-end gap-16">
          <Lockup size={40} />
          <Lockup size={24} />
        </div>
        <div className="mt-10 flex flex-wrap gap-px border border-rule bg-rule">
          <div className="flex flex-1 items-center bg-bone p-12">
            <Lockup size={34} />
          </div>
          <div className="flex flex-1 items-center bg-ink p-12">
            <Lockup size={34} onDark />
          </div>
        </div>
        <p className="mt-4 max-w-measure text-sm leading-[1.5] text-graphite">
          Line one is 1.6022&times; line two so both reach one optical width. The period is
          ember and is often the only colour on the page.
        </p>
      </Section>

      <footer className="border-t border-rule pt-8">
        <p className="font-mono text-[11px] tracking-label text-graphite">
          Sinaura Collectives LLC — New Jersey
        </p>
      </footer>
    </main>
  )
}
