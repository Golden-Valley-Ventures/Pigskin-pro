import { PageHero } from '@/components/PageHero';
import { DivisionCard } from '@/components/DivisionCard';
import { ResearchIntegrityNote } from '@/components/ResearchIntegrityNote';
import { divisions } from '@/data/nfl/divisions';

export const metadata = {
  title: 'Divisions',
  description:
    'Eight divisions. One standard. Division-by-division research rollout starting with AFC West.',
};

export default function DivisionsPage() {
  const afcDivisions = divisions.filter((d) => d.conference === 'AFC');
  const nfcDivisions = divisions.filter((d) => d.conference === 'NFC');

  return (
    <>
      <PageHero
        eyebrow="Divisions"
        fileNumber="FILE 020 / 124"
        title={<>Eight divisions. <span className="text-gold">One standard.</span></>}
        description="Division-by-division rollout. AFC West page structure is built and ready; verified research integration is pending. Other divisions follow the same governance discipline when their research is approved."
      />

      <div className="container-pp">
        <ResearchIntegrityNote />

        <section className="py-12">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="display text-3xl text-ice">AFC</h2>
            <p className="label-mono-dim">— American Football Conference</p>
          </div>
          <div className="hairline mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {afcDivisions.map((d) => (
              <DivisionCard key={d.id} division={d} />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="display text-3xl text-ice">NFC</h2>
            <p className="label-mono-dim">— National Football Conference</p>
          </div>
          <div className="hairline mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nfcDivisions.map((d) => (
              <DivisionCard key={d.id} division={d} />
            ))}
          </div>
        </section>

        <div className="pb-20" />
      </div>
    </>
  );
}
