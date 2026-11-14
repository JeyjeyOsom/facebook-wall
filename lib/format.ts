/** "November 14, 2026 at 10:42pm" — the 2008 Facebook timestamp format. */
export function formatWallDate(iso: string): string {
  const d = new Date(iso)
  const date = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const time = d
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .toLowerCase()
    .replace(" ", "")
  return `${date} at ${time}`
}
