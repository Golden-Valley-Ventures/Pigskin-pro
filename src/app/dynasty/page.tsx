import { PageHero } from '@/components/PageHero';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';

export const metadata = {
  title: 'Dynasty',
  description: 'Dynasty research and movement tracking — coming soon.',
};

export default function DynastyPage() {
  return (
    <>
      <PageHero
        eyebrow="Dynasty"
        fileNumber="FILE 070 / 124"
        title={<>Long-horizon <span className="text-gold">reads.</span></>}
        description="Dynasty research built on long-horizon player and franchise context. The opposite of recency bias."
      />
      <div className="container-pp pb-24">
        <ComingSoonPanel
          eyebrow="Dynasty"
          title="Coming Soon."
          description="Dynasty will provide multi-year player valuation context, trade environment notes, and franchise direction signals — grounded in verified research, not market chatter."
          bullets={[
            'Long-horizon player valuation context',
            'Franchise direction notes',
            'Trade window framework',
            'Rookie research alignment with team scheme',
            'Dynasty-relevant injury and contract context',
          ]}
        />
      </div>
    </>
  );
}
