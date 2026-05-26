import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';

export const metadata = {
  title: 'Draft War Room',
  description: 'Draft preparation and live-draft assistance — coming soon.',
};

export default function DraftWarRoomPage() {
  return (
    <>
      <PageHero
        eyebrow="Draft War Room"
        fileNumber="FILE 090 / 124"
        title={<>Front-office draft <span className="text-gold">discipline.</span></>}
        description="Cheat sheets, tier visualization, ADP context, and live-draft assistance — grounded in verified team and player research."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="Draft War Room"
          title="Coming Soon."
          description="The War Room will combine verified player research with draft-day tooling: tier visualization, ADP context, position scarcity tracking, and a live-draft companion. Designed for managers who plan before the room opens."
          bullets={[
            'Verified player tier framework',
            'ADP context with risk flagging',
            'Position scarcity tracking',
            'Live-draft companion with research links',
            'Pre-draft scenario planning',
            'Post-draft team audit',
          ]}
        />
      </div>
    </>
  );
}
