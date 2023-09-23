import { useState } from 'react';
import { Formik } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../contexts/authContext';
import { routes } from '../../routes';
import {
  FormContainer,
  InputContainer,
  Paragrafo,
  SubTitle,
  Title
} from './styled';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DefaultLink } from '../../components/DefaultLink';

interface FormLoginProps {
  email: string;
  password: string;
}

export const initialValues = {
  email: '',
  password: ''
};

export const Login = () => {
  const { signIn } = useAuth();
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormContainer>
          <Title>Login</Title>
          <SubTitle>Entre e faça seu pedido</SubTitle>

          <InputContainer>
            <Input Icon={FiMail} placeholder="Email" name="email" />

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              Icon={FiLock}
            />

            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting}
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
              faça seu cadastro
            </DefaultLink>
          </Paragrafo>
        </FormContainer>
      )}
    </Formik>
  );
};
