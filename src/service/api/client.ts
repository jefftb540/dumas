import { User } from '../../types/Users';
import { api } from '../api';

export const getClientData = async () => {
  try {
    const response = await api.get<User>('/clients/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
