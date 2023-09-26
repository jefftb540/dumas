import { User } from '../../types/Users';
import { api } from '../api';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export interface ForgotPasswordProps {
  email: string;
  reset_password_token?: string;
  password?: string;
  password_confirmation?: string;
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

export async function handleSignup({
  name,
  email,
  password,
  password_confirmation,
  telephones_attributes
}: User) {
  try {
    const response = await api.post('/registrations/signup', {
      user: {
        name,
        email,
        password,
        password_confirmation,
        telephones_attributes
      }
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const handleForgotPassword = async ({ email }: ForgotPasswordProps) => {
  const response = await api.post('/passwords/token', {
    email
  });

  const { data } = response;
  return data;
};

export const handleResetPassword = async ({
  reset_password_token,
  password,
  password_confirmation
}: ForgotPasswordProps) => {
  const response = await api.put('/passwords/reset', {
    reset_password_token,
    password,
    password_confirmation
  });

  const { data } = response;
  return data;
};
