import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';
import { CTAButton } from '@/components/CTAButton';

export const metadata = {
  title: 'Fantasy',
  description: 'Pigskin.pro fantasy football tools — coming soon.',
};

export default function FantasyPage() {
  return (
    <>
      <PageHero
        eyebrow="Fantasy"
        fileNumber="FILE 050 / 124"
        title={<>Fantasy <span className="text-gold">tools.</span></>}
        description="Decision-grade fantasy context layered on top of verified team and division research. Built for managers who want structure before speculation."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="Fantasy"
          title="Coming Soon."
          description="The Fantasy hub will surface verified player-level signals tied to team research — starter situations, role clarity, target share implications, and matchup-grade context. Nothing fabricated, nothing guessed."
          bullets={[
            'Verified player signals tied to source files',
            'Start/sit context grounded in team research',
            'Target distribution and usage implications',
            'Matchup-grade environmental notes',
            'Injury and depth chart change tracking',
            'Weekly fantasy-relevant headline read',
          ]}
        >
          <CTAButton href="/divisions/afc-west" variant="secondary">
            See AFC West research structure
          </CTAButton>
        </ComingSoonPanel>
      </div>
    </>
  );
}
