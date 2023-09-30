import { api } from '../api';
import { apiRoutes } from '../../routes';
import { Dish } from '../../types/Dish';
import { Locality } from '../../types/Location';
import { Paginated } from '../../types/Paginated';
import { Rating } from '../../types/Rating';

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

export const searchDishes = async (query: string, page = 1, perPage = 4) => {
  const response = await api.get<Paginated<Dish>>(apiRoutes.dishes, {
    params: {
      page,
      per_page: perPage,
      active: true,
      available: true,
      term: query
    }
  });

  return response.data;
};

export const likeDish = async (dishId: string) => {
  await api.put(apiRoutes.dish.like(dishId));
};

export const dislikeDish = async (dishId: string) => {
  await api.put(apiRoutes.dish.dislike(dishId));
};

export const getDishId = async (dishId: string) => {
  const response = await api.get<Dish>(apiRoutes.dish.detail(dishId));

  return response.data;
};

export const rateDish = async (rating: Rating) => {
  rating.dishId &&
    (await api.post(apiRoutes.dish.rate(rating.dishId), { rating }));
};
