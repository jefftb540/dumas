import { Formik, FormikHelpers } from 'formik';
import { StepProps } from '.';
import {
  FormContainer,
  InputContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { FiUser, FiMail } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { User } from '../../types/Users';

export const StepTwo: React.FC<StepProps> = ({ next, data }) => {
  const navigate = useNavigate();
  const handleSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    next(values, true);
    setSubmitting(false);
    navigate(routes.login);
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

            <WrapperButton>
              <Button
                variant="secondary"
                size="large"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Ir para Login
              </Button>
            </WrapperButton>
          </InputContainer>
        </FormContainer>
      )}
    </Formik>
  );
};
