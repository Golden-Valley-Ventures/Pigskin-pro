import Link from 'next/link';
import type { DivisionInfo } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { teams as allTeams } from '@/data/nfl/teams';

interface DivisionCardProps {
  division: DivisionInfo;
}

export function DivisionCard({ division }: DivisionCardProps) {
  const isComingSoon = division.status === 'coming-soon';
  const isClickable = !isComingSoon;
  const teams = division.teamIds.map((id) => allTeams.find((t) => t.id === id)!);

  const inner = (
    <div
      className={`relative h-full overflow-hidden border bg-slate2/30 p-7 transition-all duration-300 ${
        isClickable
          ? 'border-slate3 hover:border-gold/40 hover:bg-slate2/60 group'
          : 'border-slate3/60 opacity-50'
      }`}
    >
      <div className="flex items-start justify-between mb-6 gap-3">
        <div>
          <p className="label-mono-dim mb-2">— {division.conference} Conference</p>
          <h3 className="display text-3xl text-ice">{division.name}</h3>
        </div>
        <StatusBadge status={division.status} />
      </div>

      <div className="space-y-1.5 mb-6">
        {teams.map((t) => (
          <p key={t.id} className="font-mono text-[11px] uppercase tracking-wider text-iceDim">
            <span className="text-gold mr-3">{t.abbreviation}</span>
            {t.city} {t.shortName}
          </p>
        ))}
      </div>

      {isClickable && (
        <div className="flex items-center text-gold font-mono text-[10px] uppercase tracking-widest pt-4 border-t border-slate3/60">
          <span>
            {division.status === 'live' ? 'Open Division Intel' : 'View Division Structure'}
          </span>
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}

      {isClickable && (
        <span
          className={`absolute top-0 left-0 h-px ${
            division.status === 'live' ? 'w-16 bg-gold' : 'w-10 bg-leather'
          }`}
          aria-hidden
        />
      )}
    </div>
  );

  if (!isClickable) return <div aria-disabled>{inner}</div>;

  return (
    <Link href={`/divisions/${division.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
