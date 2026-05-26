import { CTAButton } from './CTAButton';

export function PremiumTeaser() {
  return (
    <section className="relative border border-gold/30 bg-gradient-to-b from-slate2/50 to-midnight p-8 md:p-12 overflow-hidden">
      <div className="absolute inset-0 field-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="relative max-w-3xl">
        <p className="label-mono mb-4">— Premium · Coming Soon</p>
        <h2 className="display text-3xl md:text-5xl text-ice mb-4">
          Built for people who actually <span className="text-gold">watch the tape.</span>
        </h2>
        <p className="text-iceDim leading-relaxed mb-8">
          A subscription tier for managers who want structure before
          speculation. Automated NFL team intel, fantasy signals, DFS slate
          tools, draft war room, waiver watch — under one disciplined roof.
        </p>
        <CTAButton href="/premium" variant="primary">
          See What Premium Will Include
        </CTAButton>
      </div>
    </section>
  );
}
