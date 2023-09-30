import { Formik } from 'formik';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { StepProps } from '.';
import { Button } from '../../components/Button';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';
import { messageErrors } from '../../consts/messageErrors';
import * as Yup from 'yup';

export const StepOne: React.FC<StepProps> = ({ next, data }) => {
  const { signUp, error } = useAuth();

  const handleSubmit = (values: User) => {
    signUp(values);
    console.log(values);
  };

  const handleContinueToAddress = async (values: User) => {
    next(values);
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .required(messageErrors.name.required)
      .test(messageErrors.name.test, messageErrors.name.invalid, value => {
        const names = value.split(' ');
        return names.length >= 2;
      }),
    email: Yup.string()
      .email(messageErrors.email.invalid)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        messageErrors.email.invalid
      )
      .required(messageErrors.email.required),
    password: Yup.string()
      .min(6, messageErrors.password.invalid)
      .required(messageErrors.password.required),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], messageErrors.password_confirm.invalid)
      .required(messageErrors.password_confirm.required)
  });

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={validation}
    >
      {({ values, isSubmitting, isValid, touched, errors }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Informações pessoais</SubTitle>

          <InputContainer>
            <Input Icon={FiUser} placeholder="Nome e Sobrenome" name="name" />

            {touched.name && errors.name && (
              <MessageErrorsContainer>{errors.name}</MessageErrorsContainer>
            )}

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

            <Input
              placeholder="Confirmar senha"
              type="password"
              name="password_confirmation"
              Icon={FiLock}
            />

            {touched.password_confirmation && errors.password_confirmation && (
              <MessageErrorsContainer>
                {errors.password_confirmation}
              </MessageErrorsContainer>
            )}

            <Input
              placeholder="Telefone"
              type="phone"
              name="telephones_attributes[0].number"
              Icon={FiPhone}
            />
            {error && <MessageErrorsContainer>{error}</MessageErrorsContainer>}

            <WrapperButton>
              <Button
                variant="primary"
                size="large"
                disabled={isSubmitting || !isValid}
                onClick={() => handleContinueToAddress(values)}
                type="submit"
              >
                Continuar para endereço
              </Button>

              <Button
                variant="secondary"
                size="large"
                disabled={isSubmitting || !isValid}
                type="submit"
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
