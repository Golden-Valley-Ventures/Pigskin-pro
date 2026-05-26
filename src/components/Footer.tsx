import Link from 'next/link';
import { Logo } from './Logo';
import { primaryNav } from '@/lib/nav';

export function Footer() {
  const liveLinks = primaryNav.filter((n) => n.status === 'live');
  const futureLinks = primaryNav.filter((n) => n.status === 'coming-soon');

  return (
    <footer className="mt-32 border-t border-slate3/60 bg-midnight">
      <div className="container-pp py-16">
        {/* Manifesto line — promoted to lead emotional line per V1.1 */}
        <div className="mb-16 max-w-3xl">
          <p className="label-mono mb-4">— The Line</p>
          <h2 className="display text-3xl md:text-5xl text-ice/90">
            We don't have takes.<br />
            <span className="text-gold">We have reads.</span>
          </h2>
        </div>

        <div className="hairline mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Logo showTagline />
            <p className="mt-6 max-w-sm text-sm text-iceDim leading-relaxed">
              Front-office style analysis for fantasy football decisions.
              Verified research, rolled out division by division.
            </p>
          </div>

          <div>
            <p className="label-mono mb-4">— Live</p>
            <ul className="space-y-2">
              {liveLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ice/80 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono mb-4">— Coming Soon</p>
            <ul className="space-y-2">
              {futureLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-iceDim/70 hover:text-iceDim transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        {/* Disclaimer */}
        <p className="text-xs text-iceDim/70 leading-relaxed max-w-3xl">
          Pigskin Professionals provides football research and fantasy analysis
          for informational and entertainment purposes only. No outcome is
          guaranteed. Future betting-related tools, if added, will be
          informational only and subject to applicable laws and platform
          policies.
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label-mono-dim">
            © 2026 Pigskin Professionals, Inc. — All rights reserved.
          </p>
          <p className="label-mono-dim">
            pigskin.pro · v1.1 · Built by Pigskin Professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
