import { useEffect, useState } from "react";

/**
 * Custom hook: fetches Discord presence data from the Lanyard API
 * @param {string} discordId
 */
export function useLanyard(discordId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        if (!res.ok) throw new Error("Lanyard fetch error");
        const json = await res.json();
        const spotify = json?.data?.listening_to_spotify ? json.data.spotify : null;
        setData({ ...json.data, spotify });
      } catch (err) {
        setError(err.message || "Lanyard API error");
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
    const interval = setInterval(fetchActivity, 5000);
    return () => clearInterval(interval);
  }, [discordId]);

  return { data, loading, error };
}