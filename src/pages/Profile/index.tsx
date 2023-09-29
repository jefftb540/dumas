// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import { api } from '../../service/api';
// import { User } from '../../types/Users';
// import { EditProfile } from '../../components/EditProfile';
// import { Button } from '../../components/Button';
// import { CircularSpinner } from '../../components/CircularSpinner';
// Modal.setAppElement('#root');

// export const Profile: React.FC = () => {
//   const [clientData, setClientData] = useState<User | null>(null);
//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const getClientData = async () => {
//       try {
//         const response = await api.get('/clients/me');
//         if (response && response.data) {
//           const { data } = response;
//           setClientData(data);
//         } else {
//           console.log('Algo deu errado');
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getClientData();
//   }, []);

//   function openModal() {
//     setIsOpen(true);
//     setIsEditing(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//     setIsEditing(false);
//   }

//   const handleSubmit = async (values: User) => {
//     try {
//       const response = await api.put('/clients/update', values);

//       if (response && response.data) {
//         setClientData(response.data);
//         setIsEditing(false);
//         setIsOpen(false);
//       } else {
//         console.log('Algo deu muito errado');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <Button
//           variant="secondary"
//           size="medium"
//           type="button"
//           onClick={closeModal}
//         >
//           Cancelar Edição
//         </Button>
//       ) : (
//         <Button
//           variant="secondary"
//           size="medium"
//           type="button"
//           onClick={openModal}
//         >
//           Editar
//         </Button>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Editar Dados"
//       >
//         <h2>Editar Dados</h2>
//         {clientData ? (
//           <EditProfile values={clientData} onSubmit={handleSubmit} />
//         ) : (
//           <p>
//             <CircularSpinner /> Carregando dados...
//           </p>
//         )}

//         <Button
//           variant="secondary"
//           size="medium"
//           type="button"
//           onClick={closeModal}
//         >
//           Fechar
//         </Button>
//       </Modal>
//       {clientData ? (
//         <div>
//           <div>
//             <strong>Nome:</strong> {clientData.name}
//           </div>
//           <div>
//             <strong>Email:</strong> {clientData.email}
//           </div>
//           <div>
//             <h3>Telefones:</h3>
//             {clientData.telephones.map((telephone, index) => (
//               <div key={index}>
//                 <strong>Número:</strong> {telephone.number}
//               </div>
//             ))}
//           </div>
//           <br />
//           <div>
//             <h3>Endereços:</h3>
//             {clientData.addresses?.length &&
//               clientData.addresses.map(address => (
//                 <div key={address.id}>
//                   {address.name}
//                   <br />
//                   <strong>Endereço:</strong> {address.public_place},{' '}
//                   {address.number}
//                   <br />
//                   <strong>CEP:</strong> {address.zip_code}
//                 </div>
//               ))}
//           </div>
//         </div>
//       ) : (
//         <p>Carregando dados...</p>
//       )}
//     </div>

// };

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../service/api';
import { User } from '../../types/Users';
import { EditProfile } from '../../components/EditProfile';
import { Button } from '../../components/Button';
import { CircularSpinner } from '../../components/CircularSpinner';
import { ContainerProfile, WrapperModal } from './styled';
Modal.setAppElement('#root');

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User | null>(null);
  const [nameEmailModalIsOpen, setNameEmailModalIsOpen] = useState(false);
  const [phonesModalIsOpen, setPhonesModalIsOpen] = useState(false);
  const [addressesModalIsOpen, setAddressesModalIsOpen] = useState(false);
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
        closeNameEmailModal(); // Fechar o modal após submeter os dados
        closePhonesModal(); // Fechar o modal após submeter os dados
        closeAddressesModal(); // Fechar o modal após submeter os dados
      } else {
        console.log('Algo deu muito errado');
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
            contentLabel="Editar Nome e Email"
          >
            <h2>Editar Nome e Email</h2>
            {clientData ? (
              <EditProfile values={clientData} onSubmit={handleSubmit} />
            ) : (
              <p>
                <CircularSpinner /> Carregando dados...
              </p>
            )}

            <Button
              variant="secondary"
              size="medium"
              type="button"
              onClick={closeNameEmailModal}
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
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={openNameEmailModal}
        >
          Editar Nome e Email
        </Button>
      </WrapperModal>
      <WrapperModal>
        {/* Modal para Telefones */}
        <Modal
          isOpen={phonesModalIsOpen}
          onRequestClose={closePhonesModal}
          contentLabel="Editar Telefones"
        >
          <h2>Editar Telefones</h2>
          {/* Conteúdo do modal para Telefones */}
          {/* Substitua esta linha pelo conteúdo desejado */}
          <p>Conteúdo do modal para Telefones</p>

          <Button
            variant="secondary"
            size="medium"
            type="button"
            onClick={closePhonesModal}
          >
            Fechar
          </Button>
        </Modal>
        {clientData ? (
          <div>
            <h3>Telefones:</h3>
            {clientData.telephones.map((telephone, index) => (
              <div key={index}>
                <strong>Número:</strong> {telephone.number}
              </div>
            ))}
          </div>
        ) : (
          <p>Carregando dados...</p>
        )}
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={openPhonesModal}
        >
          Editar Telefones
        </Button>
      </WrapperModal>

      <WrapperModal>
        {/* Modal para Endereços */}
        <Modal
          isOpen={addressesModalIsOpen}
          onRequestClose={closeAddressesModal}
          contentLabel="Editar Endereços"
        >
          <h2>Editar Endereços</h2>
          {/* Conteúdo do modal para Endereços */}
          {/* Substitua esta linha pelo conteúdo desejado */}
          <p>Conteúdo do modal para Endereços</p>

          <Button
            variant="secondary"
            size="medium"
            type="button"
            onClick={closeAddressesModal}
          >
            Fechar
          </Button>
        </Modal>
        {clientData ? (
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
        ) : (
          <p>Carregando dados...</p>
        )}
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={openAddressesModal}
        >
          Editar Endereços
        </Button>
      </WrapperModal>
    </ContainerProfile>
  );
};
