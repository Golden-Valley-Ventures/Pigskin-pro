import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase-server';
import SignOutButton from './_components/SignOutButton';
import './admin.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  // Middleware already redirects; this is defense-in-depth for the layout.

  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <div className="brand">
          <span className="brand-mark">P/</span>
          <span className="brand-text">Pigskin.pro</span>
          <span className="brand-tag">editor</span>
        </div>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/teams">Teams</Link>
        </nav>
        <div className="admin-foot">
          {user && <span className="who">{user.email}</span>}
          <SignOutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
