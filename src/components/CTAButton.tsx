import Link from 'next/link';
import type { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  external?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
}: CTAButtonProps) {
  const base =
    'group inline-flex items-center gap-3 px-5 py-3 font-mono text-[11px] uppercase tracking-widest transition-all duration-200';

  const styles = {
    primary:
      'bg-gold text-midnight hover:bg-gold/90 hover:-translate-y-px shadow-[0_0_0_1px_rgba(224,169,58,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]',
    secondary:
      'border border-ice/20 text-ice hover:border-gold/60 hover:text-gold bg-slate2/30 backdrop-blur',
    ghost:
      'text-iceDim hover:text-gold border border-transparent hover:border-gold/30',
  } as const;

  const arrow = (
    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      {arrow}
    </Link>
  );
}
