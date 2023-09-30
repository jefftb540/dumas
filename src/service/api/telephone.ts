
import { api } from '../api';

export const createTelephones = async (newPhone: string) => {
  try {
    await api.post('/clients/telephones', { telephone: { number: newPhone } });
  } catch (error) {
    console.log(error);
  }
};
