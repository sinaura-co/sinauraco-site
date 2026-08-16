import type { Config } from 'tailwindcss'

// Rev 02 — the theme IS the guardrail.
// colors: only the locked palette (Tailwind's blue-centric default palette is
// replaced wholesale). borderRadius: zero only. One grotesque + one mono + Georgia.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: 'var(--ink)',
      bone: 'var(--bone)',
      ember: 'var(--ember)',
      graphite: 'var(--graphite)',
      'ember-deep': 'var(--ember-deep)',
      'ember-light': 'var(--ember-light)',
      paper: 'var(--paper)',
      rule: 'var(--rule)',
      'rule-strong': 'var(--rule-strong)',
    },
    borderRadius: {
      none: '0',
    },
    fontFamily: {
      sans: ['var(--font-archivo)'],
      mono: ['var(--font-mono)'],
      counter: ['Georgia', 'Times New Roman', 'serif'],
    },
    letterSpacing: {
      // named tracking — display type is nothing without it
      display: '-0.055em', // short display lines
      long: '-0.045em', // long display lines
      tight: '-0.02em',
      body: '-0.005em',
      label: '0.16em', // mono labels & figures
    },
    extend: {
      maxWidth: {
        measure: '65ch', // body copy line-length cap
      },
    },
  },
  plugins: [],
}

export default config
