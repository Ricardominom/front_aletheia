import { OperationMetric, ApiResponse } from '../types';

export const getOperationMetrics = async (): Promise<ApiResponse<OperationMetric[]>> => {
  let response;
  try {
    response = await fetch('/api/dashboard/metricas');
  } catch (networkError) {
    throw new Error('No se pudo conectar con el backend');
  }
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = [];
  }
  if (!response.ok) {
    // Muestra el error real del backend en consola
    console.error('Backend error:', data?.error || response.statusText);
    throw new Error(data?.error || 'Error al obtener datos de métricas');
  }
  return {
    data: Array.isArray(data) ? data : [],
    status: response.status,
  };
};