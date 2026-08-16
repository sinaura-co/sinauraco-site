import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { frontmatterSchema, type Frontmatter } from './schema'
import type { RawDoc } from './validate'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// A parsed, validated content document plus computed fields.
export type ContentDoc = Frontmatter & {
  readingTime: number // minutes
  body: string
  file: string
}

function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...findMdxFiles(full))
    else if (entry.isFile() && entry.name.endsWith('.mdx')) out.push(full)
  }
  return out
}

// Raw read for the validator: frontmatter + body, no zod. Never throws on a
// malformed doc — that is the validator's job to report.
export function readRawDocs(): RawDoc[] {
  return findMdxFiles(CONTENT_DIR).map((full) => {
    const raw = fs.readFileSync(full, 'utf8')
    const { data, content } = matter(raw)
    return {
      file: path.relative(process.cwd(), full),
      data: data as Record<string, unknown>,
      body: content,
    }
  })
}

function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// Strict read for the runtime: throws on a malformed doc. Safe to call because
// the prebuild validator has already blocked the build on any error.
export function getAllDocs(): ContentDoc[] {
  return readRawDocs().map((r) => {
    const fm = frontmatterSchema.parse(r.data)
    return { ...fm, readingTime: readingTimeMinutes(r.body), body: r.body, file: r.file }
  })
}

export function getHubs(): ContentDoc[] {
  return getAllDocs().filter((d) => d.type === 'hub')
}

export function getSpokes(): ContentDoc[] {
  return getAllDocs().filter((d) => d.type !== 'hub')
}

export function getDocBySlug(slug: string): ContentDoc | undefined {
  return getAllDocs().find((d) => d.slug === slug)
}

export function getSpokesForHub(hubSlug: string): ContentDoc[] {
  return getAllDocs().filter((d) => d.parentHub === hubSlug)
}
