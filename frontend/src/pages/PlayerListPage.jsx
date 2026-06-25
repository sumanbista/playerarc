// Player list landing page — composes search, filters, and card grid; owns UI state only.

import { useMemo, useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import { filterPlayers, extractFilterOptions } from '../utils/filterPlayers';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';
import EmptyState from '../components/EmptyState';

const EMPTY_FILTERS = {
  nationality: '',
  currentClub: '',
  league: '',
  position: '',
};

export default function PlayerListPage() {
  const { players, loading, error } = usePlayers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const filterOptions = useMemo(() => extractFilterOptions(players), [players]);

  const filteredPlayers = useMemo(
    () => filterPlayers(players, { searchTerm, ...filters }),
    [players, searchTerm, filters],
  );

  if (loading) {
    return (
      <PageShell>
        <EmptyState variant="loading" />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <EmptyState variant="error" message={error} />
      </PageShell>
    );
  }

  return (
    <PageShell playerCount={players.length}>
      <div className="space-y-4">
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <FilterPanel
          filters={filters}
          options={filterOptions}
          onFiltersChange={setFilters}
        />
      </div>

      <div className="mt-8">
        {filteredPlayers.length === 0 ? (
          <EmptyState variant="no-results" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.player_id} player={player} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({ children, playerCount }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            PlayerArc
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Player-centric football stats — club and country in one place.
            {playerCount != null && (
              <span className="ml-1 text-slate-400">({playerCount} players)</span>
            )}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
