import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from '@/components/content/mdx-components'

// Renders an MDX body inside a React Server Component, styled with the brand
// element map. GFM is enabled because the guides lean on tables. This module is
// import-isolated from the loader and validator so the build-time validation
// script never pulls JSX into node.
export function RenderMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  )
}
