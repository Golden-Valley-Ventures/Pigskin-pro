'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { primaryNav } from '@/lib/nav';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate3/60 bg-midnight/85 backdrop-blur-md">
      <div className="container-pp flex items-center justify-between py-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                item.status === 'coming-soon'
                  ? 'text-iceDim/60 hover:text-iceDim'
                  : 'text-ice hover:text-gold'
              }`}
            >
              {item.label}
              {item.status === 'coming-soon' && (
                <span className="ml-1.5 text-[8px] text-iceDim/50">SOON</span>
              )}
              <span className="absolute inset-x-3 -bottom-px h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          className="xl:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
        >
          <span className={`block h-px w-6 bg-ice transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-ice transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-ice transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="xl:hidden border-t border-slate3/60 bg-midnight"
        >
          <div className="container-pp py-4 grid grid-cols-2 gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-3 py-3 font-mono text-[11px] uppercase tracking-widest border-b border-slate3/40 ${
                  item.status === 'coming-soon'
                    ? 'text-iceDim/60'
                    : 'text-ice'
                }`}
              >
                <span>{item.label}</span>
                {item.status === 'coming-soon' && (
                  <span className="text-[8px] text-iceDim/50">SOON</span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
