'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  /** Stop observing after the first intersection (default). */
  once?: boolean
}

/**
 * Reports `true` once the element scrolls into view. Defaults to a single,
 * one-way trigger — reveals and counters fire once and never re-hide on scroll
 * back up (§A1). Falls back to `true` immediately when IntersectionObserver is
 * unavailable, so content is never stranded hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.12, rootMargin = '0px 0px -8% 0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (typeof IntersectionObserver === 'undefined' || !el) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) io.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
