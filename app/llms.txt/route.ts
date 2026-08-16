import { llmsTxt } from '@/lib/seo/ai-files'

export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsTxt(), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
