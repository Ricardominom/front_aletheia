import { User, ApiResponse, AuthResponse } from '../types';

export async function loginApi(email: string, password: string) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  let data: any = null;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      (data && (data.error || data.message)) ||
      'Error de autenticación'
    );
  }

  if (!data || !data.user) {
    throw new Error('Respuesta inválida del servidor');
  }

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      imageUrl: data.user.imageUrl,
    }
  };
}

export const logout = async (): Promise<ApiResponse<void>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: undefined, status: 200 };
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: MOCK_USER, status: 200 };
};