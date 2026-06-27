/**
 * @module hooks/useRetention
 * @description Fetches /users/retention and auto-refreshes every 60 seconds.
 * Retention cohorts are day-boundary windows so they change slowly — 60 s is adequate.
 */

import { useState, useEffect } from 'react';
import { RetentionSchema, type Retention } from '../types/retention';

const API_BASE = 'https://web-production-d26da.up.railway.app';

interface UseRetentionResult {
  data: Retention | null;
  loading: boolean;
  error: string | null;
}

export function useRetention(): UseRetentionResult {
  const [data, setData] = useState<Retention | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRetention(): Promise<void> {
      try {
        const response = await fetch(`${API_BASE}/users/retention`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const raw: unknown = await response.json();
        const parsed = RetentionSchema.safeParse(raw);
        if (!parsed.success) {
          throw new Error(`Unexpected API shape: ${parsed.error.message}`);
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

    void fetchRetention();
    const interval = setInterval(() => {
      void fetchRetention();
    }, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}
