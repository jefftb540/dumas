import { Cep } from '../../types/Cep';
import { api } from '../api';
import { Address } from '../../types/Address';
import { apiRoutes } from '../../routes';

export const getAddressByCep = async (cep: string) => {
  const response = await api.get<Cep>(apiRoutes.addresses.cep(cep as string));
  return response.data;
};

export const createAddress = async (address: Address) => {
  try {
    await api.post(apiRoutes.client.addresses, {
      address
    });
  } catch (error) {
    console.log(error);
  }
};
