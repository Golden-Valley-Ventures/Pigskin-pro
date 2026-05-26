interface SourceNoteProps {
  lastVerified?: string;
  scope?: string; // e.g. "AFC West", "Kansas City Chiefs"
}

export function SourceNote({ lastVerified, scope = 'AFC West' }: SourceNoteProps) {
  return (
    <footer className="mt-20 border-t border-slate3 pt-10">
      <p className="label-mono mb-4">— Source &amp; Verification</p>
      <div className="max-w-3xl space-y-3 text-sm text-iceDim leading-relaxed">
        <p>
          This page is built from verified {scope} research provided to
          Pigskin Professionals. Sections marked Pending Verification are
          intentionally withheld until source material is approved.
        </p>
        {lastVerified && (
          <p className="label-mono-dim">— Last updated: {lastVerified}</p>
        )}
        <p className="label-mono-dim">
          — Additional live data automation coming soon.
        </p>
      </div>
    </footer>
  );
}
