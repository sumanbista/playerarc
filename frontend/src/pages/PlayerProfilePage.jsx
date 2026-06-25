// Player profile page — composition layer: header, current form, and tabbed history/comparison.

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlayerProfile } from '../hooks/usePlayerProfile';
import PlayerHeader from '../components/PlayerHeader';
import CurrentFormSection from '../components/CurrentFormSection';
import CareerHistoryTab from '../components/CareerHistoryTab';
import ClubVsCountryTab from '../components/ClubVsCountryTab';
import EmptyState from '../components/EmptyState';

const TABS = [
  { id: 'career', label: 'Career History' },
  { id: 'comparison', label: 'Club vs. Country' },
];

export default function PlayerProfilePage() {
  const { id } = useParams();
  const { player, loading, error } = usePlayerProfile(id);
  const [activeTab, setActiveTab] = useState('career');

  if (loading) {
    return (
      <ProfileShell>
        <EmptyState variant="loading" />
      </ProfileShell>
    );
  }

  if (error) {
    return (
      <ProfileShell>
        <EmptyState variant="error" message={error} />
      </ProfileShell>
    );
  }

  if (!player) {
    return (
      <ProfileShell>
        <EmptyState variant="error" message="Player not found." />
      </ProfileShell>
    );
  }

  return (
    <ProfileShell>
      <Link
        to="/"
        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
      >
        ← Back to player list
      </Link>

      <div className="mt-6">
        <PlayerHeader player={player} />
      </div>

      <CurrentFormSection player={player} />

      <div className="mt-10 border-b border-slate-200">
        <nav className="-mb-px flex gap-6" aria-label="Profile sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'career' && <CareerHistoryTab player={player} />}
        {activeTab === 'comparison' && <ClubVsCountryTab playerId={id} />}
      </div>
    </ProfileShell>
  );
}

function ProfileShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            PlayerArc
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
