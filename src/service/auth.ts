import { api } from './api';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export const handleLogin = async ({ email, password }: LoginProps) => {
  try {
    const response = await api.post('/sessions/login', {
      session: {
        email,
        password
      }
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (token: string) => {
  const response = await api.post('/sessions/refresh', {
    auth: { refresh_token: token }
  });

  return response.data;
};
