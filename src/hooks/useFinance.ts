import { useState, useEffect } from 'react';
import { getFinanceMetrics } from '../api/finance';
import type { FinanceMetrics } from '../api/finance';

export const useFinanceMetrics = () => {
  const [metrics, setMetrics] = useState<FinanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getFinanceMetrics();
        setMetrics(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch finance metrics'));
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};