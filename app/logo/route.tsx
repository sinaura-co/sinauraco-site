import { ImageResponse } from 'next/og'

// The Organization schema logo (referenced by lib/seo/schema.ts as `${url}/logo`).
// A square render of the LOCKED mark on bone — the brand's actual logo mark, used
// by search engines in knowledge panels. Generated (no committed binary, no CDN),
// prerendered at build. Reuses the geometry already shipped as the favicon, so it
// introduces no new brand decision (distinct from the deferred favicon/app-icon set).
export const dynamic = 'force-static'
export const contentType = 'image/png'

const SIZE = 1024
const BONE = '#EDE9E3'
const INK = '#0A0A0A'
const EMBER = '#C2410C'

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
          alignItems: 'center',
          justifyContent: 'center',
          background: BONE,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK} width={620} height={620} alt="" />
      </div>
    ),
    { width: SIZE, height: SIZE },
  )
}
