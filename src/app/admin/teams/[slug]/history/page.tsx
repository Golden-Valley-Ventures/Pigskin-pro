import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function TeamHistoryPage() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Edit history</h1>
      </header>

      <section className="card">
        <p className="muted">
          History view is temporarily disabled while the admin type layer is tightened.
        </p>

        <Link className="button" href="/admin/teams">
          Back to teams
        </Link>
      </section>
    </div>
  );
}
