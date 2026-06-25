// Fetches the player index from the backend API and exposes loading/error state.

import { useEffect, useState } from 'react';

import { API_BASE } from '../utils/api';

export function usePlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE}/api/players`);
        if (!response.ok) {
          throw new Error(`Failed to fetch players (${response.status})`);
        }
        const data = await response.json();
        setPlayers(data.players ?? []);
      } catch (err) {
        setError(err.message || 'Something went wrong while loading players.');
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  return { players, loading, error };
}
