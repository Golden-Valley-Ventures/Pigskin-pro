import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

interface DiffEntry {
  from: unknown;
  to: unknown;
}

export default async function TeamHistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: team } = await supabase
    .from('teams')
    .select('id, name, slug, season, abbreviation')
    .eq('slug', slug)
    .maybeSingle();

  if (!team) notFound();

  // Pull the IDs of every snapshot + projection ever attached to this team,
  // then audit rows for those IDs + the team row itself.
  const [{ data: snaps }, { data: projs }] = await Promise.all([
    supabase.from('team_snapshots').select('id').eq('team_id', team.id),
    supabase.from('projections').select('id').eq('team_id', team.id),
  ]);

  const rowIds = [
    team.id,
    ...(snaps?.map((s) => s.id) ?? []),
    ...(projs?.map((p) => p.id) ?? []),
  ];

  const { data: entries } = await supabase
    .from('audit_log')
    .select('id, table_name, row_id, action, actor, diff, occurred_at')
    .in('row_id', rowIds)
    .order('occurred_at', { ascending: false })
    .limit(100);

  return (
    <div className="page">
      <header className="page-head edit-head">
        <div>
          <p className="eyebrow">
            <Link href="/admin/teams">Teams</Link> /{' '}
            <Link href={`/admin/teams/${team.slug}/edit`}>{team.name}</Link>
          </p>
          <h1>History</h1>
          <p className="muted">
            Every material edit to {team.name}. Read straight from the audit
            log.
          </p>
        </div>
      </header>

      {!entries || entries.length === 0 ? (
        <p className="muted">No history yet.</p>
      ) : (
        <ol className="history">
          {entries.map((e) => {
            const diff = (e.diff ?? {}) as Record<string, DiffEntry>;
            const fields =
              e.action === 'update' ? Object.keys(diff) : ['(full row)'];
            return (
              <li key={e.id}>
                <header>
                  <span className={`pill pill--${e.action}`}>{e.action}</span>
                  <span className="mono">{e.table_name}</span>
                  <time>{new Date(e.occurred_at).toLocaleString()}</time>
                </header>
                {e.action === 'update' && (
                  <ul className="diff">
                    {fields.map((f) => (
                      <li key={f}>
                        <span className="diff-field">{f}</span>
                        <span className="diff-from">
                          {formatValue(diff[f]?.from)}
                        </span>
                        <span className="diff-arrow">→</span>
                        <span className="diff-to">
                          {formatValue(diff[f]?.to)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '∅';
  if (typeof v === 'string') {
    if (v.length > 80) return v.slice(0, 77) + '…';
    return v || '""';
  }
  return JSON.stringify(v);
}
