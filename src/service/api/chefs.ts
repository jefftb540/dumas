import { api } from '../api';
import { apiRoutes } from '../../routes';
import { Chef } from '../../types/Chef';
import { Paginated } from '../../types/Paginated';

export const getAllChefs = async () => {
  const response = await api.get<Paginated<Chef>>(apiRoutes.chefs);

  return response.data;
};

// export const searchChefs = async (query: string) => {
//   const response = await api.get<Paginated<Chef>>(apiRoutes.chefs, {
//     params: { active: true, available: true, name: query, description: query }
//   });

//   return response.data;
// };
