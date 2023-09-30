import { apiRoutes } from '../../routes';
import { api } from '../api';

export const createTelephones = async (newPhone: string) => {
  try {
    await api.post(apiRoutes.client.telephone, {
      telephone: { number: newPhone }
    });
  } catch (error) {
    console.log(error);
  }
};
