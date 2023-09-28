import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../service/api';
import { User } from '../../types/Users';
import { EditProfile } from '../../components/EditProfile';
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
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async () => {
    try {
      const response = await api.put('/clients/update', {});

      if (response && response.data) {
        setIsEditing(false);
        setIsOpen(false);
      } else {
        console.log('Algo deu muito errado');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO erro 400

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Dados"
      >
        <h2>Editar Dados</h2>
        {clientData ? (
          <EditProfile initialValues={clientData} onSubmit={handleSubmit} />
        ) : (
          <p>Carregando dados...</p>
        )}

        <button type="button" onClick={closeModal}>
          Fechar
        </button>
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
            <h3>Endereços:</h3>
            {clientData.addresses.map(address => (
              <div key={address.id}>
                {address.name}
                <strong>Endereço:</strong> {address.public_place},{' '}
                {address.number}
                <br />
                <strong>CEP:</strong> {address.zip_code}
              </div>
            ))}
          </div>
          <div>
            <h3>Telefones:</h3>
            {clientData.telephones.map(telephone => (
              <div key={telephone.id}>
                <strong>Número:</strong> {telephone.number}
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
