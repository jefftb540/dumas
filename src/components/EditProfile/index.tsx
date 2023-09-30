import React from 'react';
import { Formik } from 'formik';
import { User } from '../../types/Users';
import { Input } from '../Input';
import { FiMail, FiUser } from 'react-icons/fi';
import { FormContainer, InputContainer } from '../../pages/Login/styled';
import { Button } from '../Button';

export interface EditProfileProps {
  values: User;
  onSubmit: (values: User) => Promise<void>;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  values,
  onSubmit
}) => {
  const handleSubmit = async (values: User) => {
    await onSubmit(values);
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur }) => (
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
              value={values.name}
            />

            <Input
              Icon={FiMail}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </InputContainer>

          <br />
          <Button variant="primary" size="medium" type="submit">
            Salvar
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};
