'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { PROGRAM, COPY } from '@/content/partner-program'
import { FIELD, FIELD_ERROR, LABEL, LABEL_OPTIONAL } from '@/components/ui/field'
import { track } from '@/lib/analytics'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SID_KEY = 'sinaura_sid'
const ENDPOINT = '/api/partner-applications'

interface Values {
  fullName: string
  email: string
  contact: string
  social: string
  country: string
  creatorsCount: string
  creatorTypes: string[]
  audienceSize: string
  aboutNetwork: string
  _b8x2k: string
}

const EMPTY: Values = {
  fullName: '',
  email: '',
  contact: '',
  social: '',
  country: '',
  creatorsCount: '',
  creatorTypes: [],
  audienceSize: '',
  aboutNetwork: '',
  _b8x2k: '',
}

interface Errors {
  fullName?: boolean
  email?: string
  contact?: boolean
}

const errText = 'mt-2 font-mono text-[10px] uppercase tracking-label text-ember-deep'

function Select({
  id,
  value,
  onChange,
  onFocus,
  options,
  placeholder,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  onFocus: () => void
  options: readonly string[]
  placeholder: string
}) {
  return (
    <div className="relative mt-2">
      <select
        id={id}
        value={value}
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-rule-strong bg-bone px-4 py-3 pr-11 text-ink outline-none transition-colors focus:border-ember-deep"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-graphite"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="square" />
      </svg>
    </div>
  )
}

