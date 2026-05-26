import { notFound } from 'next/navigation';
import Link from 'next/link';
import { teams, getTeamBySlug } from '@/data/nfl/teams';
import { afcWestTeamResearch } from '@/data/research/afc-west';
import { PageHero } from '@/components/PageHero';
import { IntelSection } from '@/components/IntelSection';
import { ResearchStatus } from '@/components/ResearchStatus';
import { ResearchIntegrityNote } from '@/components/ResearchIntegrityNote';
import { SourceNote } from '@/components/SourceNote';
import { ComingSoonPanel } from '@/components/ComingSoonPanel';
import { CTAButton } from '@/components/CTAButton';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const team = getTeamBySlug(params.slug);
  if (!team) return { title: 'Team Not Found' };
  return {
    title: `${team.name} Intel`,
    description: `${team.name} fantasy football intelligence — quarterback room, backfield, pass catchers, and coaching context.`,
  };
}

export default function TeamPage({ params }: PageProps) {
  const team = getTeamBySlug(params.slug);
  if (!team) return notFound();

  // ============================================================
  // COMING SOON TEAMS (everything outside AFC West)
  // ============================================================
  if (team.status === 'coming-soon') {
    return (
      <>
        <PageHero
          eyebrow={`${team.conference} · ${team.division}`}
          fileNumber="FILE — / 124"
          title={
            <>
              {team.city}
              <br />
              <span className="text-gold">{team.shortName}</span>
            </>
          }
          description={`${team.name} is not yet in the published research pipeline. Pigskin.pro is rolling out research division by division, starting with AFC West.`}
        />
        <div className="container-pp pb-24">
          <ResearchIntegrityNote />
          <ComingSoonPanel
            eyebrow={team.name}
            title="Coming Soon."
            description="This team's research has not yet been verified for publication. When the research is approved, the page goes live."
          >
            <div className="flex flex-wrap gap-4">
              <CTAButton href="/teams" variant="secondary">
                Back to all teams
              </CTAButton>
              <CTAButton href="/divisions/afc-west" variant="ghost">
                See AFC West
              </CTAButton>
            </div>
          </ComingSoonPanel>
        </div>
      </>
    );
  }

  // ============================================================
  // AFC WEST TEAMS — pending verification OR live
  // ============================================================
  const research = afcWestTeamResearch[team.id];

  return (
    <>
      <PageHero
        eyebrow={`${team.conference} · ${team.division}`}
        fileNumber="FILE 030 / 124"
        title={
          <>
            {team.city}
            <br />
            <span className="text-gold">{team.shortName}</span>
          </>
        }
        description={
          team.status === 'pending-verification'
            ? `Team page structure for the ${team.name}. Section content is intentionally withheld until research has been verified and approved.`
            : team.shortSummary
        }
      >
        <ResearchStatus
          status={team.status}
          scope={team.name}
          lastVerified={team.lastVerified}
        />
      </PageHero>

      <div className="container-pp pb-24">
        <ResearchIntegrityNote />

        <div className="mt-12 space-y-2">
          {research?.snapshot && <IntelSection block={research.snapshot} index="A" />}
          {research?.quarterback && <IntelSection block={research.quarterback} index="B" />}
          {research?.runningBack && <IntelSection block={research.runningBack} index="C" />}
          {research?.passCatchers && <IntelSection block={research.passCatchers} index="D" />}
          {research?.offensiveLine && <IntelSection block={research.offensiveLine} index="E" />}
          {research?.coaching && <IntelSection block={research.coaching} index="F" />}
          {research?.fantasyTakeaways && <IntelSection block={research.fantasyTakeaways} index="G" />}
          {research?.watchList && <IntelSection block={research.watchList} index="H" />}
        </div>

        {/* Cross-link to other AFC West teams */}
        <section className="mt-20 pt-10 border-t border-slate3">
          <p className="label-mono mb-6">— Also in the AFC West</p>
          <div className="flex flex-wrap gap-3">
            {teams
              .filter((t) => t.division === 'West' && t.conference === 'AFC' && t.id !== team.id)
              .map((t) => (
                <Link
                  key={t.id}
                  href={`/teams/${t.slug}`}
                  className="group inline-flex items-center gap-2 border border-slate3 bg-slate2/30 px-4 py-2.5 hover:border-gold/40 hover:bg-slate2/60 transition-all"
                >
                  <span className="font-display text-lg text-gold">{t.abbreviation}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ice">
                    {t.shortName}
                  </span>
                  <span className="font-mono text-iceDim/60 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
          </div>
        </section>

        <SourceNote scope={team.name} lastVerified={team.lastVerified} />
      </div>
    </>
  );
}
