'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

// Fires the page-view analytics event once on mount. Isolated as a tiny client
// island so the page itself stays a server component.
export function PageView() {
  useEffect(() => {
    track('referral_page_view')
  }, [])
  return null
}
