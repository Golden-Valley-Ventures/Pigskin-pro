import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';

export const metadata = {
  title: 'Waiver Watch',
  description: 'Weekly verified waiver signal — coming soon.',
};

export default function WaiverWatchPage() {
  return (
    <>
      <PageHero
        eyebrow="Waiver Watch"
        fileNumber="FILE 080 / 124"
        title={<>Verified <span className="text-gold">signal.</span> No hype.</>}
        description="Weekly waiver context grounded in verified usage trends and depth chart movement."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="Waiver Watch"
          title="Coming Soon."
          description="Waiver Watch will publish a weekly graded list of waiver-relevant players, tied to verified usage trends, depth chart movement, and team research context. No filler. No tout content."
          bullets={[
            'Weekly graded waiver list',
            'Usage and depth chart change tracking',
            'Snap and route share context where verified',
            'Injury-driven opportunity flagging',
            'Tie-back to team research context',
          ]}
        />
      </div>
    </>
  );
}
