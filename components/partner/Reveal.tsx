'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Scroll-reveal wrapper — IntersectionObserver + a CSS transition, no animation
// library. prefers-reduced-motion (or missing IO support) renders the final state
// immediately. Only opacity/transform move, so the content is always real DOM for
// SEO + screen readers; the <noscript> style in the layout guarantees it shows
// with JS disabled.
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined' || !el) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal
      className={`${className} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
