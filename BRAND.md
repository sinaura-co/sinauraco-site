# Website rebuild prompt — Sinaura Collectives, Revision 02

> Brand system of record for sinauraco.com. The current repo is the **phase-one
> static site**; the prompt below specifies a from-scratch Next.js rebuild. Treat
> this file as the identity source of truth (palette, type, lockup, mark, voice,
> naming) regardless of which stack is live.

---

## THE PROMPT

You are rebuilding the website for **Sinaura Collectives LLC**, a talent
management and brand-side agency in New Jersey. The company has just completed a
full rebrand. The current site is on Google Sites in a retired blue identity and
is being replaced entirely.

Read this whole document before writing any code. The constraints are not
stylistic preferences — each one exists because the previous identity failed for
a specific reason, and the reasons are given so you can apply judgement in cases
this document doesn't cover.

### What we're building

Phase one: the public marketing site. Static, fast, no CMS.

Pages:
- **Home** — what the agency does, the three service lines, one proof figure, contact
- **Management / Growth / Ops** — one page per service line, or one page with three anchored sections; your call, argue for it
- **For creators** — the pitch to talent
- **For brands** — the pitch to the brand side
- **About** — the agency, the arrangement, discretion
- **Contact** — form or mailto, no phone-first

Phase two, do not build yet but do not architect against: a creator portal and an
admin portal behind auth, backed by Airtable.

### Stack

Next.js (App Router) + TypeScript + Tailwind, statically exported. No CMS, no
database, no auth in phase one. Content lives in typed TS objects under
`/content` so it can move to a CMS later without touching components.

**Tailwind's defaults are actively hostile to this identity.** Its palette is
built around blue, and its components round corners by default. Override the
theme rather than fighting it per-class:
- Extend `colors` with only the palette below, and **delete the default palette**
- Set `borderRadius` to `{ none: '0' }` and nothing else
- Set `fontFamily` to the stack below
- Add the tracking values as named `letterSpacing` entries

Do not install shadcn/ui, DaisyUI, or any component library. They all ship
rounded corners and a blue accent, and stripping that back costs more than
writing the components.

### Identity

#### Colour — one accent, spent once per composition

| Role | Hex | Use |
|---|---|---|
| Ink | `#0A0A0A` | Display type, the mark, rules |
| Bone | `#EDE9E3` | The ground — never plain white |
| Ember | `#C2410C` | The accent — burnt orange |
| Graphite | `#45413C` | Body copy |
| Ember-deep | `#9A330A` | Links and small text on bone |
| Ember-light | `#E8663A` | The accent on ink and other dark grounds |
| Paper | `#FBFAF8` | Where bone reads dirty |

Define these as CSS custom properties at `:root` and reference them everywhere.
Never hardcode a hex inline. Support a dark section by flipping ink and bone and
swapping ember to ember-light.

**Ember appears once per composition.** One per viewport-height of scroll is the
working rule — a period, a rule, a single figure. Not on every card. Scarcity is
the entire strategy; colour everywhere reads cheap.

Contrast, already measured — do not recompute, do not violate:

| Pair | Ratio | |
|---|---|---|
| Ink on bone | 16.4:1 | fine |
| Graphite on bone | 8.4:1 | fine |
| Ember-deep on bone | 6.1:1 | **use this for links** |
| Ember-light on ink | 6.1:1 | fine |
| Ember on bone | 4.28:1 | **fails body minimum — never body copy** |
| Ember on ink | 3.82:1 | **fails — must lighten to ember-light** |

#### Typography

One grotesque carries display and body. Preferred **Neue Haas Grotesk Display**;
free substitute **Archivo**; fallback Helvetica Neue, then Arial. Self-host the
font files — no Google Fonts link, no CDN.

- Display, short lines: uppercase, 700, tracking `-0.055em`
- Display, long lines: uppercase, 700, tracking `-0.045em`
- Body: tracking `-0.005em` to `0`, line height `1.55`, max 65 characters per line
- Labels and figures: monospace, uppercase, `+0.16em`, small
- Georgia italic: captions and datelines **only**, never a headline
- `font-variant-numeric: tabular-nums` on any figure in a column

**Tracking is non-negotiable.** At zero tracking the display type is just
Helvetica and the brand is gone.

#### The lockup

Two lines, both flush to the same optical width:

```
SINAURA
COLLECTIVES.
```

Line one is set at **1.6022× the type size of line two** — the shorter string
needs the larger size to reach equal width. Hold that ratio at every size. The
period is ember and is often the only colour on the page. Clear space is one cap
height of the mark on all four sides; nothing enters it.

Use the supplied SVG files rather than setting this in HTML text, so the ratio
can't drift.

#### The mark

Four rectangles on a 100×100 canvas. An S formed by the negative space between
two bars, with the ember period as the accent. Inline it as SVG:

