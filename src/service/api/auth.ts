import { User } from '../../types/Users';
import { api } from '../api';

interface LoginResponseProps {
  user: User;
  access_token: string;
  refresh_token: string;
}

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
  const response = await api.post<LoginResponseProps>('/sessions/refresh', {
    refresh_token: token
  });

  return response.data;
};

export async function handleSignup({
  name,
  email,
  password,
  password_confirmation,
  telephones_attributes,
  addresses_attributes
}: User) {
  try {
    const response = await api.post<LoginResponseProps>(
      '/registrations/signup',
      {
        user: {
          name,
          email,
          password,
          password_confirmation,
          telephones_attributes,
          addresses_attributes
        }
      }
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
}
