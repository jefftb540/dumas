import { apiRoutes } from '../../routes';
import { Order } from '../../types/Order';
import { api } from '../api';

export const createOrder = async (order: Order) => {
  await api.post(apiRoutes.order.create, order);
};
