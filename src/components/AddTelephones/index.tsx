import React from 'react';
import { Button } from '../Button';
import { Telephone } from '../../types/Telephone';

export interface AddTelephonesProps {
  values: Telephone;
  onSubmit: (values: Telephone) => Promise<void>;
}

export const AddTelephones: React.FC<AddTelephonesProps> = ({}) => {
  return (
   
  );
};
