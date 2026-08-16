// Maps a content doc to its canonical site route. Hubs live at
// /resources/<hub>; spokes at /resources/<parentHub>/<slug>.
export function docRoute(doc: { type: string; slug: string; parentHub?: string }): string {
  return doc.type === 'hub'
    ? `/resources/${doc.slug}`
    : `/resources/${doc.parentHub}/${doc.slug}`
}
