'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import type {
  Team,
  TeamSnapshot,
  Projection,
  ContentStatus,
} from '@/types/database';
import { saveTeamEdit, type EditFormState } from './actions';

interface Props {
  team: Team;
  snapshot: TeamSnapshot | null;
  projection: Projection | null;
}

// All editable narrative fields, with their labels and input style.
const SNAPSHOT_FIELDS: Array<{
  key: keyof TeamSnapshot;
  label: string;
  rows?: number;
  hint?: string;
}> = [
  { key: 'team_thesis', label: 'Team thesis', rows: 4, hint: 'One paragraph: what is the core analytical read on this team?' },
  { key: 'archetype', label: 'Archetype', hint: 'Short tag — e.g. "run-heavy / bend-don\'t-break".' },
  { key: 'qb_summary', label: 'QB summary', rows: 4 },
  { key: 'ol_grade', label: 'OL grade', hint: 'Letter grade or short label.' },
  { key: 'ol_summary', label: 'OL summary', rows: 3 },
  { key: 'coaching_summary', label: 'Coaching summary', rows: 3 },
  { key: 'defensive_summary', label: 'Defensive summary', rows: 4 },
  { key: 'injury_status', label: 'Injury status', rows: 3 },
  { key: 'key_additions', label: 'Key additions', rows: 3 },
  { key: 'key_losses', label: 'Key losses', rows: 3 },
  { key: 'fantasy_notes', label: 'Fantasy notes', rows: 3 },
  { key: 'betting_notes', label: 'Betting notes', rows: 3 },
];

type FormState = {
  snapshot: Partial<TeamSnapshot>;
  projection: Partial<Projection>;
  status: ContentStatus;
};

