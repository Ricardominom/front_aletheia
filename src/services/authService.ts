import { User } from '../types';

export const validateCredentials = (email: string, password: string): boolean => {
  if (!email || !password) return false;
  if (email.length < 3 || password.length < 8) return false;
  return true;
};

export const hasPermission = (user: User | null, requiredRole: 'admin' | 'editor'): boolean => {
  if (!user) return false;
  if (requiredRole === 'editor') return true;
  return user.role === requiredRole;
};