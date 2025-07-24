import { ApiResponse } from '../types';

export interface FinanceMetrics {
  exercisedBudget: number;
  accruedBudget: number;
  scheduleDelay: number;
}

const MOCK_FINANCE_METRICS: FinanceMetrics = {
  exercisedBudget: 55.4,
  accruedBudget: 55.4,
  scheduleDelay: -5.2,
};

export const getFinanceMetrics = async (): Promise<ApiResponse<FinanceMetrics>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: MOCK_FINANCE_METRICS,
    status: 200,
  };
};