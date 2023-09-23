import { api } from '../api';
import { apiRoutes } from '../../routes';
import { Dish } from '../../types/Dish';
import { Locality } from '../../types/Location';
import { Paginated } from '../../types/Paginated';

export const getAllDishes = async () => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: { active: true, available: true }
  });

  return response.data;
};

export const getFavouriteDishes = async () => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: { active: true, available: true, favorites: true }
  });

  return response.data;
};

export const getNearDishes = async (location: Locality) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: {
      active: true,
      available: true,
      latitude: location.latitude,
      longitude: location.longitude
    }
  });

  return response.data;
};

export const getDishesPerChef = async (chefId: string) => {
  const response = await api.get<Paginated<Dish>>(
    apiRoutes.chef.dishes(chefId),
    {
      params: { active: true, available: true }
    }
  );

  return response.data;
};

export const likeDish = (dishId: string) => {
  api.put(apiRoutes.dish.like(dishId));
};
export const dislikeDish = (dishId: string) => {
  api.put(apiRoutes.dish.dislike(dishId));
};
