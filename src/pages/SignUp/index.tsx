import { useState } from 'react';
import { Formik } from 'formik';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
// import { useAuth } from '../../contexts/authContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
// import * as Yup from 'yup';
// import { messageErrors } from '../../consts/messageErrors';
import { User } from '../../types/Users';
import { handleSignup } from '../../service/api/auth';
import {
  FormContainer,
  InputContainer,
  // MessageErrorsContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { WrapperButton } from './styled';

export const initialValues = {
  id: '',
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  telephones_attributes: []
};

export const SignUp = () => {
  // const { error } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const onSubmit = async (values: User) => {
    try {
      setIsLoading(true);
      await handleSignup(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const validation = Yup.object().shape({
  //   email: Yup.string()
  //     .email(messageErrors.email.invalid)
  //     .matches(
  //       /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //       messageErrors.email.invalid
  //     )
  //     .required(messageErrors.email.required),
  //   password: Yup.string()
  //     .min(6, messageErrors.password.invalid)
  //     .required(messageErrors.password.required)
  // });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={validation}
      validateOnMount={true}
    >
      {({ isSubmitting, isValid }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Informações pessoais</SubTitle>

          <InputContainer>
            <Input Icon={FiUser} placeholder="Nome e Sobrenome" name="name" />

            <Input Icon={FiMail} placeholder="Email" name="email" />

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              Icon={FiLock}
            />

            <Input
              placeholder="Confirmar senha"
              type="password"
              name="password_confirmation"
              Icon={FiLock}
            />

            <Input
              placeholder="Telefone"
              type="phone"
              name="telephones_attributes"
              Icon={FiPhone}
            />

            <WrapperButton>
              <Button
                variant="primary"
                size="large"
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={loading}
              >
                Continuar para endereço
              </Button>

              <Button
                variant="secondary"
                size="large"
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={loading}
              >
                Continuar sem endereço
              </Button>
            </WrapperButton>
          </InputContainer>
        </FormContainer>
      )}
    </Formik>
  );
};
