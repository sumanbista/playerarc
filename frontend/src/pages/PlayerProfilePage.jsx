// Placeholder player profile route — full profile page not implemented yet.

import { Link, useParams } from 'react-router-dom';

export default function PlayerProfilePage() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Player profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          Profile page for <span className="font-medium text-slate-700">{id}</span> is
          coming soon.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Back to player list
        </Link>
      </div>
    </div>
  );
}
