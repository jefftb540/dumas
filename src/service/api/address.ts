import { Cep } from '../../types/Cep';
import { api } from '../api';
import { Address } from '../../types/Address';

export const getAddressByCep = async (cep: string) => {
  const response = await api.get<Cep>(`/addresses/search_zip_code/${cep}`);
  return response.data;
};

export const createAddress = async (address: Address) => {
  await api.post('/clients/addresses', {
    address
  });
};
