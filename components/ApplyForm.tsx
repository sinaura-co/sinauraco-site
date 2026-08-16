'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { site } from '@/content/site'

// The multi-step application, ported from the live site (Formspree action
// xkoeyqyk). Rebuilt as a controlled React form: values live in state (so they
// survive step changes) and each step validates before advancing — the live
// form validated only on final submit, which silently failed when a required
// field sat on a hidden step. Submits as FormData; checkbox groups append each
// selected value. Styling mirrors the live form (square inputs, ember-deep
// focus, ink progress dots).

const FORMSPREE = 'https://formspree.io/f/xkoeyqyk'

type Field =
  | { kind: 'text' | 'email' | 'tel'; name: string; label: string; required?: boolean; placeholder?: string }
  | { kind: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string }
  | { kind: 'radio' | 'checkbox'; name: string; label: string; required?: boolean; options: string[] }

type Step = { label: string; title: string; desc: string; fields: Field[] }

const STEPS: Step[] = [
  {
    label: 'Info',
    title: 'Basic Information',
    desc: 'Let us start with who you are.',
    fields: [
      { kind: 'text', name: 'name', label: 'Your name', placeholder: 'Full name' },
      { kind: 'email', name: 'email', label: 'Email address', required: true, placeholder: 'you@email.com' },
      { kind: 'text', name: 'socials', label: 'Instagram / TikTok / Twitter handle(s)', required: true, placeholder: '@yourhandle' },
      { kind: 'tel', name: 'phone', label: 'Phone number', required: true, placeholder: '(555) 123-4567' },
    ],
  },
  {
    label: 'Profile',
    title: 'Creator Profile',
    desc: 'Tell us about your content and journey so far.',
    fields: [
      {
        kind: 'checkbox',
        name: 'content_type',
        label: 'What type of content do you create?',
        required: true,
        options: [
          'Lifestyle (Entrepreneur, Day Trader, etc.)',
          'Fitness (Personal Training, Diet Meal Plans, etc.)',
          'Fashion (IG Model, Brand Ambassador, etc.)',
          'Gaming (Twitch, Kick, etc.)',
          'Adult (OnlyFans, Fanvue, etc.)',
          'Other',
        ],
      },
      { kind: 'radio', name: 'experience', label: 'How long have you been creating content?', required: true, options: ['Less than 6 months', '6–12 months', '1–2 years', '2+ years'] },
      { kind: 'radio', name: 'earnings', label: 'Average monthly earnings from content?', required: true, options: ['Less than $1K', '$1K–$5K', '$5K–$10K', '$10K+'] },
      { kind: 'checkbox', name: 'platforms', label: 'Which platforms do you focus on?', required: true, options: ['Instagram', 'TikTok', 'Twitter', 'YouTube', 'Reddit', 'Other'] },
    ],
  },
  {
    label: 'Goals',
    title: 'Goals & Needs',
    desc: 'We want to understand your vision.',
    fields: [
      { kind: 'textarea', name: 'challenges', label: 'What are your biggest challenges as a creator right now?', required: true, placeholder: 'What has been holding you back...' },
      { kind: 'textarea', name: 'goals', label: 'What are your goals for the next 6–12 months?', required: true, placeholder: 'Where do you want to be?' },
      { kind: 'checkbox', name: 'help_areas', label: 'What areas do you need the most help with?', required: true, options: ['Content planning', 'Fan engagement', 'Branding', 'Revenue growth', 'Other'] },
    ],
  },
  {
    label: 'Logistics',
    title: 'Logistics',
    desc: 'Quick details so we know how you work.',
    fields: [
      { kind: 'radio', name: 'exclusivity', label: 'Are you open to signing an exclusivity / management agreement?', required: true, options: ['Yes', 'No'] },
      { kind: 'radio', name: 'current_agency', label: 'Do you currently work with another agency or team?', required: true, options: ['Yes', 'No'] },
      { kind: 'textarea', name: 'contract_status', label: 'If yes, are you free to leave, or bound by a term in an existing agreement?', placeholder: 'Explain your current situation...' },
      { kind: 'radio', name: 'contact_pref', label: 'Best way to reach you for next steps?', required: true, options: ['Email', 'Phone', 'Social media DMs', 'Other'] },
    ],
  },
  {
    label: 'Finish',
    title: 'Wrap-Up',
    desc: 'Final details before sending your application.',
    fields: [
      { kind: 'radio', name: 'referral_source', label: 'How did you hear about Sinaura Collectives?', required: true, options: ['Referral', 'Instagram', 'TikTok', 'Website', 'Other'] },
      { kind: 'textarea', name: 'additional_info', label: 'Anything else you would like us to know?', placeholder: 'Optional — anything else you want to share' },
    ],
  },
]

