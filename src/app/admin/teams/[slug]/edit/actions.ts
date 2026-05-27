'use server';

export type EditFormState =
  | { ok: true; savedAt: string; snapshotId: string; projectionId: string }
  | { ok: false; error: string };

export async function saveTeamEdit(): Promise<EditFormState> {
  return {
    ok: true,
    savedAt: new Date().toISOString(),
    snapshotId: 'temp-snapshot',
    projectionId: 'temp-projection',
  };
}
