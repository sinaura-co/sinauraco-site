// Single-open accordion reducer — clicking the already-open item closes it,
// otherwise the clicked item becomes the only open one. Pure, so the "one open at
// a time" behaviour is unit-tested independently of the DOM.
export function nextOpenIndex(current: number | null, clicked: number): number | null {
  return current === clicked ? null : clicked
}
