import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function TeamPage({ params }: PageProps) {
  const supabase = await createClient();

  const { data: teamData, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (teamError || !teamData) {
    notFound();
  }

  const team = teamData as any;

  const [{ data: snapshotData }, { data: projectionData }, { data: sourcesData }] =
    await Promise.all([
      supabase
        .from('team_latest_snapshot')
        .select('*')
        .eq('team_id', team.id)
        .maybeSingle(),

      supabase
        .from('team_latest_projection')
        .select('*')
        .eq('team_id', team.id)
        .maybeSingle(),

      supabase
        .from('source_notes')
        .select('*')
        .eq('team_id', team.id)
        .eq('status', 'published')
        .order('source_date', { ascending: false })
        .limit(8),
    ]);

  const snapshot = snapshotData as any;
  const projection = projectionData as any;
  const sources = (sourcesData ?? []) as any[];

  return (
    <main className="site-page">
      <section className="hero">
        <p className="eyebrow">{team.city}</p>
        <h1>{team.name}</h1>
        <p className="lede">
          {snapshot?.team_thesis ?? 'Team research snapshot coming soon.'}
        </p>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <span className="metric-label">Projected Wins</span>
          <strong>{projection?.projected_wins ?? '—'}</strong>
        </div>

        <div className="metric-card">
          <span className="metric-label">Floor</span>
          <strong>{projection?.floor_wins ?? '—'}</strong>
        </div>

        <div className="metric-card">
          <span className="metric-label">Ceiling</span>
          <strong>{projection?.ceiling_wins ?? '—'}</strong>
        </div>

        <div className="metric-card">
          <span className="metric-label">Confidence</span>
          <strong>{projection?.confidence ?? '—'}</strong>
        </div>
      </section>

      <section className="content-grid">
        <article className="card">
          <h2>Quarterback</h2>
          <p>{snapshot?.qb_summary ?? 'No quarterback summary published yet.'}</p>
        </article>

        <article className="card">
          <h2>Offensive Line</h2>
          <p>{snapshot?.ol_summary ?? 'No offensive line summary published yet.'}</p>
          {snapshot?.ol_grade ? <p className="muted">Grade: {snapshot.ol_grade}</p> : null}
        </article>

        <article className="card">
          <h2>Coaching</h2>
          <p>{snapshot?.coaching_summary ?? 'No coaching summary published yet.'}</p>
        </article>

        <article className="card">
          <h2>Defense</h2>
          <p>{snapshot?.defensive_summary ?? 'No defensive summary published yet.'}</p>
        </article>

        <article className="card">
          <h2>Injury Status</h2>
          <p>{snapshot?.injury_status ?? 'No injury status published yet.'}</p>
        </article>

        <article className="card">
          <h2>Fantasy Notes</h2>
          <p>{snapshot?.fantasy_notes ?? 'No fantasy notes published yet.'}</p>
        </article>

        <article className="card">
          <h2>Betting Notes</h2>
          <p>{snapshot?.betting_notes ?? 'No betting notes published yet.'}</p>
        </article>

        <article className="card">
          <h2>Projection Notes</h2>
          <p>{projection?.notes ?? 'No projection notes published yet.'}</p>
        </article>
      </section>

      <section className="card">
        <h2>Sources</h2>
        {sources.length > 0 ? (
          <ul className="source-list">
            {sources.map((source) => (
              <li key={source.id}>
                <strong>{source.title ?? source.source_name ?? 'Source'}</strong>
                {source.source_date ? (
                  <span> — {new Date(source.source_date).toLocaleDateString()}</span>
                ) : null}
                {source.excerpt ? <p>{source.excerpt}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No source notes published yet.</p>
        )}
      </section>
    </main>
  );
}
