'use client'

import { useEffect, useRef } from 'react'
import './results.css'

// RESULTS section — mounted verbatim from the owner-supplied standalone file
// (~/Downloads/sinauraco-results.html). It is namespaced (sr-res-/sr-c-, tokens on
// .sr-res-root), collision-tested, and figure-exact. The markup is injected exactly
// as authored so every dollar figure, percentage, inline style (bar height + --d
// stagger), aria attribute, role, and per-slide label is byte-identical — this is
// trusted STATIC content authored in-repo (no props, no interpolation, no user
// input), which is why dangerouslySetInnerHTML is safe here. The source's IIFE is
// ported into the effect below (empty deps); every listener is bound with an
// AbortController signal and the IntersectionObserver is disconnected on cleanup, so
// re-runs (StrictMode) and unmount tear everything down. The only change from source
// is the CSS's --sr-mono → the site's --font-mono (IBM Plex Mono); see results.css.
const RESULTS_INNER_HTML = `
  <div class="sr-res-wrap">

    <header class="sr-res-head">
      <p class="sr-res-eyebrow">Results</p>
      <h2 class="sr-res-title" id="sr-res-title">Three accounts, before and after</h2>
      <p class="sr-res-deck">
        One started from nothing, one had been grinding alone for a year, one arrived
        damaged. These are their monthly gross figures, taken from platform statements,
        with no cherry-picked weeks in between.
      </p>
    </header>

    <div class="sr-c" role="region" aria-roledescription="carousel" aria-label="Creator results">

      <div class="sr-c-bar-top">
        <p class="sr-c-count"><span data-sr-idx>1</span> <span class="sr-c-slash">/</span> 3</p>
        <div class="sr-c-nav">
          <button class="sr-c-arrow" type="button" data-sr-prev aria-label="Previous creator">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20"/></svg>
          </button>
          <button class="sr-c-arrow" type="button" data-sr-next aria-label="Next creator">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20"/></svg>
          </button>
        </div>
      </div>

      <div class="sr-c-track" data-sr-track tabindex="0" aria-label="Swipe or use arrow keys to change creator">

        <!-- ══ MODEL A ══ -->
        <article class="sr-c-slide" data-sr-slide aria-roledescription="slide" aria-label="1 of 3, Model A">
          <p class="sr-res-tag">Model A <span class="sr-res-tag-sep">/</span> New creator</p>
          <h3 class="sr-res-case">$267.60 to $19,660.72 a month</h3>
          <p class="sr-res-note">Month one to month four under management.</p>

          <div class="sr-c-plot">
            <span class="sr-c-max">$20K</span>
            <div class="sr-c-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="sr-c-bars" role="img"
                 aria-label="Monthly earnings rise from $267.60 in month one to $19,660.72 in month four.">
              <div class="sr-c-col">
                <span class="sr-c-val" data-c="267.60" data-dec="2">$0</span>
                <div class="sr-c-bar" style="height:1.34%;--d:.10s"></div>
                <span class="sr-c-lab">Month 1</span>
              </div>
              <div class="sr-c-col">
                <span class="sr-c-val" data-c="2030.80" data-dec="2">$0</span>
                <div class="sr-c-bar" style="height:10.15%;--d:.25s"></div>
                <span class="sr-c-lab">Month 2</span>
              </div>
              <div class="sr-c-col">
                <span class="sr-c-val" data-c="9005.41" data-dec="2">$0</span>
                <div class="sr-c-bar" style="height:45.03%;--d:.40s"></div>
                <span class="sr-c-lab">Month 3</span>
              </div>
              <div class="sr-c-col">
                <span class="sr-c-val sr-c-val--peak" data-c="19660.72" data-dec="2">$0</span>
                <div class="sr-c-bar sr-c-bar--peak" style="height:98.3%;--d:.55s"></div>
                <span class="sr-c-lab">Month 4</span>
              </div>
            </div>
          </div>

          <footer class="sr-c-foot">
            <p class="sr-c-delta" data-c="7247" data-pre="+" data-suf="%" data-plain>+0%</p>
            <p class="sr-c-sub">$30,964.53 earned across the four months</p>
          </footer>
        </article>

        <!-- ══ MODEL B ══ -->
        <article class="sr-c-slide" data-sr-slide aria-roledescription="slide" aria-label="2 of 3, Model B">
          <p class="sr-res-tag">Model B <span class="sr-res-tag-sep">/</span> Self-managed, twelve months</p>
          <h3 class="sr-res-case">$500 a month for a year.<br>$7,500 in month one with us.</h3>
          <p class="sr-res-note">Running the account herself before signing.</p>

          <div class="sr-c-plot">
            <span class="sr-c-max">$7.5K</span>
            <div class="sr-c-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="sr-c-bars sr-c-bars--pair" role="img"
                 aria-label="Monthly earnings rise from a $500 self-managed average to $7,500 in the first managed month.">
              <div class="sr-c-col">
                <span class="sr-c-val" data-c="500">$0</span>
                <div class="sr-c-bar" style="height:6.67%;--d:.15s"></div>
                <span class="sr-c-lab">12-month average</span>
              </div>
              <div class="sr-c-col">
                <span class="sr-c-val sr-c-val--peak" data-c="7500">$0</span>
                <div class="sr-c-bar sr-c-bar--peak" style="height:100%;--d:.35s"></div>
                <span class="sr-c-lab">First month</span>
              </div>
            </div>
          </div>

          <footer class="sr-c-foot">
            <p class="sr-c-delta" data-c="1400" data-pre="+" data-suf="%" data-plain>+0%</p>
            <p class="sr-c-sub">First month under management</p>
          </footer>
        </article>

        <!-- ══ MODEL C ══ -->
        <article class="sr-c-slide" data-sr-slide aria-roledescription="slide" aria-label="3 of 3, Model C">
          <p class="sr-res-tag">Model C <span class="sr-res-tag-sep">/</span> Account recovery</p>
          <h3 class="sr-res-case">$2,000 to $10,000 a month</h3>
          <p class="sr-res-note">Came to us after a prior agency's chatting had already damaged the account.</p>

          <div class="sr-c-plot">
            <span class="sr-c-max">$10K</span>
            <div class="sr-c-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="sr-c-bars sr-c-bars--pair" role="img"
                 aria-label="Monthly earnings rise from $2,000 at handover to $10,000 under management.">
              <div class="sr-c-col">
                <span class="sr-c-val" data-c="2000">$0</span>
                <div class="sr-c-bar" style="height:20%;--d:.15s"></div>
                <span class="sr-c-lab">At handover</span>
              </div>
              <div class="sr-c-col">
                <span class="sr-c-val sr-c-val--peak" data-c="10000">$0</span>
                <div class="sr-c-bar sr-c-bar--peak" style="height:100%;--d:.35s"></div>
                <span class="sr-c-lab">Under management</span>
              </div>
            </div>
          </div>

          <footer class="sr-c-foot">
            <p class="sr-c-delta" data-c="400" data-pre="+" data-suf="%" data-plain>+0%</p>
            <p class="sr-c-sub">Monthly earnings under management</p>
          </footer>
        </article>

      </div>

      <div class="sr-c-dots" role="tablist" aria-label="Choose creator">
        <button class="sr-c-dot" type="button" role="tab" data-sr-dot="0" aria-label="Model A"></button>
        <button class="sr-c-dot" type="button" role="tab" data-sr-dot="1" aria-label="Model B"></button>
        <button class="sr-c-dot" type="button" role="tab" data-sr-dot="2" aria-label="Model C"></button>
      </div>
    </div>

    <p class="sr-res-foot">
      Figures are gross monthly earnings taken from platform statements. Results vary with
      niche, content volume, and the audience an account starts with.
    </p>

  </div>`

