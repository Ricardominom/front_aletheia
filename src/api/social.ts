import { SocialMetrics, ApiResponse } from "../types";

const MOCK_SOCIAL_METRICS: SocialMetrics = {
  mentions: 0,
  impressions: 0,
  witnesses: [
    {
      username: "@usuario1",
      content: "Gran evento hoy en la plaza principal.",
      timestamp: "2025-03-22T14:30:00Z",
    },
    {
      username: "@usuario2",
      content: "Las propuestas presentadas hoy son muy interesantes.",
      timestamp: "2025-03-22T14:35:00Z",
    },
    {
      username: "@usuario3",
      content: "Excelente participación en el debate de hoy.",
      timestamp: "2025-03-22T14:40:00Z",
    },
  ],
};

export const getSocialMetrics = async (): Promise<
  ApiResponse<SocialMetrics>
> => {
  const response = await fetch("/api/escucha");
  if (!response) {
    throw new Error("Error al obtener la escucha social");
  }
  const data = await response.json();
  return {
    data: {
      ...data,
      witnesses: [...MOCK_SOCIAL_METRICS.witnesses, ...(data.witnesses || [])],
    },
    status: 200,
  };
};
