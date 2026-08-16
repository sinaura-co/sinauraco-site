import { NextResponse, type NextRequest } from 'next/server'
import { handleApplication } from '@/lib/partner/handle'
import { rateLimit } from '@/lib/partner/ratelimit'
import { persistToNotion } from '@/lib/partner/storage'
import { notify } from '@/lib/partner/notify'
import type { RequestMeta } from '@/lib/partner/types'

// Node runtime (the Notion/Resend fetches + env), never statically cached.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function extractMeta(req: NextRequest): RequestMeta {
  const h = req.headers
  const forwarded = (h.get('x-forwarded-for') ?? '').split(',')[0].trim()
  return {
    ip: forwarded || h.get('x-real-ip') || 'unknown',
    userAgent: h.get('user-agent') ?? '',
    referer: h.get('referer') ?? '',
    utm: {}, // UTM travels in the JSON body from the page URL; merged in the handler.
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = await handleApplication(raw, extractMeta(req), {
    rateLimit,
    persist: persistToNotion,
    notify,
    now: () => Date.now(),
    log: (message, error) => console.error(message, error),
  })

  return NextResponse.json(result.body, { status: result.status })
}

// Method guard — anything but POST is 405 (App Router also 405s unexported verbs,
// but this makes the Allow header explicit).
export function GET(): Response {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } })
}
