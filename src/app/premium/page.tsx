'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTAButton } from '@/components/CTAButton';
import { StatusBadge } from '@/components/StatusBadge';

/**
 * Premium page placeholder. No real subscription wiring, no Stripe, no auth.
 * Email capture is UI-only and does not POST anywhere.
 */
export default function PremiumPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI-only: no backend wired. The brief explicitly forbids live paywall claims.
    setSubmitted(true);
  }

  const features = [
    { label: 'Automated NFL Team Intel', body: 'Per-team verified research summaries with daily signal updates.' },
    { label: 'Fantasy Player Signals',    body: 'Verified player-level fantasy context tied to source files.' },
    { label: 'DFS Slate Tools',           body: 'Slate-level matchup, leverage, and stack research — informational only.' },
    { label: 'Draft War Room',            body: 'Tier sheets, ADP context, position scarcity, live-draft companion.' },
    { label: 'Waiver Watch',              body: 'Weekly waiver signals graded by verified usage and depth chart trends.' },
    { label: 'Dynasty Movement Tracker',  body: 'Long-horizon player valuation and dynasty trade context.' },
    { label: 'Injury / News Agent',       body: 'Verified-source news summaries tied back to team and fantasy context.' },
    { label: 'API-Backed Dashboards',     body: 'Player and team dashboards driven by live ingestion.' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Premium"
        fileNumber="FILE 110 / 124"
        title={<>Built like a <span className="text-gold">front office.</span></>}
        description="A subscription tier in development. We don't sell what we haven't built. When Premium launches, you'll know what it includes and what it doesn't."
      >
        <StatusBadge status="coming-soon" />
      </PageHero>

      <div className="container-pp pb-24">
        {/* Features list */}
        <section className="py-12">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
            <h2 className="display text-3xl text-ice">What Premium Will Include</h2>
            <p className="label-mono-dim">— Planned scope</p>
          </div>
          <div className="hairline mb-10" />

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="relative border border-slate3 bg-slate2/30 p-6"
              >
                <span className="absolute top-0 left-0 h-px w-10 bg-gold/60" aria-hidden />
                <h3 className="font-mono text-xs uppercase tracking-widest text-ice mb-3">
                  {f.label}
                </h3>
                <p className="text-sm text-iceDim leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Status note */}
        <section className="py-12 border-t border-slate3">
          <div className="max-w-3xl">
            <p className="label-mono mb-3">— Status</p>
            <h2 className="display text-3xl text-ice mb-6">
              Premium access coming soon.
            </h2>
            <p className="text-iceDim leading-relaxed">
              No subscriptions are being sold yet. No paywall is active.
              Pigskin.pro will not charge for Premium until the product behind
              Premium is built. When that day comes, it will be announced here.
            </p>
          </div>
        </section>

        {/* Email capture (UI only) */}
        <section className="py-12 border-t border-slate3">
          <div className="max-w-2xl">
            <p className="label-mono mb-3">— Notify Me</p>
            <h2 className="display text-2xl md:text-3xl text-ice mb-4">
              Get word when Premium opens.
            </h2>
            <p className="text-iceDim leading-relaxed mb-8">
              Drop your email and we'll let you know when Premium is ready. We
              don't sell lists. We don't share data. This is a quiet door.
            </p>

            {submitted ? (
              <div className="border border-gold/40 bg-gold/10 px-5 py-4">
                <p className="font-mono text-sm uppercase tracking-widest text-gold">
                  — Noted. We'll be in touch.
                </p>
                <p className="text-xs text-iceDim/80 mt-2">
                  This UI is a placeholder. No backend is wired in this
                  foundation build; your email was not transmitted.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-slate2/60 border border-slate3 px-4 py-3 text-ice placeholder-iceDim/60 font-mono text-sm focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gold text-midnight font-mono text-[11px] uppercase tracking-widest px-5 py-3 hover:bg-gold/90 transition-colors"
                >
                  Notify Me →
                </button>
              </form>
            )}

            <p className="mt-6 label-mono-dim">
              — Placeholder UI. No real transmission until backend is wired.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
