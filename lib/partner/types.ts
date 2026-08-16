// Shared types for the partner-application pipeline. Kept dependency-free so both
// the pure handler (unit-tested in node) and the real Notion/Resend adapters can
// import them without pulling in each other.

export type ApplicationStatus = 'new'

export interface RequestMeta {
  ip: string
  userAgent: string
  referer: string
  utm: Record<string, string>
}

export interface ApplicationRecord {
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
  ip: string
  userAgent: string
  referer: string
  utm: Record<string, string>
  createdAt: string
  status: ApplicationStatus
}
