import Cookies from 'js-cookie';
import { AuthResponse, User } from '@/types/auth';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};

export const setUser = (user: User) => {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  try {
    const cookieUser = Cookies.get(USER_KEY);
    if (cookieUser) return JSON.parse(cookieUser);
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem(USER_KEY);
      if (localUser) return JSON.parse(localUser);
    }
  } catch (e) {
    // ignore parse error
  }
  return null;
};

export const handleAuthSuccess = (data: AuthResponse) => {
  if (data.token) {
    setToken(data.token);
  }
  if (data.user) {
    setUser(data.user);
  }
};
