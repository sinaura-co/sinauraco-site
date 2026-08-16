// Emits an inline JSON-LD <script>. The `<` escape is the standard, sufficient
// guard against breaking out of the script element; the payload is our own
// build-time data, never user input.
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
