// Live summary calculation — totals are computed from raw stint data on every request.
// Never cached or pre-stored, per product decision: the API must reflect the latest file contents.

const { sumStandardFields } = require('../utils/nullSafeSum');
const {
  filterClubStints,
  filterNationalStints,
  countGaps,
} = require('../utils/stintFilters');

function buildClubSummary(stints, filters) {
  const hasClubFilter = filters.country || filters.year;
  const filtered = hasClubFilter
    ? filterClubStints(stints, filters)
    : stints;

  return {
    ...sumStandardFields(filtered),
    matched_stints: filtered.length,
    completeness: {
      club_stints_total: filtered.length,
      club_stints_with_gaps: countGaps(filtered),
    },
  };
}

function buildNationalSummary(stints, filters) {
  const hasNationalFilter = filters.competition_type || filters.year;
  const filtered = hasNationalFilter
    ? filterNationalStints(stints, filters)
    : stints;

  return {
    ...sumStandardFields(filtered),
    matched_stints: filtered.length,
    completeness: {
      national_stints_total: filtered.length,
      national_stints_with_gaps: countGaps(filtered),
    },
  };
}

function calculatePlayerSummary(player, filters = {}) {
  const clubStints = player.club_career ?? [];
  const nationalStints = player.national_team?.stints ?? [];

  return {
    player_id: player.player_id,
    filters_applied: {
      competition_type: filters.competition_type ?? null,
      country: filters.country ?? null,
      year: filters.year ?? null,
    },
    club_career: buildClubSummary(clubStints, filters),
    national_team: buildNationalSummary(nationalStints, filters),
  };
}

module.exports = { calculatePlayerSummary };
