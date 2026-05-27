import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import EditForm from './EditForm';

export const dynamic = 'force-dynamic';

export default async function TeamEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: team } = await supabase
    .from('teams')
    .select(
      `*,
       division:divisions ( id, name, slug, conference, region )`,
    )
    .eq('slug', slug)
    .maybeSingle();

  if (!team) notFound();

  // Latest editable snapshot/projection for the current season. We treat the
  // most recent row per (team, season) as "the one being edited".
  const [{ data: snapshot }, { data: projection }] = await Promise.all([
    supabase
      .from('team_snapshots')
      .select('*')
      .eq('team_id', team.id)
      .eq('season', team.season)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('projections')
      .select('*')
      .eq('team_id', team.id)
      .eq('season', team.season)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const division = Array.isArray(team.division)
    ? team.division[0]
    : team.division;

  return (
    <div className="page">
      <header className="page-head edit-head">
        <div>
          <p className="eyebrow">
            <Link href="/admin/teams">Teams</Link>
            {division && <> / {division.name}</>}
          </p>
          <h1>{team.name}</h1>
          <p className="muted">
            Season {team.season} · {team.abbreviation}
          </p>
        </div>
        <div className="head-actions">
          <Link
            href={`/teams/${team.slug}`}
            target="_blank"
            className="ghost-link"
          >
            Preview ↗
          </Link>
          <Link
            href={`/admin/teams/${team.slug}/history`}
            className="ghost-link"
          >
            History
          </Link>
        </div>
      </header>

      <EditForm
        team={team}
        snapshot={snapshot ?? null}
        projection={projection ?? null}
      />
    </div>
  );
}
