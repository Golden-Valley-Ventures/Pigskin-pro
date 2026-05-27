'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { saveTeamEdit, type EditFormState } from './actions';
import type {
  Team,
  TeamSnapshot,
  Projection,
  ContentStatus,
} from '@/types/database';

type EditFormProps = {
  team: Team;
  snapshot: TeamSnapshot | null;
  projection: Projection | null;
};

type FormState = {
  status: ContentStatus;
  team_thesis: string;
  qb_summary: string;
  ol_grade: string;
  ol_summary: string;
  coaching_summary: string;
  defensive_summary: string;
  injury_status: string;
  fantasy_notes: string;
  betting_notes: string;
  archetype: string;
  key_additions: string;
  key_losses: string;
  projected_wins: string;
  floor_wins: string;
  ceiling_wins: string;
  confidence: string;
  playoff_probability: string;
  division_probability: string;
  projection_notes: string;
};

function listToTextarea(value: unknown): string {
  if (Array.isArray(value)) return value.join('\n');
  if (typeof value === 'string') return value;
  return '';
}

function textareaToList(value: string): string[] {
  return value
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

function nullableNumber(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function EditForm({ team, snapshot, projection }: EditFormProps) {
  const initialState = useMemo<FormState>(
    () => ({
      status: snapshot?.status ?? projection?.status ?? team.status ?? 'draft',
      team_thesis: snapshot?.team_thesis ?? '',
      qb_summary: snapshot?.qb_summary ?? '',
      ol_grade: snapshot?.ol_grade ?? '',
      ol_summary: snapshot?.ol_summary ?? '',
      coaching_summary: snapshot?.coaching_summary ?? '',
      defensive_summary: snapshot?.defensive_summary ?? '',
      injury_status: snapshot?.injury_status ?? '',
      fantasy_notes: snapshot?.fantasy_notes ?? '',
      betting_notes: snapshot?.betting_notes ?? '',
      archetype: snapshot?.archetype ?? '',
      key_additions: listToTextarea(snapshot?.key_additions),
      key_losses: listToTextarea(snapshot?.key_losses),
      projected_wins:
        projection?.projected_wins === null || projection?.projected_wins === undefined
          ? ''
          : String(projection.projected_wins),
      floor_wins:
        projection?.floor_wins === null || projection?.floor_wins === undefined
          ? ''
          : String(projection.floor_wins),
      ceiling_wins:
        projection?.ceiling_wins === null || projection?.ceiling_wins === undefined
          ? ''
          : String(projection.ceiling_wins),
      confidence:
        projection?.confidence === null || projection?.confidence === undefined
          ? ''
          : String(projection.confidence),
      playoff_probability:
        projection?.playoff_probability === null ||
        projection?.playoff_probability === undefined
          ? ''
          : String(projection.playoff_probability),
      division_probability:
        projection?.division_probability === null ||
        projection?.division_probability === undefined
          ? ''
          : String(projection.division_probability),
      projection_notes: projection?.notes ?? '',
    }),
    [team, snapshot, projection],
  );

  const [form, setForm] = useState<FormState>(initialState);
  const [snapshotId, setSnapshotId] = useState<string | null>(snapshot?.id ?? null);
  const [projectionId, setProjectionId] = useState<string | null>(
    projection?.id ?? null,
  );
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const stateRef = useRef<FormState>(initialState);

  useEffect(() => {
    stateRef.current = form;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(
    override?: Partial<FormState>,
  ): Promise<EditFormState> {
    const current = { ...stateRef.current, ...override };

    setSaving(true);
    setMessage('');

    const result = await saveTeamEdit({
      teamId: team.id,
      season: team.season,
      snapshotId,
      projectionId,
      slug: team.slug,
      status: current.status,
      snapshot: {
        status: current.status,
        team_thesis: current.team_thesis,
        qb_summary: current.qb_summary,
        ol_grade: current.ol_grade,
        ol_summary: current.ol_summary,
        coaching_summary: current.coaching_summary,
        defensive_summary: current.defensive_summary,
        injury_status: current.injury_status,
        fantasy_notes: current.fantasy_notes,
        betting_notes: current.betting_notes,
        archetype: current.archetype,
        key_additions: textareaToList(current.key_additions),
        key_losses: textareaToList(current.key_losses),
      },
      projection: {
        status: current.status,
        projected_wins: nullableNumber(current.projected_wins),
        floor_wins: nullableNumber(current.floor_wins),
        ceiling_wins: nullableNumber(current.ceiling_wins),
        confidence: nullableNumber(current.confidence),
        playoff_probability: nullableNumber(current.playoff_probability),
        division_probability: nullableNumber(current.division_probability),
        notes: current.projection_notes,
      },
    });

    setSaving(false);

    if (result.ok) {
      setSnapshotId(result.snapshotId);
      setProjectionId(result.projectionId);
      setLastSaved(result.savedAt);
      setMessage('Saved.');
    } else {
      setMessage(result.error);
    }

    return result;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleSave();
  }

  async function togglePublish() {
    const nextStatus: ContentStatus =
      form.status === 'published' ? 'draft' : 'published';

    update('status', nextStatus);
    const result = await handleSave({ status: nextStatus });

    if (!result.ok) {
      update('status', form.status);
    }
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="toolbar">
        <div>
          <p className="eyebrow">{team.abbreviation}</p>
          <h2>{team.name}</h2>
          <p className="muted">
            {lastSaved
              ? `Last saved ${new Date(lastSaved).toLocaleString()}`
              : 'Not saved in this session yet.'}
          </p>
          {message ? <p className="muted">{message}</p> : null}
        </div>

        <div className="toolbar-actions">
          <Link className="button secondary" href={`/teams/${team.slug}`}>
            Preview
          </Link>

          <button
            className="button secondary"
            type="button"
            onClick={togglePublish}
            disabled={saving}
          >
            {form.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>

          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <section className="card form-grid">
        <label>
          Archetype
          <input
            value={form.archetype}
            onChange={(e) => update('archetype', e.target.value)}
            placeholder="Disciplined upward rebuild"
          />
        </label>

        <label>
          OL Grade
          <input
            value={form.ol_grade}
            onChange={(e) => update('ol_grade', e.target.value)}
            placeholder="Moderate"
          />
        </label>

        <label className="wide">
          Team Thesis
          <textarea
            value={form.team_thesis}
            onChange={(e) => update('team_thesis', e.target.value)}
            rows={5}
          />
        </label>

        <label className="wide">
          QB Summary
          <textarea
            value={form.qb_summary}
            onChange={(e) => update('qb_summary', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          OL Summary
          <textarea
            value={form.ol_summary}
            onChange={(e) => update('ol_summary', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          Coaching Summary
          <textarea
            value={form.coaching_summary}
            onChange={(e) => update('coaching_summary', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          Defensive Summary
          <textarea
            value={form.defensive_summary}
            onChange={(e) => update('defensive_summary', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          Injury Status
          <textarea
            value={form.injury_status}
            onChange={(e) => update('injury_status', e.target.value)}
            rows={4}
          />
        </label>

        <label>
          Key Additions
          <textarea
            value={form.key_additions}
            onChange={(e) => update('key_additions', e.target.value)}
            rows={6}
            placeholder="One per line"
          />
        </label>

        <label>
          Key Losses
          <textarea
            value={form.key_losses}
            onChange={(e) => update('key_losses', e.target.value)}
            rows={6}
            placeholder="One per line"
          />
        </label>
      </section>

      <section className="card form-grid">
        <label>
          Projected Wins
          <input
            value={form.projected_wins}
            onChange={(e) => update('projected_wins', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Floor Wins
          <input
            value={form.floor_wins}
            onChange={(e) => update('floor_wins', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Ceiling Wins
          <input
            value={form.ceiling_wins}
            onChange={(e) => update('ceiling_wins', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Confidence
          <input
            value={form.confidence}
            onChange={(e) => update('confidence', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Playoff Probability
          <input
            value={form.playoff_probability}
            onChange={(e) => update('playoff_probability', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label>
          Division Probability
          <input
            value={form.division_probability}
            onChange={(e) => update('division_probability', e.target.value)}
            inputMode="decimal"
          />
        </label>

        <label className="wide">
          Projection Notes
          <textarea
            value={form.projection_notes}
            onChange={(e) => update('projection_notes', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          Fantasy Notes
          <textarea
            value={form.fantasy_notes}
            onChange={(e) => update('fantasy_notes', e.target.value)}
            rows={4}
          />
        </label>

        <label className="wide">
          Betting Notes
          <textarea
            value={form.betting_notes}
            onChange={(e) => update('betting_notes', e.target.value)}
            rows={4}
          />
        </label>
      </section>
    </form>
  );
}
