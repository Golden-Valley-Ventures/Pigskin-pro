import type { ReactNode } from 'react';
import { StatusBadge } from './StatusBadge';

interface ComingSoonPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  children?: ReactNode;
}

export function ComingSoonPanel({
  eyebrow,
  title,
  description,
  bullets,
  children,
}: ComingSoonPanelProps) {
  return (
    <section className="relative border border-slate3 bg-slate2/30 p-8 md:p-12 overflow-hidden">
      {/* Decorative field grid — atmosphere only, never information */}
      <div className="absolute inset-0 field-grid opacity-40 pointer-events-none" aria-hidden />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {eyebrow && <p className="label-mono">— {eyebrow}</p>}
          <StatusBadge status="coming-soon" />
        </div>

        <h2 className="display text-3xl md:text-5xl text-ice mb-6 max-w-3xl">
          {title}
        </h2>

        <p className="text-iceDim leading-relaxed max-w-2xl mb-8">{description}</p>

        {bullets && bullets.length > 0 && (
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mb-8">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm text-ice/85">
                <span className="flex-none mt-2 h-px w-4 bg-gold/60" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </section>
  );
}
