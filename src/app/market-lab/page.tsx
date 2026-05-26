import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';

export const metadata = {
  title: 'Market Lab',
  description: 'Market context and line movement — informational only. Coming soon.',
};

export default function MarketLabPage() {
  return (
    <>
      <PageHero
        eyebrow="Market Lab"
        fileNumber="FILE 100 / 124"
        title={<>Market context. <span className="text-gold">Informational.</span></>}
        description="Line movement and market context as research inputs — not picks, not plays, not tout content."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="Market Lab"
          title="Coming Soon."
          description="Market Lab will surface line movement and market context as an analytical input to team and fantasy research. Informational only. Subject to applicable laws and platform policies."
          bullets={[
            'Line movement context tied to team research',
            'Total movement as scoring environment signal',
            'Market vs. research divergence flagging',
            'Strictly informational — no picks',
            'No tout content. No guarantees.',
          ]}
        />
        <p className="mt-8 max-w-3xl text-xs text-iceDim/80 leading-relaxed">
          Market Lab, if launched, will be informational only and subject to
          applicable laws and platform policies. No outcome is guaranteed.
        </p>
      </div>
    </>
  );
}
