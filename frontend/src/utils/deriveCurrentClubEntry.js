// Returns the in_progress club_career entry, or the most recent season as a fallback.

export function deriveCurrentClubEntry(clubCareer) {
  if (!clubCareer?.length) return null;
  const inProgress = clubCareer.find((entry) => entry.in_progress === true);
  if (inProgress) return inProgress;
  return clubCareer[0];
}

export function deriveCurrentNationalStint(stints) {
  if (!stints?.length) return null;
  return stints.find((stint) => stint.in_progress === true) ?? null;
}
