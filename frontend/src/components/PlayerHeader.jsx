// Profile header — name, position, current club, and national team with avatar placeholder.

import { getPlayerInitials } from '../utils/playerInitials';
import { nationalityFlag } from '../utils/nationalityFlag';
import { deriveCurrentClubEntry } from '../utils/deriveCurrentClubEntry';

export default function PlayerHeader({ player }) {
  const initials = getPlayerInitials(player.full_name);
  const currentClub = deriveCurrentClubEntry(player.club_career);
  const flag = nationalityFlag(player.nationality);

  return (
    <div className="flex items-start gap-5">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-semibold text-emerald-800"
        aria-hidden="true"
      >
        {initials}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {player.full_name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{player.position}</p>
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div>
            <dt className="text-slate-500">Current club</dt>
            <dd className="font-medium text-slate-800">
              {currentClub?.club ?? '—'}
              {currentClub?.league && (
                <span className="text-slate-500"> · {currentClub.league}</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">National team</dt>
            <dd className="font-medium text-slate-800">
              {flag && <span className="mr-1" aria-hidden="true">{flag}</span>}
              {player.national_team?.country ?? player.nationality}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
