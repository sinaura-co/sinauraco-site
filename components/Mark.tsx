// The mark — four-bar S, ember period as the accent.
// Geometry is locked (BRAND.md): do not adjust the rects.
// Padded form (clear space in the viewBox). On dark grounds the ink bars
// flip to bone and the accent lightens to ember-light.

type MarkProps = {
  size?: number
  onDark?: boolean
  title?: string
  className?: string
}

export function Mark({
  size = 40,
  onDark = false,
  title = 'Sinaura Collectives',
  className,
}: MarkProps) {
  const bar = onDark ? 'var(--bone)' : 'var(--ink)'
  const accent = onDark ? 'var(--ember-light)' : 'var(--ember)'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 146 146"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect x="53" y="41" width="70" height="23" fill={bar} />
      <rect x="23" y="82" width="59" height="23" fill={bar} />
      <rect x="100" y="82" width="23" height="23" fill={accent} />
    </svg>
  )
}

// Contiguous form for small sizes (<24px) and the favicon — the gap collapses,
// so the bottom bar runs to meet the ember.
export function MarkSmall({
  size = 20,
  onDark = false,
  title = 'Sinaura Collectives',
  className,
}: MarkProps) {
  const bar = onDark ? 'var(--bone)' : 'var(--ink)'
  const accent = onDark ? 'var(--ember-light)' : 'var(--ember)'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 146 146"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect x="53" y="41" width="70" height="23" fill={bar} />
      <rect x="23" y="82" width="77" height="23" fill={bar} />
      <rect x="100" y="82" width="23" height="23" fill={accent} />
    </svg>
  )
}
