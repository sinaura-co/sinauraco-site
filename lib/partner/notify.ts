import type { ApplicationRecord } from './types'

// Notification adapter → Resend. Sends the team alert AND the applicant
// confirmation. Reads RESEND_API_KEY (+ optional PARTNER_FROM_EMAIL /
// PARTNER_TEAM_EMAIL) from env. All user input is HTML-escaped before it touches
// an email body. The two sends are independent (Promise.allSettled) so one
// failing never blocks the other, and this function never throws — the handler
// treats notification as best-effort.

const RESEND_API = 'https://api.resend.com/emails'

const esc = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

async function sendEmail(payload: {
  from: string
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend failed (${res.status}): ${detail.slice(0, 200)}`)
  }
}

function teamHtml(r: ApplicationRecord): string {
  const row = (k: string, v: string) =>
    v
      ? `<tr><td style="padding:4px 14px 4px 0;color:#45413c;vertical-align:top">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`
      : ''
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0a">
    <h2 style="margin:0 0 12px">New partner application</h2>
    <table style="border-collapse:collapse;font-size:14px">
      ${row('Name', r.fullName)}
      ${row('Email', r.email)}
      ${row('Contact', r.contact)}
      ${row('Social', r.social)}
      ${row('Country', r.country)}
      ${row('Creators to refer', r.creatorsCount)}
      ${row('Creator types', r.creatorTypes.join(', '))}
      ${row('Audience size', r.audienceSize)}
      ${row('About their network', r.aboutNetwork)}
      ${row('Session', r.sessionId)}
      ${row('Received', r.createdAt)}
    </table>
  </div>`
}

function applicantHtml(r: ApplicationRecord): string {
  const name = r.fullName ? r.fullName.split(' ')[0] : 'there'
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0a;line-height:1.6;font-size:15px">
    <p>Hi ${esc(name)},</p>
    <p>Thanks for applying to the Sinaura Partner Program. We&rsquo;ve received your application and our team will review it and reach out to discuss the referral process and next steps &mdash; typically within a few business days.</p>
    <p>You don&rsquo;t need to share any creator&rsquo;s identity yet. We establish the partnership first.</p>
    <p style="margin-top:20px">&mdash; Sinaura Collectives</p>
  </div>`
}

export async function notify(record: ApplicationRecord): Promise<void> {
  const from = process.env.PARTNER_FROM_EMAIL || 'Sinaura Collectives <partners@sinauraco.com>'
  const team = process.env.PARTNER_TEAM_EMAIL || 'contact@sinauraco.com'

  if (!process.env.RESEND_API_KEY) {
    console.warn(`[partner] RESEND_API_KEY not configured — no emails sent for ${record.email}.`)
    return
  }

  const results = await Promise.allSettled([
    sendEmail({
      from,
      to: team,
      subject: `New partner application — ${record.fullName || record.email}`,
      html: teamHtml(record),
      replyTo: record.email || undefined,
    }),
    sendEmail({
      from,
      to: record.email,
      subject: 'We received your Sinaura partner application',
      html: applicantHtml(record),
    }),
  ])

  const failures = results.filter((r) => r.status === 'rejected')
  if (failures.length) {
    console.error(`[partner] ${failures.length} notification email(s) failed for ${record.email}`)
  }
}
