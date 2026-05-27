import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function TeamsIndex() {
  const supabase = await createClient();

  const { data: teams, error } = await supabase
    .from('teams')
    .select(
      `id, slug, name, abbreviation, status, updated_at,
       division:divisions ( id, name, slug, conference, region )`,
    )
    .order('name');

  if (error) {
    return (
      <div className="page">
        <h1>Teams</h1>
        <p className="error-text">Failed to load: {error.message}</p>
      </div>
    );
  }

  // Group by division name
  const byDivision = new Map<string, typeof teams>();
  for (const t of teams ?? []) {
    const div = Array.isArray(t.division) ? t.division[0] : t.division;
    const key = div?.name ?? 'Unassigned';
    if (!byDivision.has(key)) byDivision.set(key, []);
    byDivision.get(key)!.push(t);
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Content</p>
        <h1>Teams</h1>
      </header>

      {Array.from(byDivision.entries()).map(([divName, list]) => (
        <section key={divName} className="card">
          <h2>{divName}</h2>
          <table className="team-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Abbr.</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td className="team-name">{t.name}</td>
                  <td className="mono">{t.abbreviation}</td>
                  <td>
                    <span className={`pill pill--${t.status}`}>{t.status}</span>
                  </td>
                  <td className="muted">
                    {new Date(t.updated_at).toLocaleDateString()}
                  </td>
                  <td className="row-actions">
                    <Link href={`/admin/teams/${t.slug}/edit`}>Edit</Link>
                    <Link href={`/admin/teams/${t.slug}/history`}>History</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
