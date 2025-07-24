export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  imageUrl: string;
}

export interface Campaign {
  id: string;
  name: string;
  progress: number;
  trend: "up" | "down";
  startDate: string;
  endDate: string;
  budget: {
    planned: number;
    executed: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SocialMetrics {
  mentions: number;
  impressions: number;
  reputation: number;
  notes: number;
  witnesses: Array<{
    username: string;
    content: string;
    timestamp: string;
  }>;
}

export interface OperationMetric {
  area: string;
  progress: number;
  content: {
    current: number;
    target: number;
  };
  impressions: {
    current: number;
    target: number;
  };
}
