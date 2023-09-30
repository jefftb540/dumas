import { Address } from './Address';
import { Telephone } from './Telephone';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  telephones: Telephone[];
  addresses?: Address[];
}
