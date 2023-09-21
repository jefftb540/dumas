import { routes } from '../../routes';
import { api } from '../api';

export interface LoginProps {
  email: string;
  password: string;
}

export const handleLogin = async ({ email, password }: LoginProps) => {
  try {
    const response = await api.post(routes.login, {
      email,
      password
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
