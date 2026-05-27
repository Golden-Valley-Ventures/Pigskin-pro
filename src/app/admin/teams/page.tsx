import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient, requireAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function AdminTeamPage({ params }: PageProps) {
  await requireAdmin();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const team = data as any;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Team Admin</p>
        <h1>{team.name}</h1>
        <p className="muted">
          {team.city} · {team.abbreviation}
        </p>
      </header>

      <section className="card">
        <h2>Manage</h2>

        <div className="admin-actions">
          <Link className="button" href={`/admin/teams/${team.slug}/edit`}>
            Edit team
          </Link>

          <Link className="button button-secondary" href={`/admin/teams/${team.slug}/history`}>
            View history
          </Link>

          <Link className="button button-secondary" href={`/teams/${team.slug}`}>
            Preview public page
          </Link>

          <Link className="button button-secondary" href="/admin/teams">
            Back to teams
          </Link>
        </div>
      </section>
    </div>
  );
}
