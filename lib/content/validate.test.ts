import { describe, it, expect } from 'vitest'
import { validateDocs, type RawDoc } from './validate'

// A valid baseline frontmatter object; individual tests override one thing.
function fm(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    title: 'A Short Title',
    description: 'x'.repeat(150),
    slug: 'doc',
    hub: 'compliance',
    type: 'guide',
    author: 'organization',
    datePublished: '2026-08-14',
    dateModified: '2026-08-14',
    nextReview: '2099-01-01',
    ...over,
  }
}

const has = (rule: string) => (v: { rule: string }) => v.rule === rule

describe('rule 5 — statistics require sources', () => {
  it('flags a statistic with no sources', () => {
    const docs: RawDoc[] = [
      { file: 'a.mdx', data: fm({ slug: 'a', type: 'hub' }), body: 'Creators keep 80% of net.' },
    ]
    expect(validateDocs(docs).some(has('5-statistic-sources'))).toBe(true)
  })

  it('passes a statistic that carries a source', () => {
    const docs: RawDoc[] = [
      {
        file: 'a.mdx',
        data: fm({
          slug: 'a',
          type: 'hub',
          sources: [{ label: 'IRS', url: 'https://irs.gov', accessed: '2026-08-14' }],
        }),
        body: 'Set aside 30% for quarterlies.',
      },
    ]
    expect(validateDocs(docs).some(has('5-statistic-sources'))).toBe(false)
  })

  it('ignores prose with no statistic', () => {
    const docs: RawDoc[] = [
      { file: 'a.mdx', data: fm({ slug: 'a', type: 'hub' }), body: 'Plain prose, no numbers here.' },
    ]
    expect(validateDocs(docs).some(has('5-statistic-sources'))).toBe(false)
  })
})

describe('rule 6 + orphans — bidirectional linking', () => {
  it('flags a spoke its hub does not list back', () => {
    const docs: RawDoc[] = [
      { file: 'hub.mdx', data: fm({ slug: 'compliance', type: 'hub', relatedSpokes: [] }), body: 'hub body' },
      { file: 'spoke.mdx', data: fm({ slug: 'taxes', type: 'guide', parentHub: 'compliance' }), body: 'see the compliance hub' },
    ]
    expect(validateDocs(docs).some(has('6-linking'))).toBe(true)
  })

  it('passes a correctly linked hub/spoke pair', () => {
    const docs: RawDoc[] = [
      { file: 'hub.mdx', data: fm({ slug: 'compliance', type: 'hub', relatedSpokes: ['taxes'] }), body: 'read the taxes guide' },
      { file: 'spoke.mdx', data: fm({ slug: 'taxes', type: 'guide', parentHub: 'compliance' }), body: 'back up to the compliance hub' },
    ]
    const v = validateDocs(docs)
    expect(v.filter((x) => x.rule === '6-linking' || x.rule === 'orphan')).toHaveLength(0)
  })

  it('flags an orphan spoke nobody links to', () => {
    const docs: RawDoc[] = [
      { file: 'hub.mdx', data: fm({ slug: 'compliance', type: 'hub', relatedSpokes: [] }), body: 'hub body' },
      { file: 'lonely.mdx', data: fm({ slug: 'lonely', type: 'guide' }), body: 'nobody references this page' },
    ]
    expect(validateDocs(docs).some(has('orphan'))).toBe(true)
  })
})

describe('rule 1 + rule 4 — structure guards', () => {
  it('flags a too-short description', () => {
    const docs: RawDoc[] = [
      { file: 'a.mdx', data: fm({ slug: 'a', type: 'hub', description: 'too short' }), body: 'x' },
    ]
    expect(validateDocs(docs).some(has('1-description-length'))).toBe(true)
  })

  it('flags a free-text author name', () => {
    const docs: RawDoc[] = [
      { file: 'a.mdx', data: fm({ slug: 'a', type: 'hub', author: 'Jane Doe' }), body: 'x' },
    ]
    expect(validateDocs(docs).some(has('4-author'))).toBe(true)
  })

  it('accepts the organization author', () => {
    const docs: RawDoc[] = [
      { file: 'a.mdx', data: fm({ slug: 'a', type: 'hub' }), body: 'x' },
    ]
    expect(validateDocs(docs).some(has('4-author'))).toBe(false)
  })
})
