import axios from 'axios';
import { Cep } from '../../types/Cep';
import { api } from '../api';
import { Address } from '../../types/Address';

const accessKey = import.meta.env.VITE_IPAPI_KEY;
export const getLocationWithIPAddress = async () => {
  try {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
      params: {
        apiKey: accessKey
      }
    });
    console.log(response);
    return { lat: response.data.latitude, lng: response.data.longitude };
  } catch (error) {
    console.log(error);
  }
};
export const getAddressByCep = async (cep: string) => {
  const response = await api.get<Cep>(`/addresses/search_zip_code/${cep}`);
  return response.data;
};

export const createAddress = async (address: Address) => {
  await api.post('/clients/addresses', {
    address
  });
};
