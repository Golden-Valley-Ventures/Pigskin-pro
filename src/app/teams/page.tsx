import { PageHero } from '@/components/PageHero';
import { TeamCard } from '@/components/TeamCard';
import { ResearchIntegrityNote } from '@/components/ResearchIntegrityNote';
import { teams } from '@/data/nfl/teams';
import type { Conference, Division } from '@/lib/types';

export const metadata = {
  title: 'Teams · All 32',
  description:
    'Every NFL team in one place. AFC West page structure is published with content pending verification. All other teams roll out as research is verified.',
};

const DIVISIONS: Array<{ conference: Conference; division: Division }> = [
  { conference: 'AFC', division: 'East' },
  { conference: 'AFC', division: 'North' },
  { conference: 'AFC', division: 'South' },
  { conference: 'AFC', division: 'West' },
  { conference: 'NFC', division: 'East' },
  { conference: 'NFC', division: 'North' },
  { conference: 'NFC', division: 'South' },
  { conference: 'NFC', division: 'West' },
];

export default function TeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Teams"
        fileNumber="FILE 010 / 124"
        title={<>All 32. <span className="text-gold">No shortcuts.</span></>}
        description="Every NFL team has a page slot in the system. AFC West teams have published structure with verified content pending. Every other team page goes live when its research is verified — not before."
      />

      <div className="container-pp">
        <ResearchIntegrityNote />

        {DIVISIONS.map(({ conference, division }) => {
          const groupTeams = teams.filter(
            (t) => t.conference === conference && t.division === division
          );
          return (
            <section key={`${conference}-${division}`} className="py-12">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                <h2 className="display text-3xl text-ice">
                  {conference} {division}
                </h2>
                <p className="label-mono-dim">
                  — {conference} Conference · {division} Division
                </p>
              </div>
              <div className="hairline mb-8" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {groupTeams.map((t) => (
                  <TeamCard key={t.id} team={t} />
                ))}
              </div>
            </section>
          );
        })}

        <div className="pb-20" />
      </div>
    </>
  );
}
