import { notFound } from 'next/navigation';
import { createClient, requireAdmin } from '@/lib/supabase-server';
import { EditForm } from './EditForm';
import type { Team, TeamSnapshot, Projection } from '@/types/database';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function TeamEditPage({ params }: PageProps) {
  const user = await requireAdmin();
  if (!user) notFound();

  const supabase = await createClient();

  const { data: teamRaw, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (teamError || !teamRaw) notFound();

  const team = teamRaw as Team;

  const { data: snapshotRaw } = await supabase
    .from('team_snapshots')
    .select('*')
    .eq('team_id', team.id)
    .eq('season', team.season)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: projectionRaw } = await supabase
    .from('projections')
    .select('*')
    .eq('team_id', team.id)
    .eq('season', team.season)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const snapshot = snapshotRaw as TeamSnapshot | null;
  const projection = projectionRaw as Projection | null;

  return (
    <EditForm
      team={team}
      snapshot={snapshot}
      projection={projection}
      editorEmail={user.email ?? user.id}
    />
  );
}
