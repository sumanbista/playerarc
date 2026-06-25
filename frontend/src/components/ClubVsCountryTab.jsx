// Club vs. country tab — side-by-side career totals from the summary endpoint.

import { usePlayerSummary } from '../hooks/usePlayerSummary';
import StatsTable from './StatsTable';
import EmptyState from './EmptyState';

const COMPARISON_ROWS = [
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'appearances', label: 'Appearances' },
  { key: 'starts', label: 'Starts' },
];

export default function ClubVsCountryTab({ playerId }) {
  const { clubSummary, nationalSummary, loading, error } = usePlayerSummary(playerId);

  if (loading) {
    return <EmptyState variant="loading" />;
  }

  if (error) {
    return <EmptyState variant="error" message={error} />;
  }

  const rows = COMPARISON_ROWS.map(({ key, label }) => ({
    stat: label,
    club: clubSummary?.[key],
    country: nationalSummary?.[key],
  }));

  const columns = [
    { key: 'stat', label: 'Stat' },
    { key: 'club', label: 'Club', align: 'right' },
    { key: 'country', label: 'Country', align: 'right' },
  ];

  return (
    <div>
      <p className="mb-4 text-sm text-slate-500">
        Career totals computed live from all club and national team stints.
      </p>
      <StatsTable columns={columns} rows={rows} />
    </div>
  );
}
