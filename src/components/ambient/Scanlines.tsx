export function Scanlines() {
  // Note: the page's bg-noise layer is rendered once in AppShell; this
  // component only owns the scanlines overlay.
  return <div className="scanlines" aria-hidden />
}
