import { ImageResponse } from 'next/og'

// The site-wide default social card, served at /og and referenced explicitly by
// lib/seo/metadata.ts (so the og:image / twitter:image tags always resolve — the
// old `/og-default.png` was a 404). A plain route, not the opengraph-image file
// convention, because that convention does not merge into pages that declare
// their own `openGraph` object. Generated on-brand from the LOCKED mark + brand
// palette (no committed binary, no CDN), prerendered at build. Type renders in
// ImageResponse's built-in font — Satori cannot read our self-hosted WOFF2s;
// brand identity carries through palette + mark + layout. Not the deferred
// favicon/app-icon set — it reuses the geometry already shipped as the favicon.
export const dynamic = 'force-static'
export const contentType = 'image/png'

const BONE = '#EDE9E3'
const INK = '#0A0A0A'
const EMBER = '#C2410C'
const GRAPHITE = '#45413C'

const MARK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 146 146'>" +
      `<rect x='53' y='41' width='70' height='23' fill='${INK}'/>` +
      `<rect x='23' y='82' width='59' height='23' fill='${INK}'/>` +
      `<rect x='100' y='82' width='23' height='23' fill='${EMBER}'/>` +
      '</svg>',
  )

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: BONE,
          padding: '84px 96px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK} width={104} height={104} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: INK,
              lineHeight: 1,
            }}
          >
            Sinaura Collectives<span style={{ color: EMBER }}>.</span>
          </div>
          <div style={{ display: 'flex', width: 96, height: 6, background: EMBER, marginTop: 36 }} />
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 28,
              letterSpacing: '0.02em',
              color: GRAPHITE,
            }}
          >
            Management · Growth · Ops
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
