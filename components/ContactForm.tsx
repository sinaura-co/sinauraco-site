'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@/content/site'

// The /contact message form, ported from the live site (Formspree action
// xwvzyryz). Progressive: posts via fetch and swaps to an inline success state;
// on failure it points the reader at the direct email rather than silently
// dropping the message. Square inputs, ember-deep focus — the live form styling.
type Status = 'idle' | 'sending' | 'sent' | 'error'

const FORMSPREE = 'https://formspree.io/f/xwvzyryz'

export function ContactForm() {
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
        <p className="font-mono text-[11px] uppercase tracking-label text-ember-deep">Message sent</p>
        <p className="mt-3 text-lg leading-[1.5] text-ink">
          Thanks &mdash; we&rsquo;ll reply at the email you gave us.
        </p>
      </div>
    )
  }

  const field =
    'mt-2 w-full border border-rule-strong bg-bone px-4 py-3 text-ink outline-none transition-colors placeholder:text-graphite placeholder:opacity-50 focus:border-ember-deep'
  const label = 'block font-mono text-[11px] font-semibold uppercase tracking-label text-ink'

  return (
    <form onSubmit={handleSubmit} className="border border-rule bg-paper p-7 md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email <span className="text-ember-deep">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cf-message" className={label}>
            Message <span className="text-ember-deep">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className={`${field} resize-y`}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-ember-deep">
          Something went wrong &mdash; email us directly at {site.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-transparent bg-ink px-10 py-[18px] font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
