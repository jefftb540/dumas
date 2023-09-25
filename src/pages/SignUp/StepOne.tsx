import { Formik } from 'formik';
import {
  FormContainer,
  InputContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { StepProps } from '.';
import { Button } from '../../components/Button';
import { User } from '../../types/Users';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';

export const StepOne: React.FC<StepProps> = ({ next, data }) => {
  const navigate = useNavigate();
  const handleSubmit = (values: User) => {
    next(values);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit} validateOnMount={true}>
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
                onSubmit={() => handleSubmit}
              >
                Continuar para endereço
              </Button>

              <Button
                variant="secondary"
                size="large"
                type="submit"
                disabled={isSubmitting || !isValid}
                onClick={() => {
                  navigate(routes.login);
                }}
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
