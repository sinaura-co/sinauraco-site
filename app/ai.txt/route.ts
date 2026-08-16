import { aiTxt } from '@/lib/seo/ai-files'

export const dynamic = 'force-static'

export function GET() {
  return new Response(aiTxt(), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
