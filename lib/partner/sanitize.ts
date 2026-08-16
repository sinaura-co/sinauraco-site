import { PROGRAM } from '../../content/partner-program'
import type { ApplicationParsed } from './schema'

// Strip control characters (keeps \x09 tab, \x0A newline, \x0D CR so the textarea
// survives), trim, lowercase the email, and hard-cap every length. Runs AFTER zod
// validation — belt and suspenders before anything is stored or emailed. Escapes
// are written in \x form so no literal control byte lives in the source.

const CONTROL = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g
const clean = (s: string): string => s.replace(CONTROL, '').trim()

export interface SanitizedApplication {
  fullName: string
  email: string
  contact: string
  social: string
  country: string
  creatorsCount: string
  creatorTypes: string[]
  audienceSize: string
  aboutNetwork: string
  sessionId: string
  utm: Record<string, string>
}

export function sanitizeApplication(a: ApplicationParsed): SanitizedApplication {
  const utm: Record<string, string> = {}
  for (const [k, v] of Object.entries(a.utm).slice(0, 8)) {
    if (typeof v === 'string') utm[clean(k).slice(0, 60)] = clean(v).slice(0, 200)
  }
  return {
    fullName: clean(a.fullName).slice(0, 200),
    email: clean(a.email).toLowerCase().slice(0, 200),
    contact: clean(a.contact).slice(0, 100),
    social: clean(a.social).slice(0, 200),
    country: clean(a.country).slice(0, 100),
    creatorsCount: clean(a.creatorsCount).slice(0, 50),
    creatorTypes: a.creatorTypes.map((v) => clean(v)).filter(Boolean),
    audienceSize: clean(a.audienceSize).slice(0, 50),
    aboutNetwork: clean(a.aboutNetwork).slice(0, PROGRAM.aboutMaxLength),
    sessionId: clean(a.sessionId).slice(0, 120),
    utm,
  }
}
