import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const supabase = await createClient();

  const [{ count: teamCount }, { count: draftCount }, { data: recentEdits }] =
    await Promise.all([
      supabase.from('teams').select('*', { count: 'exact', head: true }),
      supabase
        .from('team_snapshots')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'draft'),
      supabase
        .from('audit_log')
        .select('table_name, row_id, action, occurred_at')
        .order('occurred_at', { ascending: false })
        .limit(8),
    ]);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Overview</p>
        <h1>Dashboard</h1>
      </header>

      <section className="stat-row">
        <div className="stat">
          <span className="stat-label">Teams</span>
          <span className="stat-value">{teamCount ?? 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Drafts</span>
          <span className="stat-value">{draftCount ?? 0}</span>
        </div>
        <Link className="stat stat--action" href="/admin/teams">
          <span className="stat-label">Go to</span>
          <span className="stat-value">Teams →</span>
        </Link>
      </section>

      <section className="card">
        <h2>Recent edits</h2>
        {recentEdits && recentEdits.length > 0 ? (
          <ul className="audit">
            {recentEdits.map((e, i) => (
              <li key={i}>
                <span className="audit-action">{e.action}</span>
                <span className="audit-table">{e.table_name}</span>
                <time>{new Date(e.occurred_at).toLocaleString()}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No edits yet.</p>
        )}
      </section>
    </div>
  );
}