export function ResultsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const track = root.querySelector<HTMLElement>('[data-sr-track]')
    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-sr-slide]'))
    const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-sr-dot]'))
    const idxEl = root.querySelector<HTMLElement>('[data-sr-idx]')
    const prev = root.querySelector<HTMLButtonElement>('[data-sr-prev]')
    const next = root.querySelector<HTMLButtonElement>('[data-sr-next]')
    if (!track || slides.length === 0) return
    const trackEl: HTMLElement = track

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controller = new AbortController()
    const { signal } = controller
    const rafs = new Set<number>()
    let current = 0

    const fmt = (n: number, el: HTMLElement): string => {
      const s = el.dataset.dec
        ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : Math.round(n).toLocaleString('en-US')
      return (el.dataset.pre || (el.hasAttribute('data-plain') ? '' : '$')) + s + (el.dataset.suf || '')
    }

    const play = (slide: HTMLElement): void => {
      if (slide.classList.contains('is-sr-played')) return
      slide.classList.add('is-sr-played')
      slide.querySelectorAll<HTMLElement>('[data-c]').forEach((el) => {
        const target = parseFloat(el.dataset.c ?? '0')
        if (still) {
          el.textContent = fmt(target, el)
          return
        }
        const dur = 1000
        let t0: number | null = null
        const step = (ts: number): void => {
          if (t0 === null) t0 = ts
          const p = Math.min((ts - t0) / dur, 1)
          const e = 1 - Math.pow(1 - p, 3)
          el.textContent = fmt(el.dataset.dec ? target * e : Math.round(target * e), el)
          if (p < 1) rafs.add(requestAnimationFrame(step))
        }
        rafs.add(requestAnimationFrame(step))
      })
    }

    const sync = (i: number): void => {
      current = i
      if (idxEl) idxEl.textContent = String(i + 1)
      dots.forEach((d, n) => d.setAttribute('aria-selected', n === i ? 'true' : 'false'))
      if (prev) prev.disabled = i === 0
      if (next) next.disabled = i === slides.length - 1
    }

    const go = (i: number): void => {
      const clamped = Math.max(0, Math.min(slides.length - 1, i))
      trackEl.scrollTo({
        left: slides[clamped].offsetLeft - slides[0].offsetLeft,
        behavior: still ? 'auto' : 'smooth',
      })
      sync(clamped)
    }

    prev?.addEventListener('click', () => go(current - 1), { signal })
    next?.addEventListener('click', () => go(current + 1), { signal })
    dots.forEach((d) => {
      d.addEventListener('click', () => go(parseInt(d.dataset.srDot ?? '0', 10)), { signal })
    })
    trackEl.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          go(current + 1)
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          go(current - 1)
        }
      },
      { signal },
    )

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              play(el)
              sync(slides.indexOf(el))
            }
          })
        },
        { root: trackEl, threshold: 0.6 },
      )
      slides.forEach((s) => io?.observe(s))
    } else {
      slides.forEach(play)
    }

    sync(0)

    return () => {
      controller.abort()
      io?.disconnect()
      rafs.forEach((id) => cancelAnimationFrame(id))
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="sr-res-root"
      id="results"
      aria-labelledby="sr-res-title"
      dangerouslySetInnerHTML={{ __html: RESULTS_INNER_HTML }}
    />
  )
}
