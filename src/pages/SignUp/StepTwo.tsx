import { Formik, FormikErrors, FormikHelpers } from 'formik';
import { StepProps } from '.';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { FiHome } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../service/api';

interface Cep {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  locatinn: {
    type: string;
    coordinntes: {
      latitude: number;
      longitude: number;
    };
  };
  city_id: string;
}

export const StepTwo: React.FC<StepProps> = ({ next, data }) => {
  const { error } = useAuth();
  const navigate = useNavigate();

  const handleCepChange = async (
    cep: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<User>>
  ) => {
    const cleanedCep = cep.replace(/[^0-9]/g, '');

    if (cleanedCep.length !== 8) {
      alert('CEP deve conter 8 números');
      return;
    }
    try {
      const response = await api.get<Cep>(`/addresses/search_zip_code/${cep}`);

      const { data } = response;

      setFieldValue('zip_code', response.data.cep);
      setFieldValue('state', response.data.state);
      setFieldValue('neighborhood', response.data.neighborhood);
      setFieldValue('public_place', response.data.street);
      setFieldValue('city', response.data.city);

      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };
  const handleSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    next(values, true);
    setSubmitting(false);
    navigate(routes.home);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit} validateOnMount={true}>
      {({ isSubmitting, isValid, setFieldValue }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Informações pessoais</SubTitle>

          <InputContainer>
            <Input
              Icon={FiHome}
              placeholder="CEP"
              name="cep"
              onBlur={e => handleCepChange(e.target.value, setFieldValue)}
            />

            <Input Icon={FiHome} placeholder="Rua" name="public_place" />

            <Input Icon={FiHome} placeholder="Bairro" name="neighborhood" />

            <Input Icon={FiHome} placeholder="Número" name="number" />
            <Input Icon={FiHome} placeholder="Cidade" name="city" />
            <Input Icon={FiHome} placeholder="Estado" name="state" />

            <Input Icon={FiHome} placeholder="Referência" name="reference" />
            <Input Icon={FiHome} placeholder="Complemento" name="complement" />

            {error && <MessageErrorsContainer>{error}</MessageErrorsContainer>}

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
