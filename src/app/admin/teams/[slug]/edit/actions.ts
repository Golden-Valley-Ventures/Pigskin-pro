'use server';

import { revalidatePath } from 'next/cache';
import { createClient, requireAdmin } from '@/lib/supabase-server';
import type {
  TeamSnapshot,
  Projection,
  ContentStatus,
} from '@/types/database';

export type EditFormState =
  | { ok: true; savedAt: string; snapshotId: string; projectionId: string }
  | { ok: false; error: string };

type SnapshotPatch = Partial<
  Pick<
    TeamSnapshot,
    | 'team_thesis'
    | 'qb_summary'
    | 'ol_grade'
    | 'ol_summary'
    | 'coaching_summary'
    | 'defensive_summary'
    | 'injury_status'
    | 'fantasy_notes'
    | 'betting_notes'
    | 'key_additions'
    | 'key_losses'
    | 'archetype'
    | 'status'
  >
>;

type ProjectionPatch = Partial<
  Pick<
    Projection,
    | 'projected_wins'
    | 'floor_wins'
    | 'ceiling_wins'
    | 'confidence'
    | 'playoff_probability'
    | 'division_probability'
    | 'notes'
    | 'status'
  >
>;

export async function saveTeamEdit(args: {
  teamId: string;
  season: number;
  snapshotId: string | null;
  projectionId: string | null;
  snapshot: SnapshotPatch;
  projection: ProjectionPatch;
  status: ContentStatus;
  slug: string;
}): Promise<EditFormState> {
  const user = await requireAdmin();

  if (!user) {
    return { ok: false, error: 'Not authorized' };
  }

  const supabase = await createClient();

  let snapshotId = args.snapshotId;

  if (snapshotId) {
    const { error } = await supabase
      .from('team_snapshots')
      .update({
        ...args.snapshot,
        status: args.status,
        last_edited_by: user.id,
      } as never)
      .eq('id', snapshotId);

    if (error) {
      return { ok: false, error: error.message };
    }
  } else {
    const { data, error } = await supabase
      .from('team_snapshots')
      .insert({
        team_id: args.teamId,
        season: args.season,
        ...args.snapshot,
        status: args.status,
        last_edited_by: user.id,
      } as never)
      .select('id')
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message ?? 'Snapshot insert failed' };
    }

    snapshotId = (data as { id: string }).id;
  }

  let projectionId = args.projectionId;

  if (projectionId) {
    const { error } = await supabase
      .from('projections')
      .update({
        ...args.projection,
        status: args.status,
        last_edited_by: user.id,
      } as never)
      .eq('id', projectionId);

    if (error) {
      return { ok: false, error: error.message };
    }
  } else {
    const { data, error } = await supabase
      .from('projections')
      .insert({
        team_id: args.teamId,
        season: args.season,
        ...args.projection,
        status: args.status,
        last_edited_by: user.id,
      } as never)
      .select('id')
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message ?? 'Projection insert failed' };
    }

    projectionId = (data as { id: string }).id;
  }

  await supabase
    .from('teams')
    .update({
      status: args.status,
      last_edited_by: user.id,
    } as never)
    .eq('id', args.teamId);

  revalidatePath(`/teams/${args.slug}`);
  revalidatePath(`/admin/teams/${args.slug}/edit`);

  return {
    ok: true,
    savedAt: new Date().toISOString(),
    snapshotId,
    projectionId,
  };
}
