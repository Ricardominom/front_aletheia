import { useState, useEffect } from "react";
import { getSocialMetrics } from "../api/social";
import { SocialMetrics } from "../types";

export const useSocialMetrics = () => {
  const [metrics, setMetrics] = useState<SocialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getSocialMetrics();
        setMetrics(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch social metrics")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};
