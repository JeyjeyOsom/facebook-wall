/** The 2008 default-avatar silhouette: white bust on pale Facebook blue. */
export function Silhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" fill="#d8dfea" />
      <circle cx="50" cy="38" r="17" fill="#ffffff" />
      <ellipse cx="50" cy="92" rx="31" ry="26" fill="#ffffff" />
    </svg>
  )
}
