// Current form — in_progress club season and national campaign tables (if any).

import StatsTable from './StatsTable';
import {
  deriveCurrentClubEntry,
  deriveCurrentNationalStint,
} from '../utils/deriveCurrentClubEntry';

const CLUB_FORM_COLUMNS = [
  { key: 'season', label: 'Season' },
  { key: 'club', label: 'Club' },
  { key: 'league', label: 'League' },
  { key: 'appearances', label: 'Apps', align: 'right' },
  { key: 'starts', label: 'Starts', align: 'right' },
  { key: 'goals', label: 'Goals', align: 'right' },
  { key: 'assists', label: 'Assists', align: 'right' },
];

const NATIONAL_FORM_COLUMNS = [
  { key: 'competition', label: 'Competition' },
  { key: 'year', label: 'Year' },
  { key: 'stage', label: 'Stage' },
  { key: 'starts', label: 'Starts', align: 'right' },
  { key: 'goals', label: 'Goals', align: 'right' },
  { key: 'assists', label: 'Assists', align: 'right' },
];

function CurrentSeasonLabel() {
  return (
    <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
      Current season
    </span>
  );
}

export default function CurrentFormSection({ player }) {
  const currentClub = deriveCurrentClubEntry(player.club_career);
  const currentNational = deriveCurrentNationalStint(player.national_team?.stints);

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">
        Current form
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        How this player is performing right now.
      </p>

      <div className="mt-4 space-y-6">
        {currentClub ? (
          <div>
            <div className="mb-3 flex items-center">
              <h3 className="text-sm font-semibold text-slate-800">Club</h3>
              {currentClub.in_progress && <CurrentSeasonLabel />}
            </div>
            <StatsTable columns={CLUB_FORM_COLUMNS} rows={[currentClub]} />
          </div>
        ) : (
          <p className="text-sm text-slate-500">No club season data available.</p>
        )}

        {currentNational && (
          <div>
            <div className="mb-3 flex items-center">
              <h3 className="text-sm font-semibold text-slate-800">National team</h3>
              <CurrentSeasonLabel />
            </div>
            <StatsTable columns={NATIONAL_FORM_COLUMNS} rows={[currentNational]} />
          </div>
        )}
      </div>
    </section>
  );
}
