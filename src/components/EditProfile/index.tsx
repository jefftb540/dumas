import React from 'react';
import { Formik } from 'formik';
import { User } from '../../types/Users';
import { Button } from '../Button';
import { Input } from '../Input';
import { FiMail, FiUser } from 'react-icons/fi';
import { FormContainer } from '../../pages/Login/styled';

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
          <div>
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
          </div>

          <div>
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
          </div>

          <br />
          <Button variant="secondary" size="medium" type="submit">
            Salvar
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};
