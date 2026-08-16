'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@/content/site'
import { CAREERS } from '@/content/careers'

// Chat-specialist application form. There is no dedicated careers endpoint yet,
// so it posts to the same Formspree the /contact form uses (xwvzyryz) but tags
// every submission with a `_subject` and a hidden `role`, so careers applications
// are trivially filterable from general messages. A `_gotcha` honeypot catches
// bots. Swap FORMSPREE for a dedicated form id if these should live in a separate
// inbox. Styling mirrors ContactForm (square inputs, ember-deep focus).
type Status = 'idle' | 'sending' | 'sent' | 'error'

const FORMSPREE = 'https://formspree.io/f/xwvzyryz'

export function CareersForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-rule bg-paper p-8">
        <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">
          Application received
        </p>
        <p className="mt-3 text-lg leading-[1.5] text-ink">
          Thanks — if it’s a fit, we’ll reply at the email you gave us.
        </p>
      </div>
    )
  }

  const field =
    'mt-2 w-full border border-rule-strong bg-bone px-4 py-3 text-ink outline-none transition-colors placeholder:text-graphite placeholder:opacity-50 focus:border-ember-deep'
  const label = 'block font-mono text-[11px] font-semibold uppercase tracking-label text-ink'

  return (
    <form onSubmit={handleSubmit} className="border border-rule bg-paper p-7 md:p-8">
      {/* Tags for the shared inbox + a honeypot. */}
      <input type="hidden" name="_subject" value={`${CAREERS.role} application — sinauraco.com`} />
      <input type="hidden" name="role" value={CAREERS.role} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="space-y-5">
        <div>
          <label htmlFor="cr-name" className={label}>
            Name <span className="text-ember-deep">*</span>
          </label>
          <input
            id="cr-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cr-email" className={label}>
            Email <span className="text-ember-deep">*</span>
          </label>
          <input
            id="cr-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cr-experience" className={label}>
            Relevant experience
          </label>
          <textarea
            id="cr-experience"
            name="experience"
            rows={3}
            placeholder="Sales, messaging, community, support — and any links that show your writing."
            className={`${field} resize-y`}
          />
        </div>
        <div>
          <label htmlFor="cr-pitch" className={label}>
            Why you’d be good at this <span className="text-ember-deep">*</span>
          </label>
          <textarea
            id="cr-pitch"
            name="pitch"
            required
            rows={4}
            placeholder="A few lines in your own voice — this is the writing sample that matters most."
            className={`${field} resize-y`}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-ember-deep">
          Something went wrong — email us directly at {site.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-transparent bg-ink px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Apply now'}
      </button>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-graphite">
        18+ only · Remote · We read every application ourselves
      </p>
    </form>
  )
}
