interface MetricCardProps {
  label: string;
  value: string;
  context?: string;
}

/**
 * Front-office style metric tile.
 * NOTE: this component does not invent numbers — it only renders values
 * passed in from verified data sources.
 */
export function MetricCard({ label, value, context }: MetricCardProps) {
  return (
    <div className="relative border border-slate3 bg-slate2/30 p-5 group">
      <span className="absolute top-0 left-0 h-px w-8 bg-gold/60" aria-hidden />
      <p className="label-mono-dim mb-3">— {label}</p>
      <p className="display text-4xl text-ice mb-1">{value}</p>
      {context && (
        <p className="font-mono text-[10px] uppercase tracking-widest text-iceDim/80">
          {context}
        </p>
      )}
    </div>
  );
}
