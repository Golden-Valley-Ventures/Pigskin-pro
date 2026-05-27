import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

type TeamRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  abbreviation: string;
  status: string;
};

export default async function AdminTeamsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('teams')
    .select('id, slug, name, city, abbreviation, status')
    .order('city', { ascending: true });

  const teams = (data ?? []) as TeamRow[];

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Teams</h1>
      </header>

      <section className="card">
        {teams.length > 0 ? (
          <div className="team-list">
            {teams.map((team) => (
              <div className="team-row" key={team.id}>
                <div>
                  <strong>
                    {team.city} {team.name}
                  </strong>
                  <p className="muted">
                    {team.abbreviation} · {team.status}
                  </p>
                </div>

                <div className="team-actions">
                  <Link href={`/teams/${team.slug}`}>Preview</Link>
                  <Link href={`/admin/teams/${team.slug}/edit`}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No teams found yet.</p>
        )}
      </section>
    </div>
  );
}
