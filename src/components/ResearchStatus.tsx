import type { Status } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface ResearchStatusProps {
  status: Status;
  lastVerified?: string;
  scope?: string; // e.g. "AFC West"
}

export function ResearchStatus({ status, lastVerified, scope }: ResearchStatusProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 px-5 bg-slate2/40 border border-slate3 rounded-sharp">
      <div className="flex items-center gap-3">
        <span className="label-mono-dim">— Research Status</span>
        <StatusBadge status={status} />
      </div>
      {scope && (
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate3">
          <span className="label-mono-dim">— Scope</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ice">
            {scope}
          </span>
        </div>
      )}
      {lastVerified && (
        <div className="flex items-center gap-3 pl-4 md:border-l md:border-slate3">
          <span className="label-mono-dim">— Last Verified</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ice">
            {lastVerified}
          </span>
        </div>
      )}
    </div>
  );
}
