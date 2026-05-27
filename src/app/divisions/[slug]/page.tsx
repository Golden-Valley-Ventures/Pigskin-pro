import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

type DivisionRow = {
  id: string;
  slug: string;
  name: string;
  conference: string;
};

type TeamRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  abbreviation: string;
  status: string;
  projected_wins?: number | null;
  confidence?: number | null;
};

export default async function DivisionPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  const { data: divisionData } = await supabase
    .from('divisions')
    .select('id, slug, name, conference')
    .eq('slug', params.slug)
    .single();

  const division = divisionData as DivisionRow | null;

  if (!division) {
    notFound();
  }

  const { data: teamData } = await supabase
    .from('teams')
    .select('id, slug, name, city, abbreviation, status')
    .eq('division_id', division.id)
    .eq('status', 'published')
    .order('city', { ascending: true });

  const teams = (teamData ?? []) as TeamRow[];

  return (
    <main className="site-page">
      <section className="hero">
        <p className="eyebrow">{division.conference}</p>
        <h1>{division.name}</h1>
        <p className="lede">
          Division research hub for team dossiers, projections, and structural notes.
        </p>
      </section>

      <section className="grid">
        {teams.length > 0 ? (
          teams.map((team) => (
            <Link className="card" href={`/teams/${team.slug}`} key={team.id}>
              <p className="eyebrow">{team.abbreviation}</p>
              <h2>
                {team.city} {team.name}
              </h2>
              <p className="muted">View team dossier →</p>
            </Link>
          ))
        ) : (
          <div className="card">
            <h2>No published teams yet</h2>
            <p className="muted">
              Publish teams from the admin panel and they’ll appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
