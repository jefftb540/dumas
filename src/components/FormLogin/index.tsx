import { useState } from 'react';
// import { AuthFormLayout } from '../components/AuthFormLayout';
import { Formik } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../contexts/authContext';
import { Input } from '../Input';
import { Button } from '../Button';
import { DefaultLink } from '../DefaultLink';
import { routes } from '../../routes';
import { FormContainer, InputContainer, Title } from './styled';

interface FormLoginProps {
  email: string;
  password: string;
}

export const initialValues = {
  email: '',
  password: ''
};

export const FormLogin = ({ email, password }: FormLoginProps) => {
  const { signIn } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await signIn({ email, password });
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
          <span>Entre e faça seu pedido</span>

          <InputContainer>
            <Input Icon={FiMail} placeholder="Email" value={email} />
          </InputContainer>

          <InputContainer>
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              Icon={FiLock}
            />
          </InputContainer>

          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
            loading={loading}
          >
            Entrar
          </Button>

          <DefaultLink variant="primary" to={routes.recoverPassword}>
            Esqueceu sua senha
          </DefaultLink>

          <span>
            Não possui conta? Então
            <DefaultLink variant="primary" to={routes.signUp.profile}>
              faça seu cadastro
            </DefaultLink>
          </span>
        </FormContainer>
      )}
    </Formik>
  );
};