```html
<svg viewBox="0 0 146 146" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Sinaura Collectives">
  <rect x="53" y="41" width="70" height="23" fill="var(--ink)"/>
  <rect x="23" y="82" width="59" height="23" fill="var(--ink)"/>
  <rect x="100" y="82" width="23" height="23" fill="var(--ember)"/>
</svg>
```

That is the padded form — clear space of one stroke weight is already in the
viewBox. Every gap equals the stroke weight, 23 units, and both right edges land
flush. Do not adjust the geometry. On dark grounds swap the third rect to
`--ember-light`.

**Below 24px the gap collapses.** For the favicon and anything small, use the
contiguous form instead: bottom bar `x=23 width=77`, ember `x=100 width=23`, no
gap between them.

#### Geometry

- **Border radius is zero everywhere**, containers included. Rounding is the fastest way to make this look like a template again.
- Left-align almost everything. Centring is for covers and app icons only.
- Rules: 2px under a lockup, 1px elsewhere, always full measure.
- 4px spacing base. Generous section spacing — let the page breathe.
- Confidence comes from scale and empty space, never decoration. When in doubt, remove something and make what remains larger.

Reference points are fashion houses, not software: Aimé Leon Dore, Jacquemus,
The Row.

#### Voice

Specific over superlative — "roster earnings up 142% over ninety days", not
"explosive growth". Plain over clever. Discreet by default: client names appear
where they must and nowhere else. Accountable when something slips.

The agency takes a percentage of what clients earn, so the writing should sound
like someone answerable for a number, not someone selling a dream.

Naming: **Sinaura Collectives LLC** on anything binding. **Sinaura Collectives**
is the brand name and leads everywhere else. **SinauraCo** is sanctioned for
social handles and casual contexts only — it may appear in social links, never in
body copy or the footer's legal line. **SC.** is the monogram.

Tagline: **Management, Growth, Ops**.

Contact: sinauraco.com · contact@sinauraco.com

### Do not

- Use blue in any form. The previous identity was `#0A7AFF` and was abandoned specifically because it read as generic machine-made work.
- Set a headline in a serif. A serif headline on a warm ground is the cream-and-terracotta wellness cliché this identity exists to avoid.
- Set display type or body copy in ember.
- Round a corner.
- Loosen display tracking to zero.
- Use emoji as icons, gradients, drop shadows on type, or centred layouts.
- Use plain white `#FFFFFF` as a page ground.
- Put "SinauraCo" in the footer legal line or any contractual context.
- Add a hero image of a generic person at a laptop, a testimonial carousel, a pricing table with a highlighted middle tier, or an animated counter. All four are the template defaults this rebrand exists to escape.

### Accessibility and performance

- WCAG 2.1 AA. Body text 4.5:1 minimum, non-text 3:1.
- Every interactive element reachable and visible on keyboard. Focus rings in ember-deep, square, 2px offset.
- Respect `prefers-reduced-motion`; if in doubt, no motion at all.
- Semantic HTML. One `h1` per page, headings in order.
- No layout shift. Lighthouse 95+ on all four categories.
- Self-hosted fonts, `font-display: swap`, preloaded.

### When you're done

Give me, in this order:
1. The dev server running, and the file tree
2. A short note on any judgement call you made that this document didn't cover
3. The output of these checks, which I will re-run myself:

```bash
# no rounded corners anywhere
grep -rn "rounded\|border-radius" src/ app/ --include=*.tsx --include=*.css | grep -v "radius: 0\|rounded-none"
# no blue and no stray hex outside the palette
grep -rniE "#[0-9a-f]{3,6}" src/ app/ --include=*.tsx --include=*.css \
  | grep -viE "0A0A0A|EDE9E3|C2410C|45413C|9A330A|E8663A|FBFAF8"
# no white grounds
grep -rniE "#fff|white" src/ app/ --include=*.tsx --include=*.css
```

Each should return nothing. If one returns a hit, fix it rather than explaining it.

### How to work

Build it in this order, and stop after each for me to look:
1. Tailwind theme, CSS custom properties, font loading, and a `/styleguide` route rendering the palette, type scale, rules, and the mark at 200/64/32/16px
2. Layout shell — header with the mark, footer with the legal line
3. Home
4. The remaining pages

Do not build all of it and then show me. I want to catch drift early.

## END OF PROMPT

---

## Three things to settle before running the rebuild

**The mark geometry.** The prompt uses variant C, where every gap equals the
stroke weight and both right edges land flush. If a different variant is locked,
change the four `rect` values in the mark section — that's the only edit needed.

**New Jersey.** The prompt says New Jersey. An earlier brand spec said New York,
and so did a logo artifact. Fix it at the source too, or it will keep reappearing.
(The live site's `terms.html` already names New Jersey as governing law.)

**The S icon question.** The guidelines PDF states the drawn S is withdrawn and
the identity is typographic. If the new mark supersedes that page, the PDF needs a
rewrite before it goes to the team — right now the reference document and the
assets disagree.
