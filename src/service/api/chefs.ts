import { api } from '.';
import { apiRoutes } from '../../routes';
import { Chef } from '../../types/Chef';
import { Paginated } from '../../types/Paginated';

export const getAllChefs = async () => {
  const response = await api.get<Paginated<Chef>>(apiRoutes.chefs);

  return response.data;
};
