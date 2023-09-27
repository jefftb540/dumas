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
import { apiRoutes, routes } from '../../routes';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../service/api';
import { useEffect, useState } from 'react';
// import { useEffect } from 'react';
// import { getLocation } from '../../consts/getLocation';

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
  const [cities, setCities] = useState([]);
  const [state, setState] = useState();
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const response = await api.get('/states');
      setStates(response.data.data);
      console.log(response);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const data = await api.get(apiRoutes.state.cities(state), {
        params: { per_page: 226 }
      });
      setCities(data.data.data);
      console.log(data);
    };
    getCities();
  }, [state]);

  // useEffect(() => {
  //   getLocation();
  // }, []);

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

      setFieldValue(
        'addresses_attributes[0].neighborhood',
        response.data.neighborhood
      );
      setFieldValue(
        'addresses_attributes[0].public_place',
        response.data.street
      );
      setCities(prev => [
        ...prev,
        { id: response.data.city_id, name: response.data.city }
      ]);
      setStates(prev => [
        ...prev,
        { id: 'stateFromCep', name: response.data.state }
      ]);
      setFieldValue('addresses_attributes[0].city_id', response.data.city_id);
      setFieldValue('addresses_attributes[0].state', 'stateFromCep');

      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };
  const handleSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    console.log(values);
    next(values, true);
    setSubmitting(false);
    navigate(routes.home);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit} validateOnMount={true}>
      {({ isSubmitting, isValid, setFieldValue }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Endereço</SubTitle>

          <InputContainer>
            <Input
              Icon={FiHome}
              placeholder="CEP"
              name="addresses_attributes[0].zip_code"
              onBlur={e => handleCepChange(e.target.value, setFieldValue)}
            />

            <Input
              Icon={FiHome}
              placeholder="Rua"
              name="addresses_attributes[0].public_place"
            />

            <Input
              Icon={FiHome}
              placeholder="Bairro"
              name="addresses_attributes[0].neighborhood"
            />

            <Input
              Icon={FiHome}
              placeholder="Número"
              name="addresses_attributes[0].number"
            />
            <Input
              Icon={FiHome}
              placeholder="Cidade"
              name="addresses_attributes[0].city_id"
              as="select"
              s
            >
              {cities.length &&
                cities.map(city => (
                  <option value={city.id}>{city.name}</option>
                ))}
            </Input>
            <Input
              onChange={e => setState(e.target.value)}
              Icon={FiHome}
              placeholder="Estado"
              name="addresses_attributes[0].state"
              as="select"
            >
              {states.length &&
                states.map(state => (
                  <option value={state.id}>{state.name}</option>
                ))}
            </Input>

            <Input
              Icon={FiHome}
              placeholder="Referência"
              name="addresses_attributes[0].reference"
            />
            <Input
              Icon={FiHome}
              placeholder="Complemento"
              name="addresses_attributes[0].complement"
            />

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
