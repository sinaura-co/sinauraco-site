// Shared form-field styling — the live form language (square, bone fill,
// ember-deep focus, mono uppercase labels). Mirrors the classes ApplyForm /
// ContactForm use inline, so new forms match the existing ones without drift.

export const FIELD =
  'mt-2 w-full border border-rule-strong bg-bone px-4 py-3 text-ink outline-none transition-colors placeholder:text-graphite placeholder:opacity-50 focus:border-ember-deep'

export const FIELD_ERROR = 'border-ember-deep'

export const LABEL = 'block font-mono text-[11px] font-semibold uppercase tracking-label text-ink'

export const LABEL_OPTIONAL = 'font-normal lowercase text-graphite opacity-60'
