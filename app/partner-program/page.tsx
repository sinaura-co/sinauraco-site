import type { Metadata } from 'next'
import { PROGRAM, COPY, SEO } from '@/content/partner-program'
import { pageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqPageSchema } from '@/lib/seo/schema'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollLink } from '@/components/partner/ScrollLink'
import { PartnerForm } from '@/components/partner/PartnerForm'
import { FaqAccordion } from '@/components/partner/FaqAccordion'
import { PageView } from '@/components/partner/PageView'

// Standalone conversion landing page. Its own route (outside the (site) shell),
// so it code-splits away from the main bundle. NOINDEX until public launch —
// gated on legal review of the FAQ/disclaimers and the Next security migration.
// Flip `robots` to index at launch.
export const metadata: Metadata = {
  ...pageMetadata({ title: SEO.title, description: SEO.description, path: PROGRAM.route }),
  robots: { index: false, follow: false },
}

const crumbs = [
  { name: 'Home', route: '/' },
  { name: SEO.title, route: PROGRAM.route },
]

const sectionTitle =
  'font-sans text-[clamp(1.9rem,4vw,3rem)] font-bold uppercase leading-[1.04] tracking-long text-ink'
const cardBase = 'h-full border border-rule bg-paper p-7'
const cardTitle = 'font-sans text-[17px] font-bold tracking-tight text-ink'
const cardBody = 'mt-2 leading-[1.55] text-graphite'

