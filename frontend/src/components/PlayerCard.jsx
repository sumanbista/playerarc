// Renders a single player as a clickable card with key profile details.

import { Link } from 'react-router-dom';
import { getPlayerInitials } from '../utils/playerInitials';
import { nationalityFlag } from '../utils/nationalityFlag';

export default function PlayerCard({ player }) {
  const initials = getPlayerInitials(player.display_name);
  const flag = nationalityFlag(player.nationality);

  return (
    <Link
      to={`/players/${player.player_id}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
            {player.display_name}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">{player.position}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Club</dt>
          <dd className="truncate text-right font-medium text-slate-800">
            {player.current_club}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">League</dt>
          <dd className="truncate text-right font-medium text-slate-800">
            {player.current_league}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">National team</dt>
          <dd className="truncate text-right font-medium text-slate-800">
            {flag && <span className="mr-1" aria-hidden="true">{flag}</span>}
            {player.national_team}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
