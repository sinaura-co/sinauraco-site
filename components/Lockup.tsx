// The wordmark lockup — two lines flush to one optical width.
// Line one (SINAURA) is 1.6022x line two (COLLECTIVES.) so the shorter string
// reaches equal width. The period is the accent — often the only colour on the
// page. Lines are sized in `em` off a single container font-size, so the ratio
// holds at any size, including the fluid case.
//
// `size`    — line-two size in px (the display size on wide screens).
// `minSize` — when set, the lockup fluidly scales from minSize (≤375px wide)
//             up to size (≥900px), so it never overflows small screens.
//
// When the official lockup SVGs are supplied, swap this for inline SVG so the
// ratio can never drift.

const RATIO = 1.6022

type LockupProps = {
  size?: number
  minSize?: number
  onDark?: boolean
  className?: string
}

export function Lockup({ size = 24, minSize, onDark = false, className }: LockupProps) {
  const color = onDark ? 'var(--bone)' : 'var(--ink)'
  const accent = onDark ? 'var(--ember-light)' : 'var(--ember)'

  const base =
    minSize != null
      ? `clamp(${minSize}px, calc(${minSize}px + ${size - minSize} * ((100vw - 375px) / 525)), ${size}px)`
      : `${size}px`

  return (
    <span
      role="img"
      aria-label="Sinaura Collectives"
      className={className}
      style={{
        display: 'inline-block',
        color,
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: 0.9,
        fontSize: base,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        aria-hidden
        style={{ display: 'block', fontSize: `${RATIO}em`, letterSpacing: '-0.055em' }}
      >
        Sinaura
      </span>
      <span aria-hidden style={{ display: 'block', fontSize: '1em', letterSpacing: '-0.045em' }}>
        Collectives<span style={{ color: accent }}>.</span>
      </span>
    </span>
  )
}
