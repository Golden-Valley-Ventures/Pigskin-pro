import { notFound } from 'next/navigation';
import { divisions, getDivisionBySlug } from '@/data/nfl/divisions';
import { teams as allTeams } from '@/data/nfl/teams';
import { PageHero } from '@/components/PageHero';
import { IntelSection } from '@/components/IntelSection';
import { TeamCard } from '@/components/TeamCard';
import { ResearchStatus } from '@/components/ResearchStatus';
import { ResearchIntegrityNote } from '@/components/ResearchIntegrityNote';
import { SourceNote } from '@/components/SourceNote';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';
import { CTAButton } from '@/components/CTAButton';
import {
  afcWestOverview,
  afcWestThemes,
  afcWestOffensiveEnvironments,
  afcWestCoachingNotes,
  afcWestQuarterbackStability,
  afcWestBackfieldClarity,
  afcWestPassCatcherHierarchy,
  afcWestScoringEnvironment,
} from '@/data/research/afc-west';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const division = getDivisionBySlug(params.slug);
  if (!division) return { title: 'Division Not Found' };
  return {
    title: `${division.name} Intel`,
    description: `${division.name} division-level fantasy football intelligence from Pigskin Professionals.`,
  };
}

export default function DivisionDetailPage({ params }: PageProps) {
  const division = getDivisionBySlug(params.slug);
  if (!division) return notFound();

  const divisionTeams = division.teamIds
    .map((id) => allTeams.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // ============================================================
  // COMING-SOON DIVISIONS
  // ============================================================
  if (division.status === 'coming-soon') {
    return (
      <>
        <PageHero
          eyebrow={`${division.conference} · ${division.division}`}
          fileNumber="FILE — / 124"
          title={<>{division.name}</>}
          description="This division is not yet in the published research pipeline. Pigskin.pro is rolling out conference research in sequence — AFC West first."
        />
        <div className="container-pp pb-24">
          <ResearchIntegrityNote />
          <ComingSoonPanel
            eyebrow={division.name}
            title="Coming Soon."
            description="Pigskin Professionals publishes division intelligence only after research has been verified. This division will go live when its research files are approved."
            bullets={divisionTeams.map((t) => `${t.city} ${t.shortName}`)}
          >
            <CTAButton href="/divisions" variant="secondary">
              Back to all divisions
            </CTAButton>
          </ComingSoonPanel>
        </div>
      </>
    );
  }

  // ============================================================
  // AFC WEST — PENDING VERIFICATION (page structure published)
  // ============================================================
  const isAfcWest = division.slug === 'afc-west';

  return (
    <>
      <PageHero
        eyebrow={`${division.conference} · ${division.division}`}
        fileNumber="FILE 021 / 124"
        title={<>{division.name}</>}
        description={
          isAfcWest
            ? 'Division-level intelligence for AFC West. Page structure is published. Section content is intentionally withheld until research has been verified and approved.'
            : 'Division-level intelligence.'
        }
      >
        <ResearchStatus
          status={division.status}
          scope={division.name}
          lastVerified={division.lastVerified}
        />
      </PageHero>

      <div className="container-pp pb-24">
        <ResearchIntegrityNote />

        {/* Teams in this division */}
        <section className="py-8">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
            <h2 className="display text-2xl text-ice">— Teams Covered</h2>
            <p className="label-mono-dim">{divisionTeams.length} teams</p>
          </div>
          <div className="hairline mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {divisionTeams.map((t) => (
              <TeamCard key={t.id} team={t} />
            ))}
          </div>
        </section>

        {/* Division-level intel blocks (AFC West only — others gated above) */}
        {isAfcWest && (
          <div className="mt-16 space-y-2">
            <IntelSection block={afcWestOverview} index="A" />
            <IntelSection block={afcWestThemes} index="B" />
            <IntelSection block={afcWestOffensiveEnvironments} index="C" />
            <IntelSection block={afcWestCoachingNotes} index="D" />
            <IntelSection block={afcWestQuarterbackStability} index="E" />
            <IntelSection block={afcWestBackfieldClarity} index="F" />
            <IntelSection block={afcWestPassCatcherHierarchy} index="G" />
            <IntelSection block={afcWestScoringEnvironment} index="H" />
          </div>
        )}

        <SourceNote scope={division.name} lastVerified={division.lastVerified} />
      </div>
    </>
  );
}
