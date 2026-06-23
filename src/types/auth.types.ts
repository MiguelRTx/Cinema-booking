export type UserRole = 'ADMIN' | 'CLIENT';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: AuthUser;
  access_token: string;
}
