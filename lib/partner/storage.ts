import type { ApplicationRecord } from './types'

// Persistence adapter → Notion. Writes one page per application into the
// "Partner Applications" database. Reads NOTION_TOKEN + NOTION_DB_ID from env.
//
// Fail-safe contract: if Notion isn't configured yet, do NOT 500 the applicant —
// log a recoverable line and return (the team email carries the full application
// as the backup record). If it IS configured and the write fails, throw so the
// handler returns 500 and the applicant is asked to retry.

const NOTION_API = 'https://api.notion.com/v1/pages'
const NOTION_VERSION = '2022-06-28'

const richText = (s: string) => (s ? [{ type: 'text', text: { content: s.slice(0, 1900) } }] : [])
const asSelect = (s: string) => (s ? { name: s.slice(0, 100) } : null)

function toProperties(r: ApplicationRecord): Record<string, unknown> {
  const source = [
    r.referer && `ref: ${r.referer}`,
    ...Object.entries(r.utm).map(([k, v]) => `${k}=${v}`),
  ]
    .filter(Boolean)
    .join(' · ')

  const properties: Record<string, unknown> = {
    Name: { title: [{ type: 'text', text: { content: r.fullName || 'Unknown applicant' } }] },
    Email: { email: r.email || null },
    Contact: { rich_text: richText(r.contact) },
    Social: { rich_text: richText(r.social) },
    Country: { rich_text: richText(r.country) },
    'Creator types': { multi_select: r.creatorTypes.map((name) => ({ name })) },
    About: { rich_text: richText(r.aboutNetwork) },
    Status: { select: { name: 'New' } },
    Source: { rich_text: richText(source) },
    Session: { rich_text: richText(r.sessionId) },
    IP: { rich_text: richText(r.ip) },
    Created: { date: { start: r.createdAt } },
  }

  const count = asSelect(r.creatorsCount)
  if (count) properties['Creators count'] = { select: count }
  const audience = asSelect(r.audienceSize)
  if (audience) properties['Audience size'] = { select: audience }

  return properties
}

export async function persistToNotion(record: ApplicationRecord): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_DB_ID
  if (!token || !databaseId) {
    console.warn(
      `[partner] NOTION_TOKEN/NOTION_DB_ID not configured — application from ${record.email} not written to Notion (team email is the backup record).`,
    )
    return
  }

  const res = await fetch(NOTION_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: databaseId }, properties: toProperties(record) }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Notion write failed (${res.status}): ${detail.slice(0, 300)}`)
  }
}
