/**
 * Research Integrity Note.
 * Displayed on team/intel pages to make Pigskin.pro's content governance
 * visible. Per brand book voice: institutional 75%, with bite. Not hype.
 */
export function ResearchIntegrityNote() {
  return (
    <aside
      role="note"
      aria-label="Research integrity"
      className="relative border-l-2 border-gold/60 bg-slate2/40 pl-6 pr-5 py-5 my-12"
    >
      <p className="label-mono mb-2">— Research Integrity</p>
      <p className="text-sm text-ice/85 leading-relaxed max-w-3xl">
        Pigskin Professionals publishes division and team intelligence only
        after research has been verified. Sections marked{' '}
        <span className="text-gold font-mono uppercase tracking-wider text-xs">
          Pending Verification
        </span>{' '}
        are intentionally withheld until source material is approved.
      </p>
    </aside>
  );
}
