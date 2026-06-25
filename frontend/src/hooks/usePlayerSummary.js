// Fetches career summary totals for club vs. country comparison.
// The summary endpoint returns both club_career and national_team totals in one
// response — there is no filter param that isolates a single side for full-career
// totals, so one unfiltered call is the correct approach.

import { useEffect, useState } from 'react';
import { API_BASE } from '../utils/api';

export function usePlayerSummary(playerId) {
  const [clubSummary, setClubSummary] = useState(null);
  const [nationalSummary, setNationalSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      return;
    }

    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/api/players/${playerId}/summary`);
        if (!response.ok) {
          throw new Error(`Failed to fetch summary (${response.status})`);
        }
        const data = await response.json();
        setClubSummary(data.club_career ?? null);
        setNationalSummary(data.national_team ?? null);
      } catch (err) {
        setClubSummary(null);
        setNationalSummary(null);
        setError(err.message || 'Something went wrong while loading summary data.');
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [playerId]);

  return { clubSummary, nationalSummary, loading, error };
}
