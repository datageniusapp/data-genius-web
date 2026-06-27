/**
 * @module hooks/useOverview
 * @description Fetches /overview and auto-refreshes every 30 seconds.
 */

import { useState, useEffect } from 'react';
import { OverviewSchema, type Overview } from '../types/overview';

const API_URL = import.meta.env.VITE_API_URL as string;

interface UseOverviewResult {
  data: Overview | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useOverview(): UseOverviewResult {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchOverview(): Promise<void> {
      try {
        const response = await fetch(`${API_URL}/overview`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const raw: unknown = await response.json();
        const parsed = OverviewSchema.safeParse(raw);
        if (!parsed.success) {
          throw new Error(`Unexpected API shape: ${parsed.error.message}`);
        }
        if (!cancelled) {
          setData(parsed.data);
          setError(null);
          setLastUpdated(new Date());
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
    const interval = setInterval(() => {
      void fetchOverview();
    }, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error, lastUpdated };
}
