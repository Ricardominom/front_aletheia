import { OperationMetric, ApiResponse } from '../types';

export const getOperationMetrics = async (): Promise<ApiResponse<OperationMetric[]>> => {
  let response;
  try {
    response = await fetch('/api/dashboard/metricas');
  } catch (networkError) {
    throw new Error('No se pudo conectar con el backend');
  }
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error('Error parsing JSON:', e);
    throw new Error('Respuesta inválida del servidor');
  }
  
  return {
    data: Array.isArray(data) ? data : [],
    status: response.status,
  };
};