import { useState, useEffect } from 'react';
import { getTacticalData } from '../api/tactical';
import type { TacticalData } from '../api/tactical';

export const useTacticalData = () => {
  const [data, setData] = useState<TacticalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTacticalData();
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tactical data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};