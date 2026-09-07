/** Monograma M. Traço fino a dourado, com a diagonal longa em creme. */
export default function Logo({ size = 26, className = '' }) {
  return (
    <svg
      className={['mark', className].filter(Boolean).join(' ')}
      width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"
    >
      <path d="M28 82 V26" />
      <path d="M28 26 L50 62" />
      <path d="M50 62 L72 26" />
      <path d="M72 26 V82" />
      <path d="M22 88 L78 18" />
    </svg>
  );
}

/** "Magna Properties" em serif editorial — a segunda palavra em itálico. */
export function Wordmark({ className = '' }) {
  return (
    <span className={['brand__word', className].filter(Boolean).join(' ')}>
      Magna <em>Properties</em>
    </span>
  );
}
