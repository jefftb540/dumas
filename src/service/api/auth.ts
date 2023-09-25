import { api } from '../api';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export const handleLogin = async ({ email, password }: LoginProps) => {
  const response = await api.post('/sessions/login', {
    session: {
      email,
      password
    }
  });

  const { data } = response;
  return data;
};

export const refreshToken = async (token: string) => {
  const response = await api.post('/sessions/refresh', {
    refresh_token: token
  });

  return response.data;
};
