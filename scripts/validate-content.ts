/**
 * Build-time content validation (BUILD_SPEC §4.2). Wired as the `prebuild`
 * script, so any error blocks `next build`. Run directly with `npm run validate`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { readRawDocs } from '../lib/content/loader'
import { validateDocs } from '../lib/content/validate'

// Author slugs that `author:` may resolve to, in addition to the literal
// "organization". None exist under the organization-attribution model, but the
// check stays real so a future author file is picked up automatically.
function authorSlugs(): Set<string> {
  const dir = path.join(process.cwd(), 'content', 'authors')
  if (!fs.existsSync(dir)) return new Set()
  return new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.ts'))
      .map((f) => f.replace(/\.(mdx|ts)$/, '')),
  )
}

const docs = readRawDocs()
const violations = validateDocs(docs, { authorSlugs: authorSlugs() })
const errors = violations.filter((v) => v.level === 'error')
const warnings = violations.filter((v) => v.level === 'warn')

for (const v of violations) {
  const line = `[${v.level === 'error' ? 'ERROR' : 'warn'}] ${v.file} · rule ${v.rule}: ${v.message}`
  if (v.level === 'error') console.error(line)
  else console.warn(line)
}

console.log(
  `\nContent validation: ${docs.length} doc(s), ${errors.length} error(s), ${warnings.length} warning(s).`,
)

if (errors.length) {
  console.error('Build blocked: fix the errors above.')
  process.exit(1)
}
