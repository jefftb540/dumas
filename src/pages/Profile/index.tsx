import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../service/api';
import { User } from '../../types/Users';
import { EditProfile } from '../../components/EditProfile';
import { Button } from '../../components/Button';
import { CircularSpinner } from '../../components/CircularSpinner';
import { ContainerProfile, Title3, WrapperModal } from './styled';
import { useAuth } from '../../contexts/authContext';
import { TelephoneProfile } from '../../components/Telephone';
import { useQuery } from 'react-query';
import queryClient from '../../service/reactQuery/queryClient';
import { AddressProfile } from '../../components/Addresses';
Modal.setAppElement('#root');

const getClientData = async () => {
  try {
    const response = await api.get<User>('/clients/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User | null>(null);
  const [nameEmailModalIsOpen, setNameEmailModalIsOpen] = useState(false);
  const [phonesModalIsOpen, setPhonesModalIsOpen] = useState(false);
  const [addressesModalIsOpen, setAddressesModalIsOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState({
    id: '',
    name: '',
    public_place: '',
    zip_code: '',
    number: '',
    neighborhood: ''
  });

  const { user } = useAuth();

  const { data } = useQuery(
    ['profile'],

    getClientData
  );

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

  const handleSubmit = async (values: User) => {
    try {
      const response = await api.put('/clients/update', values);

      if (response && response.data) {
        setClientData(response.data);

        closeNameEmailModal();
        closePhonesModal();
        closeAddressesModal();
      } else {
        console.log('Algo deu errado');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPhoneNumber = async () => {
    try {
      await api.post('/clients/telephones', {
        telephone: {
          number: newPhone
        }
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      closePhonesModal();
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = async () => {
    try {
      await api.post('/clients/addresses', {
        address: newAddress
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      setNewAddress({
        id: '',
        name: '',
        public_place: '',
        zip_code: '',
        number: '',
        neighborhood: ''
      });

      closeAddressesModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerProfile>
      <WrapperModal>
        <div>
          <Modal
            isOpen={nameEmailModalIsOpen}
            onRequestClose={closeNameEmailModal}
            contentLabel="Editar"
          >
            <h2>Editar</h2>
            {clientData ? (
              <EditProfile values={clientData} onSubmit={handleSubmit} />
            ) : (
              <p>
                <CircularSpinner /> Carregando dados...
              </p>
            )}

            <Button
              variant="primary"
              size="medium"
              type="button"
              onClick={closeNameEmailModal}
            >
              Fechar
            </Button>
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
        >
          <h2>Adicionar Telefones</h2>

          <input
            type="text"
            placeholder="Digite um número de telefone"
            value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
          />

          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={addPhoneNumber}
          >
            Adicionar
          </Button>

          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={closePhonesModal}
          >
            Fechar
          </Button>
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
        >
          <h2>Editar Endereços</h2>

          <input
            type="text"
            placeholder="Tipo de endereço"
            value={newAddress.name}
            onChange={e =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="CEP"
            value={newAddress.zip_code}
            onChange={e =>
              setNewAddress({ ...newAddress, zip_code: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Logradouro"
            value={newAddress.public_place}
            onChange={e =>
              setNewAddress({ ...newAddress, public_place: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Número"
            value={newAddress.number}
            onChange={e =>
              setNewAddress({ ...newAddress, number: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bairro"
            value={newAddress.neighborhood}
            onChange={e =>
              setNewAddress({ ...newAddress, neighborhood: e.target.value })
            }
          />

          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={addAddress}
          >
            Adicionar
          </Button>

          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={closeAddressesModal}
          >
            Fechar
          </Button>
        </Modal>

        {clientData ? (
          <div>
            {clientData.addresses?.length &&
              clientData.addresses.map((address, index) => (
                <AddressProfile key={`address_${index}`} address={address} />
              ))}
          </div>
        ) : (
          <p>Carregando dados...</p>
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
      <img src="public/undraw_breakfast_psiw 3.svg" alt="prato" />
    </ContainerProfile>
  );
};
