import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../service/api';
import { User } from '../../types/Users';
import { EditProfile } from '../../components/EditProfile';
import { Button } from '../../components/Button';
Modal.setAppElement('#root');

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User | null>(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  function openModal() {
    setIsOpen(true);
    setIsEditing(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsEditing(false);
  }

  const handleSubmit = async (values: User) => {
    try {
      const response = await api.put('/clients/update', values);

      if (response && response.data) {
        setClientData(response.data);
        setIsEditing(false);
        setIsOpen(false);
      } else {
        console.log('Algo deu muito errado');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={closeModal}
        >
          Cancelar Edição
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={openModal}
        >
          Editar
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Dados"
      >
        <h2>Editar Dados</h2>
        {clientData ? (
          <EditProfile values={clientData} onSubmit={handleSubmit} />
        ) : (
          <p>Carregando dados...</p>
        )}

        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={closeModal}
        >
          Fechar
        </Button>
      </Modal>
      {clientData ? (
        <div>
          <div>
            <strong>Nome:</strong> {clientData.name}
          </div>
          <div>
            <strong>Email:</strong> {clientData.email}
          </div>
          <div>
            <h3>Telefones:</h3>
            {clientData.telephones.map(telephone => (
              <div key={telephone.id}>
                <strong>Número:</strong> {telephone.number}
              </div>
            ))}
          </div>
          <br />
          <div>
            <h3>Endereços:</h3>
            {clientData.addresses?.length &&
              clientData.addresses.map(address => (
                <div key={address.id}>
                  {address.name}
                  <br />
                  <strong>Endereço:</strong> {address.public_place},{' '}
                  {address.number}
                  <br />
                  <strong>CEP:</strong> {address.zip_code}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};
