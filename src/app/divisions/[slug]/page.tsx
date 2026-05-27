import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const revalidate = 60;

export default async function PublicDivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: division } = await supabase
    .from('divisions')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!division) notFound();

  const { data: teams } = await supabase
    .from('teams')
    .select(
      `id, slug, name, abbreviation,
       proj:team_latest_projection ( projected_wins, confidence )`,
    )
    .eq('division_id', division.id)
    .eq('status', 'published')
    .order('name');

  return (
    <main className="public-division">
      <h1>{division.name}</h1>
      {division.summary && <p className="lede">{division.summary}</p>}

      <ul className="div-teams">
        {teams?.map((t) => {
          const p = Array.isArray(t.proj) ? t.proj[0] : t.proj;
          return (
            <li key={t.id}>
              <Link href={`/teams/${t.slug}`}>
                <span className="t-name">{t.name}</span>
                {p?.projected_wins != null && (
                  <span className="t-wins">{p.projected_wins} wins</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
