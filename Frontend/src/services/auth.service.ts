import { axiosInstance } from '@/lib/axios';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth';
import { handleAuthSuccess } from '@/lib/auth';

export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/login', data);
    handleAuthSuccess(response.data);
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/register', data);
    handleAuthSuccess(response.data);
    return response.data;
  }
};
