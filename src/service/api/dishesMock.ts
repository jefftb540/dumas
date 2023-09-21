import { api } from '.';
import { apiRoutes } from '../../routes';
import { Dish } from '../../types/Dish';
import { Locality } from '../../types/Location';
import { Paginated } from '../../types/Paginated';

const mockDish: Dish = {
  id: 'aa242658-0474-4a82-ad74-e88aebaf813a',
  chef_id: '7b7cbc94-b64e-4f2c-bf5d-ca203a6767c7',
  name: 'Fettuccine Alfredo',
  description:
    'Massas largas e achatadas servidas com um molho cremoso e luxuoso feito de manteiga, creme de leite e queijo parmesão ralado.',
  available: true,
  active: true,
  unit_price: 34.99,
  categories: []
};

const mockData: Paginated<Dish> = {
  data: new Array(25).fill(mockDish),
  meta: {
    current_page: 1,
    items_per_page: 25,
    next_page: null,
    previous_page: null,
    total_items: 25,
    total_pages: 1
  }
};
export const getAllDishes = async () => {
  return mockData;
};

export const getFavouriteDishes = async () => {
  return mockData;
};

export const getNearDishes = async (location: Locality) => {
  return mockData;
};

export const getDishesPerChef = async (chefId: string) => {
  return mockData;
};
