import Link from 'next/link';
import type { Team } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const isComingSoon = team.status === 'coming-soon';
  const isPending = team.status === 'pending-verification';
  const isLive = team.status === 'live';
  const isClickable = isLive || isPending;

  const content = (
    <div
      className={`group relative h-full overflow-hidden border bg-slate2/30 p-6 transition-all duration-300 ${
        isClickable
          ? 'border-slate3 hover:border-gold/40 hover:bg-slate2/60 hover:-translate-y-0.5'
          : 'border-slate3/60 opacity-50'
      }`}
    >
      {/* Per brand book: no generic football clip art. Abbreviation as type. */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="label-mono-dim mb-1">{team.conference} · {team.division}</p>
          <p className="display text-4xl text-ice">{team.abbreviation}</p>
        </div>
        <StatusBadge status={team.status} />
      </div>

      <h3 className="text-base font-medium text-ice mb-1">{team.city}</h3>
      <p className="text-sm text-iceDim mb-4">{team.shortName}</p>

      {isLive && team.shortSummary && (
        <p className="text-xs text-iceDim/80 leading-relaxed border-t border-slate3/60 pt-4">
          {team.shortSummary}
        </p>
      )}

      {isPending && (
        <p className="text-xs text-chalk/70 leading-relaxed border-t border-slate3/60 pt-4">
          Team page structure published. Verified research integration pending.
        </p>
      )}

      {isClickable && (
        <div className="mt-6 flex items-center text-gold font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{isLive ? 'Open Intel' : 'View Page Structure'}</span>
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}

      {/* Gold accent bar — only on live / pending */}
      {isClickable && (
        <span
          className={`absolute top-0 left-0 h-px ${isLive ? 'w-12 bg-gold' : 'w-8 bg-leather'}`}
          aria-hidden
        />
      )}
    </div>
  );

  if (!isClickable) {
    return <div aria-disabled className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/teams/${team.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
