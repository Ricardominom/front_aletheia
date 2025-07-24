import { ApiResponse } from '../types';

export interface TacticalData {
  date: string;
  candidate: string;
  percentage: number;
  trend: 'up' | 'down';
}

export const getTacticalData = async (): Promise<ApiResponse<TacticalData[]>> => {
  const response = await fetch('/api/dashboard/tracking');
  if (!response.ok) {
    throw new Error('Error al obtener datos tácticos');
  }
  const data = await response.json();
  return {
    data,
    status: response.status,
  };
};