import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

// Public pages — published rows only (enforced by RLS).
export const revalidate = 60;

export default async function PublicTeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: team } = await supabase
    .from('teams')
    .select(
      `*, division:divisions ( name, slug, conference, region )`,
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!team) notFound();

  const [{ data: snap }, { data: proj }] = await Promise.all([
    supabase
      .from('team_latest_snapshot')
      .select('*')
      .eq('team_id', team.id)
      .maybeSingle(),
    supabase
      .from('team_latest_projection')
      .select('*')
      .eq('team_id', team.id)
      .maybeSingle(),
  ]);

  const division = Array.isArray(team.division)
    ? team.division[0]
    : team.division;

  return (
    <main className="public-team">
      <p className="crumbs">
        {division && (
          <Link href={`/divisions/${division.slug}`}>{division.name}</Link>
        )}
      </p>
      <h1>{team.name}</h1>
      {snap?.archetype && <p className="archetype">{snap.archetype}</p>}

      {proj && (
        <section className="proj">
          {proj.projected_wins != null && (
            <Stat label="Projected wins" value={proj.projected_wins} />
          )}
          {proj.floor_wins != null && (
            <Stat label="Floor" value={proj.floor_wins} />
          )}
          {proj.ceiling_wins != null && (
            <Stat label="Ceiling" value={proj.ceiling_wins} />
          )}
          {proj.confidence != null && (
            <Stat label="Confidence" value={`${proj.confidence}/10`} />
          )}
        </section>
      )}

      {snap?.team_thesis && <Section title="Thesis" body={snap.team_thesis} />}
      {snap?.qb_summary && <Section title="QB" body={snap.qb_summary} />}
      {snap?.ol_summary && (
        <Section
          title={`Offensive line${snap.ol_grade ? ` · ${snap.ol_grade}` : ''}`}
          body={snap.ol_summary}
        />
      )}
      {snap?.defensive_summary && (
        <Section title="Defense" body={snap.defensive_summary} />
      )}
      {snap?.coaching_summary && (
        <Section title="Coaching" body={snap.coaching_summary} />
      )}
      {snap?.injury_status && (
        <Section title="Injuries" body={snap.injury_status} />
      )}
      {snap?.key_additions && (
        <Section title="Key additions" body={snap.key_additions} />
      )}
      {snap?.key_losses && (
        <Section title="Key losses" body={snap.key_losses} />
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="block">
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  );
}
