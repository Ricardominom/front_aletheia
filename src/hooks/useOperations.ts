import { useState, useEffect } from 'react';
import { OperationMetric } from '../types';
import { getOperationMetrics } from '../api/operations';

export const useOperationMetrics = () => {
  const [metrics, setMetrics] = useState<OperationMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getOperationMetrics();
        setMetrics(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch operation metrics'));
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};