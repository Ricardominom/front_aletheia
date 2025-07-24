import { useState, useEffect } from 'react';
import { Campaign } from '../types';
import { getCampaigns, getCampaignById } from '../api/campaigns';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        setCampaigns(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch campaigns'));
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
};

export const useCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignById(id);
        setCampaign(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch campaign'));
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  return { campaign, loading, error };
};