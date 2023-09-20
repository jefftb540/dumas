import { Category } from './Category';

export interface Dish {
  id: string;
  chef_id: string;
  name: string;
  description: string;
  available: boolean;
  active: boolean;
  unit_price: number;
  categories: Category[];
}
