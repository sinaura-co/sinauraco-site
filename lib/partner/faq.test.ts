import { describe, it, expect } from 'vitest'
import { nextOpenIndex } from './faq'

describe('nextOpenIndex — single-open accordion', () => {
  it('opens a closed item', () => {
    expect(nextOpenIndex(null, 2)).toBe(2)
  })

  it('switches directly to a different item', () => {
    expect(nextOpenIndex(1, 3)).toBe(3)
  })

  it('closes the open item when it is clicked again', () => {
    expect(nextOpenIndex(2, 2)).toBeNull()
  })
})
