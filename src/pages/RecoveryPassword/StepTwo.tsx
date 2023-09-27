import { useState } from 'react';
import { Formik } from 'formik';
import { FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from './styled';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DefaultLink } from '../../components/DefaultLink';
import * as Yup from 'yup';
import { handleResetPassword } from '../../service/api/auth';
import { handleResetPasswordErrors } from '../../utils/handleResetPasswordErros';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from '../../routes';

interface FormResetProps {
  token: string;
  password: string;
  passwordConfirm: string;
}

export const StepTwo = ({
  resetPasswordToken
}: {
  resetPasswordToken: string;
}) => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    token: resetPasswordToken,
    password: '',
    passwordConfirm: ''
  };

  const validationSchema = Yup.object().shape({
    token: Yup.string().required('O token é obrigatório.'),
    password: Yup.string()
      .required('A nova senha é obrigatória.')
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        'A senha deve conter pelo menos uma letra maiúscula e um número, e ter no mínimo 6 caracteres.'
      ),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem.')
      .required('A confirmação de senha é obrigatória.')
  });

  const onSubmit = async (values: FormResetProps) => {
    try {
      setIsLoading(true);

      await handleResetPassword(values);

      toast.success('Senha redefinida com sucesso!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
      const errorMessage = handleResetPasswordErrors(error as AxiosError);
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ isSubmitting, errors, touched, isValid }) => (
        <FormContainer>
          <Title>Esqueci minha senha</Title>
          <SubTitle>Recuperar minha senha</SubTitle>
          <InputContainer>
            <Input Icon={FiLock} placeholder="Código" name="token" />
            {touched.token && errors.token && (
              <MessageErrorsContainer>{errors.token}</MessageErrorsContainer>
            )}

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Input
              Icon={FiLock}
              placeholder="Nova senha"
              type="password"
              name="password"
            />
            {touched.password && errors.password && (
              <MessageErrorsContainer>{errors.password}</MessageErrorsContainer>
            )}

            <Input
              Icon={FiLock}
              placeholder="Confirme senha"
              type="password"
              name="passwordConfirm"
            />
            {touched.passwordConfirm && errors.passwordConfirm && (
              <MessageErrorsContainer>
                {errors.passwordConfirm}
              </MessageErrorsContainer>
            )}

            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={loading}
            >
              Definir nova senha
            </Button>
          </InputContainer>

          <DefaultLink variant="primary" to={routes.login}>
            Voltar
          </DefaultLink>
        </FormContainer>
      )}
    </Formik>
  );
};