export default function PartnerProgramPage() {
  return (
    <>
      <PageView />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqPageSchema(COPY.faq.items.map((f) => ({ q: f.q, a: f.a })))} />

      {/* 1 — HERO */}
      <section id="top" className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-24 md:py-32">
          <Reveal>
            <SectionLabel>{COPY.hero.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-8 font-sans text-[clamp(2.75rem,8vw,6rem)] font-bold uppercase leading-[0.98] tracking-display text-ink">
              {COPY.hero.titleLine1}
              <br />
              <em className="not-italic text-ember">{COPY.hero.titleLine2}</em>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-measure text-xl leading-[1.5] tracking-body text-graphite">
              {COPY.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-11 flex flex-wrap gap-4">
              <ScrollLink to="#refer-form" cta="hero-primary">
                {COPY.hero.primaryCta}
              </ScrollLink>
              <ScrollLink to="#how-it-works" variant="ghost" cta="hero-how-it-works">
                {COPY.hero.ghostCta}
              </ScrollLink>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-8">
              {COPY.hero.trust.map((t) => (
                <li key={t} className="font-mono text-[11px] uppercase tracking-label text-graphite">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 2 — THE OFFER */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">
              {COPY.offer.label}
            </p>
            <div className="mt-4 font-sans text-[clamp(6rem,22vw,15rem)] font-extrabold leading-[0.85] tracking-display text-ember">
              {PROGRAM.commissionLabel}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-8 max-w-measure text-lg leading-[1.5] text-graphite">
              {COPY.offer.body}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mx-auto mt-12 max-w-[720px] border border-rule bg-paper p-8 text-left">
              <p className="font-mono text-[11px] uppercase tracking-label text-graphite">
                {COPY.offer.example.tag}
              </p>
              <div className="mt-5 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-label text-graphite">
                    {COPY.offer.example.fromLabel}
                  </p>
                  <p className="mt-2 font-sans text-3xl font-bold tabular text-ink">
                    {COPY.offer.example.fromValue}
                  </p>
                </div>
                <span aria-hidden className="hidden text-2xl text-ember-deep sm:block">
                  &rarr;
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-label text-graphite">
                    {COPY.offer.example.toLabel}
                  </p>
                  <p className="mt-2 font-sans text-3xl font-bold tabular text-ink">
                    {COPY.offer.example.toValue}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-5 max-w-[560px] font-mono text-[11px] leading-relaxed tracking-[0.04em] text-graphite">
              {COPY.offer.disclaimer}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-measure border-t border-rule pt-6 text-[15px] leading-[1.6] text-ink">
              {COPY.offer.callout}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 — HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel className="justify-center">{COPY.process.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.process.title}</h2>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">{COPY.process.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COPY.process.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} className={cardBase}>
                <span className="font-mono text-[13px] font-semibold uppercase tracking-label text-ember-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`mt-4 ${cardTitle}`}>{s.title}</h3>
                <p className={cardBody}>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — TIER LADDER */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel className="justify-center">{COPY.tiers.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.tiers.title}</h2>
          </Reveal>
          <div className="mx-auto mt-14 flex max-w-[620px] flex-col">
            {COPY.tiers.items.map((t, i) => (
              <div key={t.title}>
                <Reveal
                  delay={i * 100}
                  className={`border p-8 text-center ${
                    t.highlight ? 'border-ember bg-paper' : 'border-rule bg-paper'
                  }`}
                >
                  <div
                    style={
                      t.highlight
                        ? { boxShadow: '0 0 60px color-mix(in srgb, var(--ember) 16%, transparent)' }
                        : undefined
                    }
                  >
                    <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">
                      {t.label}
                    </p>
                    <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight text-ink">
                      {t.title}
                    </h3>
                  </div>
                </Reveal>
                {i < COPY.tiers.items.length - 1 && (
                  <div aria-hidden className="mx-auto h-8 w-px bg-rule-strong" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — WHO SHOULD YOU REFER */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel className="justify-center">{COPY.qualify.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.qualify.title}</h2>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">{COPY.qualify.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {COPY.qualify.items.map((q, i) => (
              <Reveal key={q.title} delay={i * 70} className={cardBase}>
                <h3 className={cardTitle}>{q.title}</h3>
                <p className={cardBody}>{q.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="text-lg font-bold text-ink">{COPY.qualify.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* 6 — WHY US */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel className="justify-center">{COPY.whyUs.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.whyUs.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {COPY.whyUs.items.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className={cardBase}>
                <h3 className={cardTitle}>{w.title}</h3>
                <p className={cardBody}>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — STRUCTURED PARTNERSHIP */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28">
          <Reveal className="mx-auto max-w-measure text-center">
            <SectionLabel className="justify-center">{COPY.structured.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.structured.title}</h2>
            <p className="mt-5 text-lg leading-[1.5] text-graphite">{COPY.structured.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {COPY.structured.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className={cardBase}>
                <h3 className={cardTitle}>{s.title}</h3>
                <p className={cardBody}>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — APPLICATION FORM */}
      <section id="refer-form" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28">
          <Reveal className="text-center">
            <SectionLabel className="justify-center">{COPY.form.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.form.title}</h2>
            <p className="mx-auto mt-5 max-w-measure text-lg leading-[1.5] text-graphite">
              {COPY.form.sub}
            </p>
          </Reveal>
          <div className="mt-12 text-left">
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28">
          <Reveal className="text-center">
            <SectionLabel className="justify-center">{COPY.faq.eyebrow}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{COPY.faq.title}</h2>
          </Reveal>
          <div className="mt-12">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* 10 — FINAL CTA */}
      <section className="relative overflow-hidden border-b border-rule">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--ember) 20%, transparent) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-[900px] px-6 py-24 text-center md:py-32">
          <Reveal>
            <SectionLabel className="justify-center">{COPY.finalCta.eyebrow}</SectionLabel>
            <h2 className="mt-6 font-sans text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[1.0] tracking-long text-ink">
              {COPY.finalCta.titleLine1}
              <br />
              <em className="not-italic text-ember">{COPY.finalCta.titleLine2}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-measure text-lg leading-[1.5] text-graphite">
              {COPY.finalCta.sub}
            </p>
            <div className="mt-10 flex justify-center">
              <ScrollLink to="#refer-form" cta="final-cta">
                {COPY.finalCta.cta}
              </ScrollLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
