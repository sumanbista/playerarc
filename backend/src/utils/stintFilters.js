// Filter helpers for club_career and national_team stints based on query params.

function matchesYear(stintYear, filterYear) {
  if (stintYear === null || stintYear === undefined) return false;
  return String(stintYear) === String(filterYear);
}

function filterClubStints(stints, { country, year }) {
  return stints.filter((stint) => {
    if (country && stint.country !== country) return false;
    if (year && !matchesYear(stint.season, year)) return false;
    return true;
  });
}

function filterNationalStints(stints, { competition_type, year }) {
  return stints.filter((stint) => {
    if (competition_type && stint.competition_type !== competition_type) return false;
    if (year && !matchesYear(stint.year, year)) return false;
    return true;
  });
}

function countGaps(stints) {
  return stints.filter((stint) => stint.needs_breakdown === true).length;
}

module.exports = { filterClubStints, filterNationalStints, countGaps };
