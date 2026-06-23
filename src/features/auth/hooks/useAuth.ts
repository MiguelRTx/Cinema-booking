import { useMutation, useQueryClient } from '@tanstack/react-query'; // Importamos useQueryClient
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';
import { authService } from '../services/auth.service';
import { decodeJwt } from '../../../utils/jwt.utils';
import type { LoginRequest, RegisterRequest, AuthUser } from '../../../types/auth.types';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../../types/api.types';

interface JwtPayload {
  sub: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
}

function extractErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiError>;
  const msg = axiosError?.response?.data?.message;
  if (Array.isArray(msg)) return msg[0];
  return msg || 'Ocurrió un error inesperado';
}

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      const token = response.access_token;
      const payload = decodeJwt<JwtPayload>(token);
      if (!payload) return;

      const user: AuthUser = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      setAuth(user, token);


      queryClient.clear();

      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      const { user, access_token } = response;
      setAuth(user, access_token);
      
      queryClient.clear();
      
      navigate('/');
    },
  });
}

export { extractErrorMessage };