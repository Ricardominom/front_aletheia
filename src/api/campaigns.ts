import { Campaign, ApiResponse } from '../types';
import { generateRandomProgress } from '../utils/data';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'GENERAL',
    progress: 27.36,
    trend: 'up',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: {
      planned: 1000000,
      executed: 554000,
    },
  },
  {
    id: '2',
    name: 'TERRITORIO',
    progress: 25.2,
    trend: 'down',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: {
      planned: 800000,
      executed: 420000,
    },
  },
  {
    id: '3',
    name: 'DIGITAL',
    progress: 26.8,
    trend: 'up',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: {
      planned: 600000,
      executed: 350000,
    },
  },
  {
    id: '4',
    name: 'AIRE',
    progress: 30.1,
    trend: 'up',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: {
      planned: 500000,
      executed: 280000,
    },
  },
  {
    id: '5',
    name: 'TELEFONÍA',
    progress: 27.3,
    trend: 'down',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: {
      planned: 400000,
      executed: 220000,
    },
  },
];

export const getCampaigns = async (): Promise<ApiResponse<Campaign[]>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: MOCK_CAMPAIGNS,
    status: 200,
  };
};

export const getCampaignById = async (id: string): Promise<ApiResponse<Campaign>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);
  
  if (!campaign) {
    throw new Error('Campaign not found');
  }

  return {
    data: campaign,
    status: 200,
  };
};