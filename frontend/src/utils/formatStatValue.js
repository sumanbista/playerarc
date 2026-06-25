// Consistent null/undefined rendering for stat values across the profile page.

export function formatStatValue(value) {
  if (value === null || value === undefined) return '—';
  return String(value);
}
