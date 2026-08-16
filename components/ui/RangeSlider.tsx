'use client'

import { useId } from 'react'

// Shared slider used by BOTH the (log) gross input and the (linear) rate input.
// The real <input type="range"> sits transparent on top at full size, so it
// stays natively keyboard- and pointer-operable; the visible track, fill, and
// thumb render underneath. That is how the styling stays identical across
// browsers. Square by system (borderRadius:{none}); the resting thumb is ink
// with a soft ink ring — ember is reserved for the result panel (accent scarcity).
//
// The wrapper carries the focus ring via :focus-within, since the input itself
// is invisible — matching the global ember-deep focus treatment.

interface RangeSliderProps {
  label: string
  /** Formatted value shown top-right (e.g. "$2.5k" or "20%"). */
  displayValue: string
  /** Human-readable spoken value — a screen reader must never hear a bare number. */
  ariaValueText: string
  /** Native input bounds. For the log slider these are the 0–SCALE track, not real values. */
  min: number
  max: number
  step: number
  /** Native input value (log slider: rounded track position; linear: the real value). */
  value: number
  onChange: (next: number) => void
  /** 0–100 width of the fill and left offset of the thumb. */
  fillPct: number
}

export function RangeSlider({
  label,
  displayValue,
  ariaValueText,
  min,
  max,
  step,
  value,
  onChange,
  fillPct,
}: RangeSliderProps) {
  const id = useId()
  const pct = Math.min(100, Math.max(0, fillPct))

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] font-semibold uppercase tracking-label text-graphite"
        >
          {label}
        </label>
        <span aria-hidden className="font-sans text-2xl font-bold tabular text-ink">
          {displayValue}
        </span>
      </div>

      <div className="relative mt-4 h-9 select-none focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ember-deep">
        {/* base track */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-rule" />
        {/* fill */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-ink"
          style={{ width: `${pct}%` }}
        />
        {/* thumb — square, ink border + soft ink ring; ember stays in the result panel (accent scarcity) */}
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-paper"
          style={{ left: `${pct}%`, boxShadow: '0 0 0 6px color-mix(in srgb, var(--ink) 12%, transparent)' }}
        />
        {/* the real control: invisible but fully interactive */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuetext={ariaValueText}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  )
}
