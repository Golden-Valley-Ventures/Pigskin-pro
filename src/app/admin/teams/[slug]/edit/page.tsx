import { notFound } from 'next/navigation';
import { createClient, requireAdmin } from '@/lib/supabase-server';
import EditForm from './EditForm';
import type { Team, TeamSnapshot, Projection } from '@/types/database';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function TeamEditPage({ params }: PageProps) {
  const user = await requireAdmin();

  if (!user) {
    notFound();
  }

  const supabase = await createClient();

  const { data: team } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!team) {
    notFound();
  }

  const typedTeam = team as Team;

  const { data: snapshots } = await supabase
    .from('team_snapshots')
    .select('*')
    .eq('team_id', typedTeam.id)
    .eq('season', typedTeam.season)
    .order('updated_at', { ascending: false })
    .limit(1);

  const { data: projections } = await supabase
    .from('projections')
    .select('*')
    .eq('team_id', typedTeam.id)
    .eq('season', typedTeam.season)
    .order('updated_at', { ascending: false })
    .limit(1);

  const snapshot =
    (snapshots?.[0] as TeamSnapshot | undefined) ?? null;

  const projection =
    (projections?.[0] as Projection | undefined) ?? null;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Edit {typedTeam.name}</h1>
      </header>

      <EditForm
        team={typedTeam}
        snapshot={snapshot}
        projection={projection}
      />
    </div>
  );
}
