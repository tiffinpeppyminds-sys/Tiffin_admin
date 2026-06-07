export function UberOneBadge({ className }: { className?: string }) {
  return (
    <span
      className={className}
      title="Uber One member"
      aria-label="Uber One member"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7.5" fill="#C7922E" stroke="#A6741F" strokeWidth="0.5" />
        <text x="8" y="11" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">
          1
        </text>
      </svg>
    </span>
  );
}
