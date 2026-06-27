/**
 * @module hooks/useOverview
 * @description React hook for fetching and Zod-validating the /overview endpoint.
 * Returns loading state, validated data, and any fetch or validation error.
 */
import { useEffect, useState } from 'react';
import { overviewSchema, type Overview } from '../types/overview';

/** Return shape of the useOverview hook. */
export interface UseOverviewResult {
  data: Overview | null;
  loading: boolean;
  error: string | null;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

/**
 * Fetches and validates the overview endpoint on mount.
 * Uses Zod to ensure the API response matches the expected schema.
 * @returns Current fetch state including data, loading flag, and error message.
 */
export function useOverview(): UseOverviewResult {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchOverview(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/overview`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const raw: unknown = await response.json();
        const parsed = overviewSchema.safeParse(raw);
        if (!parsed.success) {
          throw new Error(`Invalid API response: ${parsed.error.message}`);
        }
        if (!cancelled) {
          setData(parsed.data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchOverview();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
