export interface User {
  id?: string;
  name?: string;
  email: string;
  [key: string]: any;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}
