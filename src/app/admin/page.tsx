import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Overview</p>
        <h1>Dashboard</h1>
      </header>

      <section className="stat-row">
        <div className="stat">
          <span className="stat-label">Status</span>
          <span className="stat-value">Online</span>
        </div>

        <Link className="stat stat--action" href="/admin/teams">
          <span className="stat-label">Go to</span>
          <span className="stat-value">Teams →</span>
        </Link>
      </section>

      <section className="card">
        <h2>Admin System Active</h2>
        <p className="muted">
          Supabase CMS and audit infrastructure are connected. Team editing
          functionality is ready for configuration.
        </p>
      </section>
    </div>
  );
}
