import { useState } from 'react';
import { Formik } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../contexts/authContext';
import { routes } from '../../routes';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  Paragrafo,
  SubTitle,
  Title
} from './styled';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DefaultLink } from '../../components/DefaultLink';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';

interface FormLoginProps {
  email: string;
  password: string;
}

export const initialValues = {
  email: '',
  password: ''
};

export const Login = () => {
  const { signIn, error } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormLoginProps) => {
    try {
      setIsLoading(true);
      await signIn(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(messageErrors.email.invalid)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        messageErrors.email.invalid
      )
      .required(messageErrors.email.required),
    password: Yup.string()
      .min(6, messageErrors.password.invalid)
      .required(messageErrors.password.required)
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation}
      validateOnMount={true}
    >
      {({ isSubmitting, errors, touched, isValid }) => (
        <FormContainer>
          <Title>Login</Title>
          <SubTitle>Entre e faça seu pedido</SubTitle>

          <InputContainer>
            <Input Icon={FiMail} placeholder="Email" name="email" />
            {touched.email && errors.email && (
              <MessageErrorsContainer>{errors.email}</MessageErrorsContainer>
            )}

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              Icon={FiLock}
            />
            {touched.password && errors.password && (
              <MessageErrorsContainer>{errors.password}</MessageErrorsContainer>
            )}
            {error && <MessageErrorsContainer>{error}</MessageErrorsContainer>}

            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={loading}
            >
              Entrar
            </Button>
          </InputContainer>

          <DefaultLink variant="secondary" to={routes.recoverPassword}>
            Esqueceu sua senha
          </DefaultLink>

          <Paragrafo>
            Não possui conta? Então
            <DefaultLink variant="primary" to={routes.signUp.profile}>
              Faça seu cadastro.
            </DefaultLink>
          </Paragrafo>
        </FormContainer>
      )}
    </Formik>
  );
};