export function PartnerForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [banner, setBanner] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [submitted, setSubmitted] = useState(false)
  const started = useRef(false)
  const sessionId = useRef('')
  const utm = useRef<Record<string, string>>({})

  useEffect(() => {
    try {
      const existing = sessionStorage.getItem(SID_KEY)
      const id =
        existing ||
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `sid-${Date.now()}-${Math.round(Math.random() * 1e9)}`)
      sessionId.current = id
      if (!existing) sessionStorage.setItem(SID_KEY, id)
    } catch {
      sessionId.current = `sid-${Date.now()}`
    }
    const params = new URLSearchParams(window.location.search)
    const collected: Record<string, string> = {}
    params.forEach((v, k) => {
      if (k.startsWith('utm_')) collected[k] = v
    })
    utm.current = collected
  }, [])

  function markStarted() {
    if (!started.current) {
      started.current = true
      track('referral_form_started')
    }
  }

  function setField(key: keyof Values, value: string) {
    markStarted()
    setValues((prev) => ({ ...prev, [key]: value }) as Values)
    if (key === 'fullName') setErrors((e) => ({ ...e, fullName: false }))
    if (key === 'email') setErrors((e) => ({ ...e, email: undefined }))
    if (key === 'contact') setErrors((e) => ({ ...e, contact: false }))
    if (banner) setBanner('')
  }

  function toggleChip(seg: string) {
    markStarted()
    setValues((prev) => ({
      ...prev,
      creatorTypes: prev.creatorTypes.includes(seg)
        ? prev.creatorTypes.filter((s) => s !== seg)
        : [...prev.creatorTypes, seg],
    }))
  }

  function validate(): boolean {
    const next: Errors = {}
    if (!values.fullName.trim()) next.fullName = true
    if (!values.contact.trim()) next.contact = true
    const email = values.email.trim()
    if (!email) next.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(email)) next.email = COPY.form.emailInvalid
    setErrors(next)
    const hasError = Boolean(next.fullName || next.contact || next.email)
    setBanner(hasError ? COPY.form.requiredBanner : '')
    return !hasError
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    if (!validate()) {
      track('referral_form_error', { reason: 'validation' })
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          contact: values.contact,
          social: values.social,
          country: values.country,
          creatorsCount: values.creatorsCount,
          creatorTypes: values.creatorTypes,
          audienceSize: values.audienceSize,
          aboutNetwork: values.aboutNetwork,
          _b8x2k: values._b8x2k,
          sessionId: sessionId.current,
          utm: utm.current,
        }),
      })
      if (res.ok) {
        track('referral_form_submitted')
        setSubmitted(true)
        requestAnimationFrame(() =>
          document
            .getElementById('refer-form')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        )
        return
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      const msg = typeof body.error === 'string' ? body.error : COPY.form.networkErrorMessage
      setBanner(msg)
      setStatus('idle')
      track('referral_form_error', { reason: msg })
    } catch {
      setBanner(COPY.form.networkErrorMessage)
      setStatus('idle')
      track('referral_form_error', { reason: 'network' })
    }
  }

  if (submitted) {
    return (
      <div className="border border-rule bg-paper p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-ember text-ember-deep">
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="square" />
          </svg>
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-label text-ember-deep">
          {COPY.form.success.eyebrow}
        </p>
        <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight text-ink">
          {COPY.form.success.title}
        </h3>
        <p className="mx-auto mt-4 max-w-[48ch] leading-[1.6] text-graphite">{COPY.form.success.body}</p>
      </div>
    )
  }

  const req = <span className="text-ember-deep">*</span>
  const optional = <span className={LABEL_OPTIONAL}> (optional)</span>

  return (
    <div>
      <div className="mb-8 flex items-start gap-4 border border-rule bg-paper p-5">
        <svg
          aria-hidden
          className="mt-0.5 shrink-0 text-ember-deep"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" strokeLinejoin="round" />
        </svg>
        <p className="text-[14px] leading-[1.6] text-graphite">{COPY.form.reassurance}</p>
      </div>

      <form noValidate onSubmit={onSubmit} className="border border-rule bg-paper p-6 md:p-9">
        {/* Honeypot — opaque name, double-wrapped off-screen + display:none. */}
        <div
          style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              name="_b8x2k"
              value={values._b8x2k}
              onChange={(e) => setValues((p) => ({ ...p, _b8x2k: e.target.value }))}
            />
          </div>
        </div>

        <fieldset className="border-0 p-0">
          <legend className="font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep">
            {COPY.form.infoHeading}
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pp-fullName" className={LABEL}>
                Full Name {req}
              </label>
              <input
                id="pp-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={values.fullName}
                onFocus={markStarted}
                onChange={(e) => setField('fullName', e.target.value)}
                aria-invalid={errors.fullName || undefined}
                aria-describedby={errors.fullName ? 'pp-fullName-err' : undefined}
                className={`${FIELD} ${errors.fullName ? FIELD_ERROR : ''}`}
              />
              {errors.fullName && (
                <p id="pp-fullName-err" className={errText}>
                  This one is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="pp-email" className={LABEL}>
                Email {req}
              </label>
              <input
                id="pp-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={values.email}
                onFocus={markStarted}
                onChange={(e) => setField('email', e.target.value)}
                aria-invalid={Boolean(errors.email) || undefined}
                aria-describedby={errors.email ? 'pp-email-err' : undefined}
                className={`${FIELD} ${errors.email ? FIELD_ERROR : ''}`}
              />
              {errors.email && (
                <p id="pp-email-err" className={errText}>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="pp-contact" className={LABEL}>
                WhatsApp / Telegram {req}
              </label>
              <input
                id="pp-contact"
                name="contact"
                type="text"
                placeholder="+1 234 567 8900 or @username"
                value={values.contact}
                onFocus={markStarted}
                onChange={(e) => setField('contact', e.target.value)}
                aria-invalid={errors.contact || undefined}
                aria-describedby={errors.contact ? 'pp-contact-err' : undefined}
                className={`${FIELD} ${errors.contact ? FIELD_ERROR : ''}`}
              />
              {errors.contact && (
                <p id="pp-contact-err" className={errText}>
                  This one is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="pp-social" className={LABEL}>
                Instagram / Social Profile{optional}
              </label>
              <input
                id="pp-social"
                name="social"
                type="text"
                placeholder="@yourhandle"
                value={values.social}
                onFocus={markStarted}
                onChange={(e) => setField('social', e.target.value)}
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="pp-country" className={LABEL}>
                Country{optional}
              </label>
              <input
                id="pp-country"
                name="country"
                type="text"
                autoComplete="country-name"
                placeholder="Your country"
                value={values.country}
                onFocus={markStarted}
                onChange={(e) => setField('country', e.target.value)}
                className={FIELD}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-9 border-0 border-t border-rule p-0 pt-8">
          <legend className="font-mono text-[11px] font-semibold uppercase tracking-label text-ember-deep">
            {COPY.form.networkHeading}
          </legend>
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="pp-count" className={LABEL}>
                {COPY.form.creatorsCountLabel}
              </label>
              <Select
                id="pp-count"
                value={values.creatorsCount}
                onChange={(v) => setField('creatorsCount', v)}
                onFocus={markStarted}
                options={PROGRAM.creatorsCountOptions}
                placeholder={COPY.form.selectPlaceholder}
              />
            </div>

            <div>
              <span className={LABEL}>{COPY.form.creatorTypesLabel}</span>
              <div
                role="group"
                aria-label={COPY.form.creatorTypesLabel}
                className="mt-3 flex flex-wrap gap-2.5"
              >
                {PROGRAM.segments.map((seg) => {
                  const selected = values.creatorTypes.includes(seg)
                  return (
                    <button
                      key={seg}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleChip(seg)}
                      className={`inline-flex items-center gap-2.5 border px-3.5 py-2.5 text-[14px] transition-colors ${
                        selected
                          ? 'border-ember bg-paper text-ink'
                          : 'border-rule-strong text-graphite hover:border-ink'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`flex h-5 w-5 items-center justify-center border ${
                          selected ? 'border-ember bg-ember text-paper' : 'border-rule-strong'
                        }`}
                      >
                        {selected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" strokeLinecap="square" />
                          </svg>
                        )}
                      </span>
                      {seg}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="pp-aud" className={LABEL}>
                {COPY.form.audienceSizeLabel}
                {optional}
              </label>
              <Select
                id="pp-aud"
                value={values.audienceSize}
                onChange={(v) => setField('audienceSize', v)}
                onFocus={markStarted}
                options={PROGRAM.audienceSizeOptions}
                placeholder={COPY.form.selectPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="pp-about" className={LABEL}>
                {COPY.form.aboutLabel}
                {optional}
              </label>
              <textarea
                id="pp-about"
                name="aboutNetwork"
                maxLength={PROGRAM.aboutMaxLength}
                placeholder={COPY.form.aboutPlaceholder}
                value={values.aboutNetwork}
                onFocus={markStarted}
                onChange={(e) => setField('aboutNetwork', e.target.value)}
                className={`${FIELD} min-h-[130px] resize-none`}
              />
            </div>
          </div>
        </fieldset>

        {banner && (
          <p
            role="alert"
            className="mt-6 border border-ember-deep bg-paper px-4 py-3 font-mono text-[11px] uppercase tracking-label text-ember-deep"
          >
            {banner}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 border border-transparent bg-ink px-9 py-[16px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === 'submitting' ? COPY.form.submittingLabel : COPY.form.submitLabel}
          {status !== 'submitting' && (
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          )}
        </button>
        <p className="mt-4 text-center font-mono text-[11px] tracking-[0.04em] text-graphite">
          {COPY.form.helper}
        </p>
      </form>
    </div>
  )
}
