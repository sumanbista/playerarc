// Career history tab — full club_career and national_team.stints tables.

import StatsTable from './StatsTable';
import { sortClubCareerDescending, sortNationalStintsDescending } from '../utils/sortStints';

const CLUB_HISTORY_COLUMNS = [
  { key: 'season', label: 'Season' },
  { key: 'club', label: 'Club' },
  { key: 'league', label: 'League' },
  { key: 'appearances', label: 'Apps', align: 'right' },
  { key: 'starts', label: 'Starts', align: 'right' },
  { key: 'goals', label: 'Goals', align: 'right' },
  { key: 'assists', label: 'Assists', align: 'right' },
];

const NATIONAL_HISTORY_COLUMNS = [
  { key: 'year', label: 'Year' },
  { key: 'competition', label: 'Competition' },
  { key: 'competition_type', label: 'Type' },
  { key: 'starts', label: 'Starts', align: 'right' },
  { key: 'goals', label: 'Goals', align: 'right' },
  { key: 'assists', label: 'Assists', align: 'right' },
];

export default function CareerHistoryTab({ player }) {
  const clubRows = sortClubCareerDescending(player.club_career ?? []);
  const nationalRows = sortNationalStintsDescending(player.national_team?.stints ?? []);

  return (
    <div className="space-y-8">
      <StatsTable
        title="Club career"
        columns={CLUB_HISTORY_COLUMNS}
        rows={clubRows}
        emptyMessage="No club career data available."
      />
      <StatsTable
        title="National team"
        columns={NATIONAL_HISTORY_COLUMNS}
        rows={nationalRows}
        emptyMessage="No national team data available."
      />
    </div>
  );
}
