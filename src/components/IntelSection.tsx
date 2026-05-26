import type { ResearchBlock } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

interface IntelSectionProps {
  block: ResearchBlock;
  index?: string;
}

/**
 * Renders a research section. Critical content-governance contract:
 * never fabricates analysis. If the block is not 'verified', the UI shows
 * a clearly-marked placeholder explaining why content is withheld.
 */
export function IntelSection({ block, index }: IntelSectionProps) {
  const isVerified = block.status === 'verified';
  const hasContent = isVerified && (block.body || (block.bullets && block.bullets.length > 0));

  return (
    <section className="border-t border-slate3/60 pt-10">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          {index && <p className="label-mono mb-2">— Section {index}</p>}
          <h2 className="display text-2xl md:text-3xl text-ice">{block.title}</h2>
        </div>
        <StatusBadge status={block.status} />
      </div>

      {hasContent ? (
        <div className="max-w-3xl">
          {block.body && (
            <p className="text-ice/90 leading-relaxed mb-6">{block.body}</p>
          )}
          {block.bullets && block.bullets.length > 0 && (
            <ul className="space-y-3">
              {block.bullets.map((b, i) => (
                <li key={i} className="flex gap-4 text-ice/90">
                  <span className="flex-none mt-2 h-px w-4 bg-gold" aria-hidden />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {block.sourceNote && (
            <p className="label-mono-dim mt-6">— {block.sourceNote}</p>
          )}
          {block.lastVerified && (
            <p className="label-mono-dim mt-2">— Last verified: {block.lastVerified}</p>
          )}
        </div>
      ) : (
        <div className="max-w-3xl border-l-2 border-leather/40 pl-6 py-2">
          <p className="text-iceDim leading-relaxed">
            {block.status === 'pending-verification'
              ? 'This section is part of the published page structure. Content is intentionally withheld until verified source material has been received and approved. Pigskin.pro does not publish unverified analysis.'
              : 'This section is part of the future research rollout. It is not yet in the research pipeline.'}
          </p>
          {block.sourceNote && (
            <p className="label-mono-dim mt-4">— {block.sourceNote}</p>
          )}
        </div>
      )}
    </section>
  );
}