export default function EditForm({ team, snapshot, projection }: Props) {
  const [state, setState] = useState<FormState>(() => ({
    snapshot: snapshot ?? {},
    projection: projection ?? {},
    status: snapshot?.status ?? 'draft',
  }));
  const [snapshotId, setSnapshotId] = useState<string | null>(
    snapshot?.id ?? null,
  );
  const [projectionId, setProjectionId] = useState<string | null>(
    projection?.id ?? null,
  );
  const [savedAt, setSavedAt] = useState<Date | null>(
    snapshot?.updated_at ? new Date(snapshot.updated_at) : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Keep a ref of latest state so the debounced save reads fresh values.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const performSave = useCallback(
    async (override?: Partial<FormState>): Promise<EditFormState> => {
      const current = { ...stateRef.current, ...override };
      const res = await saveTeamEdit({
        teamId: team.id,
        season: team.season,
        snapshotId,
        projectionId,
        snapshot: current.snapshot,
        projection: current.projection,
        status: current.status,
        slug: team.slug,
      });
      if (res.ok) {
        setSavedAt(new Date(res.savedAt));
        setSnapshotId(res.snapshotId);
        setProjectionId(res.projectionId);
        setDirty(false);
        setError(null);
      } else {
        setError(res.error);
      }
      return res;
    },
    [team.id, team.season, team.slug, snapshotId, projectionId],
  );

  // Debounced autosave: 1.2s after the last edit.
  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => {
      startTransition(async () => {
        await performSave();
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [state, dirty, performSave]);

  // Warn on navigate-away if there are unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  function updateSnapshot<K extends keyof TeamSnapshot>(
    key: K,
    value: TeamSnapshot[K],
  ) {
    setState((s) => ({ ...s, snapshot: { ...s.snapshot, [key]: value } }));
    setDirty(true);
  }

  function updateProjection<K extends keyof Projection>(
    key: K,
    value: Projection[K],
  ) {
    setState((s) => ({ ...s, projection: { ...s.projection, [key]: value } }));
    setDirty(true);
  }

  async function handlePublish() {
    // Optimistic: flip status locally, then save. If save fails, revert.
    const prev = state.status;
    setState((s) => ({ ...s, status: 'published' }));
    setDirty(true);
    startTransition(async () => {
      const res = await performSave({ status: 'published' });
      if (!res.ok) setState((s) => ({ ...s, status: prev }));
    });
  }

  async function handleUnpublish() {
    const prev = state.status;
    setState((s) => ({ ...s, status: 'draft' }));
    setDirty(true);
    startTransition(async () => {
      const res = await performSave({ status: 'draft' });
      if (!res.ok) setState((s) => ({ ...s, status: prev }));
    });
  }

  return (
    <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
      {/* Save bar */}
      <div className="save-bar" data-status={state.status}>
        <span className={`pill pill--${state.status}`}>{state.status}</span>
        <span className="save-status">
          {error ? (
            <span className="save-status--error">⚠ {error}</span>
          ) : isPending || dirty ? (
            <span className="save-status--pending">Saving…</span>
          ) : savedAt ? (
            <>
              Last saved <RelativeTime date={savedAt} />
            </>
          ) : (
            'Not saved yet'
          )}
        </span>
        <div className="save-bar-actions">
          {state.status !== 'published' ? (
            <button
              type="button"
              className="primary"
              onClick={handlePublish}
              disabled={isPending}
            >
              Publish
            </button>
          ) : (
            <button
              type="button"
              className="ghost"
              onClick={handleUnpublish}
              disabled={isPending}
            >
              Unpublish
            </button>
          )}
          <button
            type="button"
            className="ghost"
            onClick={() =>
              startTransition(async () => {
                await performSave();
              })
            }
            disabled={!dirty || isPending}
          >
            Save now
          </button>
        </div>
      </div>

      {/* Projection block */}
      <section className="form-card">
        <header className="form-card-head">
          <h2>Projection</h2>
          <p className="muted">Numeric forecast for the season.</p>
        </header>
        <div className="grid-3">
          <NumberField
            label="Projected wins"
            value={state.projection.projected_wins ?? null}
            step="0.5"
            onChange={(v) => updateProjection('projected_wins', v)}
          />
          <NumberField
            label="Floor"
            value={state.projection.floor_wins ?? null}
            step="0.5"
            onChange={(v) => updateProjection('floor_wins', v)}
          />
          <NumberField
            label="Ceiling"
            value={state.projection.ceiling_wins ?? null}
            step="0.5"
            onChange={(v) => updateProjection('ceiling_wins', v)}
          />
          <NumberField
            label="Confidence (1–10)"
            value={state.projection.confidence ?? null}
            step="1"
            min={1}
            max={10}
            onChange={(v) => updateProjection('confidence', v)}
          />
          <NumberField
            label="Playoff prob. (0–1)"
            value={state.projection.playoff_probability ?? null}
            step="0.01"
            min={0}
            max={1}
            onChange={(v) => updateProjection('playoff_probability', v)}
          />
          <NumberField
            label="Division prob. (0–1)"
            value={state.projection.division_probability ?? null}
            step="0.01"
            min={0}
            max={1}
            onChange={(v) => updateProjection('division_probability', v)}
          />
        </div>
        <label className="field">
          <span>Projection notes</span>
          <textarea
            rows={3}
            value={state.projection.notes ?? ''}
            onChange={(e) => updateProjection('notes', e.target.value)}
          />
        </label>
      </section>

      {/* Snapshot block */}
      <section className="form-card">
        <header className="form-card-head">
          <h2>Narrative</h2>
          <p className="muted">
            Markdown allowed. Edits autosave; history is preserved in the audit
            log.
          </p>
        </header>

        {SNAPSHOT_FIELDS.map((f) => {
          const raw = state.snapshot[f.key];
          const value = typeof raw === 'string' ? raw : (raw ?? '') as string;
          return (
            <label className="field" key={String(f.key)}>
              <span>{f.label}</span>
              {f.rows ? (
                <textarea
                  rows={f.rows}
                  value={value ?? ''}
                  onChange={(e) =>
                    updateSnapshot(
                      f.key,
                      e.target.value as TeamSnapshot[typeof f.key],
                    )
                  }
                />
              ) : (
                <input
                  type="text"
                  value={value ?? ''}
                  onChange={(e) =>
                    updateSnapshot(
                      f.key,
                      e.target.value as TeamSnapshot[typeof f.key],
                    )
                  }
                />
              )}
              {f.hint && <span className="hint">{f.hint}</span>}
            </label>
          );
        })}
      </section>
    </form>
  );
}

// --- helpers -----------------------------------------------------------------

function NumberField(props: {
  label: string;
  value: number | null;
  step: string;
  min?: number;
  max?: number;
  onChange: (v: number | null) => void;
}) {
  return (
    <label className="field">
      <span>{props.label}</span>
      <input
        type="number"
        step={props.step}
        min={props.min}
        max={props.max}
        value={props.value ?? ''}
        onChange={(e) =>
          props.onChange(e.target.value === '' ? null : Number(e.target.value))
        }
      />
    </label>
  );
}

function RelativeTime({ date }: { date: Date }) {
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  return <time dateTime={date.toISOString()}>{formatRelative(date)}</time>;
}

function formatRelative(date: Date): string {
  const diff = Math.round((Date.now() - date.getTime()) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleString();
}
