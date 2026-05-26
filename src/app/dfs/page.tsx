import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';

export const metadata = {
  title: 'DFS',
  description: 'DFS slate tools — coming soon.',
};

export default function DfsPage() {
  return (
    <>
      <PageHero
        eyebrow="DFS"
        fileNumber="FILE 060 / 124"
        title={<>DFS slate <span className="text-gold">research.</span></>}
        description="Slate-level context for daily fantasy decision-makers. Built on verified team research, not crowd-sourced takes."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="DFS"
          title="Coming Soon."
          description="The DFS module will provide research-backed slate context: matchup environments, projected ownership context, leverage notes, and stacking research — all anchored to verified team and player signals."
          bullets={[
            'Slate environment context per game',
            'Ownership leverage notes (informational)',
            'Stack research grounded in team research',
            'Weather, pace, and total context where verified',
            'Late-swap signal tracking',
          ]}
        />
      </div>
    </>
  );
}
