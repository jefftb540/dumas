import React from 'react';
import { Formik } from 'formik';
import { User } from '../../types/Users';
import { Button } from '../Button';
import { Input } from '../Input';
import { FiUser } from 'react-icons/fi';
import { FormContainer, InputContainer } from '../../pages/Login/styled';
import { Telephone } from '../../types/Telephone';

export interface EditTelephonesProps {
  values: Telephone;
  onSubmit: (values: Telephone) => Promise<void>;
}

export const EditProfile: React.FC<EditTelephonesProps> = ({
  values,
  onSubmit
}) => {
  const handleSubmit = async (values: Telephone) => {
    await onSubmit(values);
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur }) => (
        <FormContainer>
          <InputContainer>
            <Input
              Icon={FiUser}
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              onChange={handleChange}
              onBlur={handleBlur}
              value={telephones[0].number}
            />
          </InputContainer>

          <br />
          <Button variant="secondary" size="medium" type="submit">
            Salvar
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};
