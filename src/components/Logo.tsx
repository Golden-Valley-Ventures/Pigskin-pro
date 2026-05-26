import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark';
  className?: string;
  showTagline?: boolean;
}

/**
 * "The Hash" — Direction B primary mark.
 * Construction from the brand book:
 *   - 120 × 140 base, 14-unit bar weight
 *   - Three horizontal bars (top / middle "PRO bar" / bottom chain ticks)
 *   - Two upright verticals
 * Reads as: hash mark / goalpost / P-monogram / signal bar.
 */
export function HashMark({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      className={className}
      role="img"
      aria-label="Pigskin.pro hash mark"
    >
      {/* Faint upright posts */}
      <rect x="30" y="10" width="6" height="120" fill="currentColor" opacity="0.18" />
      <rect x="84" y="10" width="6" height="120" fill="currentColor" opacity="0.18" />

      {/* Top hash bar */}
      <rect x="20" y="18" width="80" height="14" rx="1" fill="#E0A93A" />

      {/* Center "PRO" bar — the brand name encoded in geometry */}
      <rect x="16" y="63" width="88" height="14" rx="1" fill="#E0A93A" />

      {/* Bottom chain ticks — references the chain crew */}
      <rect x="20" y="108" width="32" height="14" rx="1" fill="#E0A93A" />
      <rect x="68" y="108" width="32" height="14" rx="1" fill="#E0A93A" />
    </svg>
  );
}

export function Logo({ variant = 'full', className = '', showTagline = false }: LogoProps) {
  if (variant === 'mark') {
    return <HashMark className={className} />;
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`} aria-label="Pigskin.pro home">
      <HashMark size={32} className="text-ice" />
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-tight text-ice">
          PIGSKIN<span className="text-gold">.PRO</span>
        </span>
        {showTagline && (
          <span className="label-mono mt-1.5">Professional Fantasy Intelligence</span>
        )}
      </div>
    </Link>
  );
}
