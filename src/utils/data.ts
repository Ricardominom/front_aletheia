export const generateRandomProgress = (): number => {
  return Number((Math.random() * (35 - 20) + 20).toFixed(2));
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export function formatPercentage(value: unknown): string {
  if (typeof value !== 'number' || !isFinite(value)) return '—';
  return value.toFixed(2) + '%';
}

// Utilidad para acceder seguro a propiedades anidadas (opcional)
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj ? obj[key] : undefined;
}