// Best-effort, in-memory, per-instance sliding-window limiter: 5 requests / hour
// per IP. Serverless instances do NOT share this Map, so it is an abuse speed-bump,
// not a hard global cap — for a hard limit, back it with a shared store (Vercel KV
// / Upstash). Fine for a low-volume referral form; the honeypot does the heavy
// lifting against bots.

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

export function rateLimit(ip: string, now: number): boolean {
  const key = ip || 'unknown'
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

// Test-only: clear the window between cases.
export function __resetRateLimit(): void {
  hits.clear()
}
