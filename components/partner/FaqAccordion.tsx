'use client'

import { useState } from 'react'
import { COPY } from '@/content/partner-program'
import { nextOpenIndex } from '@/lib/partner/faq'
import { track } from '@/lib/analytics'

// Single-open accordion. Clicking the open item closes it; the chevron rotates
// 180°; closed panels are unmounted (not just hidden). Full aria-expanded /
// aria-controls wiring, each panel a labelled region.
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-[760px] divide-y divide-rule border-y border-rule">
      {COPY.faq.items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => {
                  setOpen((current) => nextOpenIndex(current, i))
                  if (!isOpen) track('referral_faq_opened', { question: item.q })
                }}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-sans text-[17px] font-bold tracking-tight text-ink">
                  {item.q}
                </span>
                <svg
                  aria-hidden
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`shrink-0 text-ember-deep transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="square" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className="pb-6 pr-8"
              >
                <p className="max-w-measure leading-[1.6] text-graphite">{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
