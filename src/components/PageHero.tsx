import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  fileNumber?: string; // mimics "FILE 002 / 124" pattern from brand book
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  fileNumber,
  children,
}: PageHeroProps) {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 field-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="container-pp relative">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8 md:mb-12">
          <p className="label-mono">— {eyebrow}</p>
          {fileNumber && <p className="label-mono-dim">{fileNumber}</p>}
        </div>

        <h1 className="display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ice max-w-5xl mb-8">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-iceDim leading-relaxed max-w-3xl">
            {description}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
