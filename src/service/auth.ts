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

    console.log(response);

    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
