// Fetches a single player's full record by id.

import { useEffect, useState } from 'react';
import { API_BASE } from '../utils/api';

export function usePlayerProfile(playerId) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      setError('No player id provided.');
      return;
    }

    async function fetchPlayer() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/api/players/${playerId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch player (${response.status})`);
        }
        setPlayer(await response.json());
      } catch (err) {
        setPlayer(null);
        setError(err.message || 'Something went wrong while loading this player.');
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [playerId]);

  return { player, loading, error };
}
