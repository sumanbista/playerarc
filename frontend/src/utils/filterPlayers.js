// Pure filtering logic — takes the full player list plus search/filter inputs and returns matches.

function matchesSearch(player, searchTerm) {
  if (!searchTerm) return true;
  const term = searchTerm.toLowerCase().trim();
  const fullName = player.full_name?.toLowerCase() ?? '';
  const displayName = player.display_name?.toLowerCase() ?? '';
  return fullName.includes(term) || displayName.includes(term);
}

export function filterPlayers(players, { searchTerm, nationality, currentClub, league, position }) {
  return players.filter((player) => {
    if (!matchesSearch(player, searchTerm)) return false;
    if (nationality && player.nationality !== nationality) return false;
    if (currentClub && player.current_club !== currentClub) return false;
    if (league && player.current_league !== league) return false;
    if (position && player.position !== position) return false;
    return true;
  });
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function extractFilterOptions(players) {
  return {
    nationalities: uniqueSorted(players.map((p) => p.nationality)),
    clubs: uniqueSorted(players.map((p) => p.current_club)),
    leagues: uniqueSorted(players.map((p) => p.current_league)),
    positions: uniqueSorted(players.map((p) => p.position)),
  };
}
