import { Address } from './Adress';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  telephones_attributes: [{ number: number }];
  addresses_attributes: Address[];
}