type Values = Record<string, string | string[]>
type Status = 'idle' | 'sending' | 'error'

const isChoice = (f: Field): f is Extract<Field, { kind: 'radio' | 'checkbox' }> =>
  f.kind === 'radio' || f.kind === 'checkbox'

function isFilled(f: Field, v: string | string[] | undefined): boolean {
  if (f.kind === 'checkbox') return Array.isArray(v) && v.length > 0
  return typeof v === 'string' && v.trim().length > 0
}

const FIELD =
  'mt-2 w-full border border-rule-strong bg-bone px-4 py-3 text-ink outline-none transition-colors placeholder:text-graphite placeholder:opacity-50 focus:border-ember-deep'
const LABEL = 'block font-mono text-[11px] font-semibold uppercase tracking-label text-ink'

export function ApplyForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [done, setDone] = useState(false)
  // Guards the one-time partial-lead capture (capturePartial).
  const partialSent = useRef(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function setText(name: string) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setValues((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  function setRadio(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  function toggleCheckbox(name: string, value: string) {
    setValues((prev) => {
      const list = Array.isArray(prev[name]) ? (prev[name] as string[]) : []
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      return { ...prev, [name]: next }
    })
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  function validateStep(): boolean {
    const next: Record<string, boolean> = {}
    for (const f of current.fields) {
      if (f.required && !isFilled(f, values[f.name])) next[f.name] = true
    }
    setErrors((prev) => ({ ...prev, ...next }))
    return Object.keys(next).length === 0
  }

  // Capture the lead the moment step 1 is completed with a valid email, so an
  // abandoned application is still recoverable (owner-requested). Fires at most
  // once, never blocks navigation, and swallows failures — the full submit on the
  // last step is the real record. Tagged `partial` and given its own `_subject`
  // so it is trivially told apart from a completed application in the inbox.
  // `keepalive` lets it survive the page being closed right after.
  function capturePartial() {
    if (partialSent.current) return
    const email = typeof values.email === 'string' ? values.email.trim() : ''
    if (!email) return
    partialSent.current = true
    const fd = new FormData()
    fd.append('_subject', 'Sinaura application — partial (step 1, not yet submitted)')
    fd.append('stage', 'partial-step-1')
    for (const key of ['name', 'email', 'socials', 'phone']) {
      const v = values[key]
      if (typeof v === 'string' && v.trim()) fd.append(key, v.trim())
    }
    try {
      fetch(FORMSPREE, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
        keepalive: true,
      }).catch(() => {})
    } catch {
      // best-effort; a failed partial never affects the real submission
    }
  }

  function goNext() {
    if (!validateStep()) return
    if (step === 0) capturePartial()
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    if (!validateStep()) return
    setStatus('sending')
    const fd = new FormData()
    fd.append('_subject', 'Sinaura application — complete')
    for (const [name, value] of Object.entries(values)) {
      if (Array.isArray(value)) value.forEach((v) => fd.append(name, v))
      else if (value) fd.append(name, value)
    }
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      if (res.ok) setDone(true)
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (done) {
    return (
      <div className="border border-rule bg-paper p-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">Application received</p>
        <h2 className="mt-3 font-sans text-2xl font-bold uppercase tracking-tight text-ink">Thank you for applying</h2>
        <p className="mx-auto mt-4 max-w-[46ch] leading-[1.6] text-graphite">
          We review every application ourselves, in confidence, and will reach out within three
          business days. Check your email for confirmation.
        </p>
      </div>
    )
  }

  const trackWidth = (step / (STEPS.length - 1)) * 100

  return (
    <div className="relative border border-rule bg-paper p-6 md:p-10">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink" />

      {/* Progress */}
      <div className="relative mb-10 flex justify-between">
        <div aria-hidden className="absolute left-[18px] right-[18px] top-[18px] h-px bg-rule" />
        <div
          aria-hidden
          className="absolute left-[18px] top-[18px] h-px bg-ink transition-all duration-500"
          style={{ width: `calc((100% - 36px) * ${trackWidth / 100})` }}
        />
        {STEPS.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'todo'
          return (
            <div key={s.label} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center border font-mono text-[13px] font-semibold transition-colors ${
                  state === 'todo' ? 'border-rule-strong bg-bone text-graphite' : 'border-ink bg-ink text-bone'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`hidden font-mono text-[10px] uppercase tracking-label sm:block ${
                  state === 'active' ? 'text-ember-deep' : 'text-graphite'
                }`}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Step */}
      <div>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-ink">{current.title}</h2>
        <p className="mt-1 text-sm text-graphite">{current.desc}</p>

        <div className="mt-8 space-y-6">
          {current.fields.map((f) => {
            const err = errors[f.name]
            const errId = err ? `${f.name}-error` : undefined
            return (
              <div key={f.name}>
                {isChoice(f) ? (
                  <fieldset aria-invalid={err} aria-describedby={errId}>
                    <legend className={LABEL}>
                      {f.label} {f.required && <span className="text-ember-deep">*</span>}
                    </legend>
                    <div className="mt-3 flex flex-col gap-2">
                      {f.options.map((opt) => {
                        const checked =
                          f.kind === 'checkbox'
                            ? Array.isArray(values[f.name]) && (values[f.name] as string[]).includes(opt)
                            : values[f.name] === opt
                        return (
                          <label
                            key={opt}
                            className="flex cursor-pointer items-center gap-3 border border-rule bg-bone px-4 py-3 text-[15px] text-graphite transition-colors hover:border-ink hover:bg-paper"
                          >
                            <input
                              type={f.kind}
                              name={f.name}
                              value={opt}
                              checked={checked}
                              onChange={() => (f.kind === 'checkbox' ? toggleCheckbox(f.name, opt) : setRadio(f.name, opt))}
                              className="h-[18px] w-[18px] shrink-0 accent-ink"
                            />
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                ) : f.kind === 'textarea' ? (
                  <>
                    <label htmlFor={f.name} className={LABEL}>
                      {f.label} {f.required && <span className="text-ember-deep">*</span>}
                    </label>
                    <textarea
                      id={f.name}
                      name={f.name}
                      rows={4}
                      placeholder={f.placeholder}
                      value={(values[f.name] as string) ?? ''}
                      onChange={setText(f.name)}
                      aria-invalid={err}
                      aria-describedby={errId}
                      className={`${FIELD} resize-y ${err ? 'border-ember-deep' : ''}`}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor={f.name} className={LABEL}>
                      {f.label} {f.required && <span className="text-ember-deep">*</span>}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.kind}
                      inputMode={f.kind === 'tel' ? 'tel' : undefined}
                      autoComplete={f.kind === 'email' ? 'email' : f.name === 'name' ? 'name' : undefined}
                      placeholder={f.placeholder}
                      value={(values[f.name] as string) ?? ''}
                      onChange={setText(f.name)}
                      aria-invalid={err}
                      aria-describedby={errId}
                      className={`${FIELD} ${err ? 'border-ember-deep' : ''}`}
                    />
                  </>
                )}
                {err && (
                  <p id={errId} role="alert" className="mt-2 font-mono text-[10px] uppercase tracking-label text-ember-deep">
                    This one is required
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {status === 'error' && (
          <p role="alert" className="mt-6 font-mono text-[11px] uppercase tracking-label text-ember-deep">
            Something went wrong — email us directly at {site.email}.
          </p>
        )}

        {/* Nav */}
        <div className="mt-9 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="border border-rule-strong px-6 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-graphite transition-colors hover:border-ink hover:text-ink"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {isLast ? (
            <button
              type="button"
              onClick={submit}
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2.5 border border-transparent bg-ink px-8 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Submit application'}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2.5 border border-transparent bg-ink px-8 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5"
            >
              Next <span aria-hidden>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
