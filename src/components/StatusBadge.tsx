import type { Status, ResearchStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: Status | ResearchStatus | 'in-progress';
  className?: string;
}

const config: Record<string, { label: string; classes: string; dotClass: string }> = {
  'live':                 { label: 'Live',                  classes: 'pill-live',    dotClass: 'bg-gold' },
  'verified':             { label: 'Verified',              classes: 'pill-live',    dotClass: 'bg-gold' },
  'in-progress':          { label: 'In Progress',           classes: 'pill-pending', dotClass: 'bg-chalk' },
  'pending-verification': { label: 'Pending Verification',  classes: 'pill-pending', dotClass: 'bg-chalk' },
  'pending':              { label: 'Pending Verification',  classes: 'pill-pending', dotClass: 'bg-chalk' },
  'coming-soon':          { label: 'Coming Soon',           classes: 'pill-soon',    dotClass: 'bg-iceDim/60' },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const c = config[status] ?? config['coming-soon'];
  return (
    <span className={`pill ${c.classes} ${className}`}>
      <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${c.dotClass}`} />
      {c.label}
    </span>
  );
}
