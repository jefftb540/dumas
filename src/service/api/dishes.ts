import { api } from '../api';
import { apiRoutes } from '../../routes';
import { Dish } from '../../types/Dish';
import { Locality } from '../../types/Location';
import { Paginated } from '../../types/Paginated';

export const getAllDishes = async (page = 1, perPage = 25) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: { active: true, available: true, page, per_page: perPage }
  });

  return response.data;
};

export const getFavouriteDishes = async (page = 1, perPage = 25) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: {
      active: true,
      available: true,
      favorites: true,
      page,
      per_page: perPage
    }
  });

  return response.data;
};

export const getNearDishes = async (
  location: Locality,
  page = 1,
  perPage = 25
) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: {
      active: true,
      available: true,
      latitude: location.latitude,
      longitude: location.longitude,
      page,
      per_page: perPage
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

export const searchDishes = async (query: string, page = 1, perPage = 3) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: {
      page,
      per_page: perPage,
      active: true,
      available: true,
      name: query
    }
  });

  return response.data;
};

export const likeDish = (dishId: string) => {
  api.put(apiRoutes.dish.like(dishId));
};

export const dislikeDish = (dishId: string) => {
  api.put(apiRoutes.dish.dislike(dishId));
};
