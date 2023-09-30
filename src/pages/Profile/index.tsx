import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../service/api';
import { User } from '../../types/Users';
import { EditProfile } from '../../components/EditProfile';
import { Button } from '../../components/Button';
import { CircularSpinner } from '../../components/CircularSpinner';
import { ContainerImg, ContainerProfile, Title3, WrapperModal } from './styled';
import { useAuth } from '../../contexts/authContext';
import { TelephoneProfile } from '../../components/Telephone';
import { useQuery } from 'react-query';
import queryClient from '../../service/reactQuery/queryClient';
import { AddressProfile } from '../../components/Addresses';
import { editClient, getClientData } from '../../service/api/client';
import { createAddress, getAddressByCep } from '../../service/api/address';
import { Address } from '../../types/Address';
import {
  ButtonClose,
  ContainerInput,
  ContainerTitleClose,
  InputModal,
  ModalContent,
  TitleModal
} from '../../components/EditProfile/styled';
import { FiHome, FiPhone, FiXCircle } from 'react-icons/fi';
import { useTheme } from '../../contexts/themeContext';
import { createTelephones } from '../../service/api/telephone';

Modal.setAppElement('#root');

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User | null>(null);
  const [nameEmailModalIsOpen, setNameEmailModalIsOpen] = useState(false);
  const [phonesModalIsOpen, setPhonesModalIsOpen] = useState(false);
  const [addressesModalIsOpen, setAddressesModalIsOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState<Address>({
    id: '',
    name: '',
    public_place: '',
    zip_code: '',
    number: '',
    neighborhood: '',
    city_id: '',
    complement: '',
    reference: ''
  });
  const { theme } = useTheme();
  const { user } = useAuth();
  const { data, isLoading } = useQuery(['profile'], getClientData);

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace(/[^0-9]/g, '');

    if (cleanedCep.length !== 8) {
      alert('CEP deve conter 8 números');
      return;
    }
    try {
      const data = await getAddressByCep(cep);
      setNewAddress(prev => ({
        ...prev,
        city_id: data.city_id,
        neighborhood: data.neighborhood,
        public_place: data.street
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data]);

  function openNameEmailModal() {
    setNameEmailModalIsOpen(true);
  }

  function closeNameEmailModal() {
    setNameEmailModalIsOpen(false);
  }

  function openPhonesModal() {
    setPhonesModalIsOpen(true);
  }

  function closePhonesModal() {
    setPhonesModalIsOpen(false);
  }

  function openAddressesModal() {
    setAddressesModalIsOpen(true);
  }

  function closeAddressesModal() {
    setAddressesModalIsOpen(false);
  }

  const sendEditClient = async (values: User) => {
    try {
      const response = await editClient(values);

      if (response && response) {
        setClientData(response);

        closeNameEmailModal();
      } else {
        console.log('Algo deu errado');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPhoneNumber = async () => {
    try {
      await createTelephones(newPhone);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      closePhonesModal();
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = async () => {
    try {
      await createAddress(newAddress);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      setNewAddress({
        id: '',
        name: '',
        public_place: '',
        zip_code: '',
        number: '',
        neighborhood: '',
        city_id: '',
        complement: '',
        reference: ''
      });

      closeAddressesModal();
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      maxWidth: '500px',
      maxHeight: '470px',
      margin: 'auto',
      padding: '20px',
      backgroundColor: theme === 'light' ? '#FDFDFD' : '#6f6464'
    }
  };
  if (isLoading) {
    return <h2>Carregando Dados...</h2>;
  }
  return (
    <ContainerProfile>
      <WrapperModal>
        <div>
          <Modal
            isOpen={nameEmailModalIsOpen}
            onRequestClose={closeNameEmailModal}
            contentLabel="Editar"
            style={customStyles}
          >
            <ModalContent>
              <ContainerTitleClose>
                <TitleModal>Editar Nome e Email</TitleModal>

                <ButtonClose onClick={closeNameEmailModal}>
                  <FiXCircle />
                </ButtonClose>
              </ContainerTitleClose>

              {clientData ? (
                <EditProfile values={clientData} onSubmit={sendEditClient} />
              ) : (
                <p>
                  <CircularSpinner /> Carregando dados...
                </p>
              )}
            </ModalContent>
          </Modal>

          {clientData ? (
            <div>
              <Title3>{user?.name}</Title3>
              <div>
                <strong>Nome:</strong> {clientData.name}
              </div>
              <div>
                <strong>Email:</strong> {clientData.email}
              </div>
            </div>
          ) : (
            <p>
              <CircularSpinner /> Carregando dados...
            </p>
          )}
        </div>
        <div>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openNameEmailModal}
          >
            Editar
          </Button>
        </div>
      </WrapperModal>
      <WrapperModal>
        <Modal
          isOpen={phonesModalIsOpen}
          onRequestClose={closePhonesModal}
          contentLabel="Adicionar"
          style={customStyles}
        >
          <ModalContent>
            <ContainerTitleClose>
              <TitleModal>Adicionar Telefones</TitleModal>

              <ButtonClose onClick={closePhonesModal}>
                <FiXCircle />
              </ButtonClose>
            </ContainerTitleClose>

            <ContainerInput size="large">
              <FiPhone />
              <InputModal
                type="text"
                placeholder="Digite um número de telefone"
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
              />
            </ContainerInput>

            <Button
              variant="primary"
              size="medium"
              type="button"
              onClick={addPhoneNumber}
            >
              Adicionar
            </Button>
          </ModalContent>
        </Modal>

        {clientData ? (
          <div>
            {clientData.telephones.map((telephone, index) => (
              <TelephoneProfile
                key={`telephone_${index}`}
                telephone={telephone}
              />
            ))}
          </div>
        ) : (
          <p>
            <CircularSpinner /> Carregando dados...
          </p>
        )}
        <div>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openPhonesModal}
          >
            Adicionar
          </Button>
        </div>
      </WrapperModal>

      <WrapperModal>
        <Modal
          isOpen={addressesModalIsOpen}
          onRequestClose={closeAddressesModal}
          contentLabel="Editar Endereços"
          style={customStyles}
        >
          <ModalContent>
            <ContainerTitleClose>
              <TitleModal>Adicionar Endereços</TitleModal>

              <ButtonClose onClick={closeAddressesModal}>
                <FiXCircle />
              </ButtonClose>
            </ContainerTitleClose>

            <ContainerInput size="large">
              <FiHome />
              <InputModal
                type="text"
                placeholder="CEP"
                value={newAddress.zip_code}
                onChange={e => {
                  setNewAddress({ ...newAddress, zip_code: e.target.value });
                }}
                onBlur={e => handleCepChange(e.target.value)}
              />
            </ContainerInput>

            <ContainerInput size="large">
              <FiHome />
              <InputModal
                type="text"
                placeholder="Logradouro"
                value={newAddress.public_place}
                onChange={e =>
                  setNewAddress({ ...newAddress, public_place: e.target.value })
                }
              />
            </ContainerInput>

            <ContainerInput size="large">
              <FiHome />
              <InputModal
                type="text"
                placeholder="Número"
                value={newAddress.number}
                onChange={e =>
                  setNewAddress({ ...newAddress, number: e.target.value })
                }
              />
            </ContainerInput>

            <ContainerInput size="large">
              <FiHome />
              <InputModal
                type="text"
                placeholder="Bairro"
                value={newAddress.neighborhood}
                onChange={e =>
                  setNewAddress({ ...newAddress, neighborhood: e.target.value })
                }
              />
            </ContainerInput>

            <Button
              variant="primary"
              size="medium"
              type="button"
              onClick={() => {
                addAddress();
              }}
            >
              Adicionar
            </Button>
          </ModalContent>
        </Modal>

        {clientData ? (
          <div>
            {clientData.addresses?.length &&
              clientData.addresses.map((address, index) => (
                <AddressProfile key={`address_${index}`} address={address} />
              ))}
          </div>
        ) : (
          <p>
            <CircularSpinner /> Carregando dados...
          </p>
        )}

        <div>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openAddressesModal}
          >
            Adicionar
          </Button>
        </div>
      </WrapperModal>
      <ContainerImg>
        <img src="public/undraw_breakfast_psiw 3.svg" alt="prato" />
      </ContainerImg>
    </ContainerProfile>
  );
};
