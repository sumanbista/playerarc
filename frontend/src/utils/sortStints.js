// Sort helpers for career history tables (most recent first).

function leadingYear(value) {
  const match = String(value ?? '').match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

export function sortClubCareerDescending(clubCareer) {
  return [...clubCareer].sort(
    (a, b) => leadingYear(b.season) - leadingYear(a.season),
  );
}

export function sortNationalStintsDescending(stints) {
  return [...stints].sort(
    (a, b) => leadingYear(b.year) - leadingYear(a.year),
  );
}
