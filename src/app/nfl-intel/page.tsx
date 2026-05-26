import { PageHero } from '@/components/PageHero';
import { DivisionCard } from '@/components/DivisionCard';
import { ResearchIntegrityNote } from '@/components/ResearchIntegrityNote';
import { CTAButton } from '@/components/CTAButton';
import { divisions } from '@/data/nfl/divisions';

export const metadata = {
  title: 'NFL Intel',
  description: 'Division and team-level NFL intelligence from Pigskin Professionals.',
};

export default function NflIntelPage() {
  const afcWest = divisions.find((d) => d.slug === 'afc-west')!;
  const rest = divisions.filter((d) => d.slug !== 'afc-west');

  return (
    <>
      <PageHero
        eyebrow="NFL Intel"
        fileNumber="FILE 040 / 124"
        title={<>The box score lies.<br /><span className="text-gold">The tape doesn't.</span></>}
        description="Division-by-division research published only after verification. Every page tied to a source. Every claim tied to a file."
      >
        <div className="flex flex-wrap gap-3">
          <CTAButton href="/divisions/afc-west" variant="primary">
            Open AFC West
          </CTAButton>
          <CTAButton href="/teams" variant="secondary">
            See All 32 Teams
          </CTAButton>
        </div>
      </PageHero>

      <div className="container-pp pb-24">
        <ResearchIntegrityNote />

        <section className="py-8">
          <p className="label-mono mb-3">— Featured Division</p>
          <h2 className="display text-3xl text-ice mb-8">AFC West</h2>
          <div className="max-w-2xl">
            <DivisionCard division={afcWest} />
          </div>
        </section>

        <section className="py-16 border-t border-slate3">
          <p className="label-mono mb-3">— Pipeline</p>
          <h2 className="display text-3xl text-ice mb-8">Next In Queue</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map((d) => (
              <DivisionCard key={d.id} division={d} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
