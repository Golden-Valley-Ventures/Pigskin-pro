import { CTAButton } from '@/components/CTAButton';
import { DivisionCard } from '@/components/DivisionCard';
import { divisions } from '@/data/nfl/divisions';
import { roadmap } from '@/data/site/roadmap';
import { StatusBadge } from '@/components/StatusBadge';

export default function HomePage() {
  const afcWest = divisions.find((d) => d.slug === 'afc-west')!;
  const otherDivisions = divisions.filter((d) => d.slug !== 'afc-west');

  return (
    <>
      {/* --------------------------- HERO --------------------------- */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 field-grid opacity-40 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(224,169,58,0.10), transparent 60%)',
          }}
        />

        <div className="container-pp relative">
          {/* File-number header in the brand book style */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 md:mb-16">
            <p className="label-mono">— Foundation Build · v1.1</p>
            <p className="label-mono-dim">FILE 001 / 124</p>
          </div>

          {/* Manifesto line — the new emotional lead per V1.1 */}
          <h1 className="display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ice max-w-6xl mb-10">
            We don't have takes.<br />
            <span className="text-gold">We have reads.</span>
          </h1>

          <p className="text-lg md:text-xl text-iceDim leading-relaxed max-w-2xl mb-4">
            Front-office style NFL and fantasy football intelligence. Verified
            team research, fantasy signals, depth chart movement, and market
            context — built for managers who want structure before speculation.
          </p>

          <p className="text-base text-iceDim/80 leading-relaxed max-w-2xl mb-12">
            Rolling out division by division. Research is published only after
            it has been verified.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton href="/divisions/afc-west" variant="primary">
              Explore AFC West Intel
            </CTAButton>
            <CTAButton href="#roadmap" variant="secondary">
              View Coming Soon Roadmap
            </CTAButton>
          </div>
        </div>
      </section>

      {/* --------------------------- TRUST STRIP --------------------------- */}
      <section className="border-y border-slate3 bg-slate2/30">
        <div className="container-pp py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { kicker: '01', label: 'Verified Research' },
              { kicker: '02', label: 'Fantasy-Relevant Signals' },
              { kicker: '03', label: 'Division-by-Division Rollout' },
              { kicker: '04', label: 'API Automation Coming Soon' },
            ].map((t) => (
              <div key={t.kicker} className="flex items-start gap-4">
                <span className="font-mono text-gold text-sm pt-1">{t.kicker}</span>
                <p className="font-mono uppercase tracking-wider text-[11px] text-ice leading-relaxed">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- AFC WEST FEATURED --------------------------- */}
      <section className="py-20 md:py-28">
        <div className="container-pp">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="label-mono mb-3">— Featured</p>
              <h2 className="display text-3xl md:text-5xl text-ice">
                AFC West <span className="text-iceDim">— Pending Verification</span>
              </h2>
            </div>
            <StatusBadge status="pending-verification" />
          </div>

          <p className="text-iceDim max-w-2xl mb-10 leading-relaxed">
            The AFC West page architecture is built and ready. Research files
            are being verified before publication. The room gets quieter when
            the analysis is right.
          </p>

          <div className="max-w-2xl">
            <DivisionCard division={afcWest} />
          </div>
        </div>
      </section>

      {/* --------------------------- COMING SOON DIVISIONS --------------------------- */}
      <section id="roadmap" className="py-20 md:py-28 border-t border-slate3 bg-slate2/20">
        <div className="container-pp">
          <div className="mb-12">
            <p className="label-mono mb-3">— Coming Soon</p>
            <h2 className="display text-3xl md:text-5xl text-ice max-w-3xl">
              The rest of the league.<br />
              <span className="text-iceDim">Same standard.</span>
            </h2>
            <p className="mt-6 text-iceDim max-w-2xl leading-relaxed">
              No content rushed. Each division ships when its research is
              verified — not before.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherDivisions.map((d) => (
              <DivisionCard key={d.id} division={d} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- FUTURE PLATFORM PREVIEW --------------------------- */}
      <section className="py-20 md:py-28 border-t border-slate3">
        <div className="container-pp">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="label-mono mb-3">— Future Platform</p>
              <h2 className="display text-3xl md:text-5xl text-ice mb-6">
                Built like a front office.
              </h2>
              <p className="text-iceDim leading-relaxed">
                Foundation first. Then automation, agents, live data, and
                premium tooling — in that order. No shortcuts to credibility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {roadmap.map((item) => (
                <div
                  key={item.label}
                  className="relative border border-slate3 bg-slate2/30 p-5"
                >
                  <span
                    className={`absolute top-0 left-0 h-px ${
                      item.status === 'in-progress' ? 'w-12 bg-leather' : 'w-8 bg-slate3'
                    }`}
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-ice">
                      {item.label}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-iceDim leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- INSTITUTIONAL LOCK-UP --------------------------- */}
      <section className="py-20 md:py-28 border-t border-slate3">
        <div className="container-pp text-center">
          <p className="label-mono mb-4">— Institutional Lock-Up</p>
          <h2 className="display text-4xl md:text-6xl text-ice">
            Fantasy Football. <span className="text-gold">Professionally.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-iceDim leading-relaxed">
            Built by Pigskin Professionals, Inc. The institution behind the product.
          </p>
        </div>
      </section>
    </>
  );
}
