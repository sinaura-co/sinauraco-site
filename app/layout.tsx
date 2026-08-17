import type { Metadata } from 'next'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // The template appends the brand suffix exactly once to any page-set title —
  // matching BRAND_SUFFIX in the content validator (§4.2 rules 2–3).
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} is a creator management and brand-side agency. ${site.tagline}.`,
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 146 146'>" +
              "<rect width='146' height='146' fill='#EDE9E3'/>" +
              "<rect x='53' y='41' width='70' height='23' fill='#0A0A0A'/>" +
              "<rect x='23' y='82' width='77' height='23' fill='#0A0A0A'/>" +
              "<rect x='100' y='82' width='23' height='23' fill='#C2410C'/>" +
              '</svg>'
          ),
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Archivo-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* AI-file discovery link (BUILD_SPEC §10.2). */}
        <link rel="alternate" type="text/plain" href={`${site.url}/llms.txt`} />
      </head>
      <body>
        {children}
        {/* Reveal animations are progressive enhancement — force content visible if JS is off. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </body>
    </html>
  )
}
