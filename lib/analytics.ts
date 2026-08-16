// Analytics seam. The site has no analytics provider wired yet, so this is the
// single place components call — never a vendor SDK directly. Until a provider
// is chosen, events accumulate on a window-scoped queue that a tag manager or
// SDK can flush on load. Swap the body for a real sink (Plausible, GA4, etc.)
// without touching any caller.

export type TrackProps = Record<string, string | number | boolean | null | undefined>

interface TrackedEvent {
  event: string
  props: TrackProps
  t: number
}

declare global {
  interface Window {
    __sinauraEvents?: TrackedEvent[]
  }
}

export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === 'undefined') return
  const queue = (window.__sinauraEvents ??= [])
  queue.push({ event, props, t: Date.now() })
}
