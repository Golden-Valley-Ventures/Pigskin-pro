import EditForm from './EditForm';

export const dynamic = 'force-dynamic';

export default function EditTeamPage() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Edit team</h1>
      </header>

      <EditForm />
    </div>
  );
}
