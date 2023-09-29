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
Modal.setAppElement('#root');

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User | null>(null);
  const [nameEmailModalIsOpen, setNameEmailModalIsOpen] = useState(false);
  const [phonesModalIsOpen, setPhonesModalIsOpen] = useState(false);
  const [addressesModalIsOpen, setAddressesModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getClientData = async () => {
      try {
        const response = await api.get('/clients/me');
        if (response && response.data) {
          const { data } = response;
          setClientData(data);
        } else {
          console.log('Algo deu errado');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getClientData();
  }, []);

  function openNameEmailModal() {
    setNameEmailModalIsOpen(true);
    setIsEditing(true);
  }

  function closeNameEmailModal() {
    setNameEmailModalIsOpen(false);
    setIsEditing(false);
  }

  function openPhonesModal() {
    setPhonesModalIsOpen(true);
    setIsEditing(true);
  }

  function closePhonesModal() {
    setPhonesModalIsOpen(false);
    setIsEditing(false);
  }

  function openAddressesModal() {
    setAddressesModalIsOpen(true);
    setIsEditing(true);
  }

  function closeAddressesModal() {
    setAddressesModalIsOpen(false);
    setIsEditing(false);
  }

  const handleSubmit = async (values: User) => {
    try {
      const response = await api.put('/clients/update', values);

      if (response && response.data) {
        setClientData(response.data);
        setIsEditing(false);
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
          contentLabel="Editar Telefones"
        >
          <h2>Editar Telefones</h2>

          <p>Conteúdo do modal para Telefones</p>

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
            Editar
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
          <p>Conteúdo do modal para Endereços</p>

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
              clientData.addresses.map(address => (
                <div key={address.id}>
                  {address.name}
                  <br />
                  <Title3>Endereços</Title3>
                  <strong>Endereço:</strong> {address.public_place},{' '}
                  {address.number}
                  <br />
                  <strong>CEP:</strong> {address.zip_code}
                </div>
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
            Editar
          </Button>
        </div>
      </WrapperModal>
      <img src="public/undraw_breakfast_psiw 3.svg" alt="prato" />
    </ContainerProfile>
  );
};
