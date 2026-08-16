import type { ReactNode } from 'react'

// The "short answer" block (BUILD_SPEC §5.2 #3): the direct answer, up top,
// built for featured snippets and AI extraction. The ember rule is this page's
// single scarce-accent moment.
export function ShortAnswer({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-ember bg-paper py-4 pl-5 pr-4">
      <p className="font-mono text-[10px] uppercase tracking-label text-ember-deep">The short answer</p>
      <p className="mt-2 max-w-measure text-lg leading-[1.5] tracking-tight text-ink">{children}</p>
    </div>
  )
}
