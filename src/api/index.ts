export const API_BASE_URL = 'https://api.example.com/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  CAMPAIGNS: {
    BASE: '/campaigns',
    METRICS: '/campaigns/metrics',
    PROGRESS: '/campaigns/progress',
  },
  OPERATIONS: {
    BASE: '/operations',
    METRICS: '/operations/metrics',
  },
  SOCIAL: {
    METRICS: '/social/metrics',
    WITNESSES: '/social/witnesses',
  },
} as const;