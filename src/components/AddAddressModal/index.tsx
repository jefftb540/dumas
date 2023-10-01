import { FiHome, FiXCircle } from 'react-icons/fi';
import {
  ButtonClose,
  ContainerInput,
  ContainerTitleClose,
  InputModal,
  ModalContent,
  TitleModal
} from '../EditProfile/styled';
import Modal from 'react-modal';
import { Button } from '../Button';
import { useState } from 'react';
import { Address } from '../../types/Address';
import { getAddressByCep } from '../../service/api/address';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  styles: Modal.Styles;
  onSubmit: (values: Address) => Promise<void>;
  address?: Address;
}

export const AddAddressModal = ({
  closeModal,
  isOpen,
  styles,
  onSubmit,
  address
}: EditUserModalProps) => {
  const [newAddress, setNewAddress] = useState<Address>(
    address
      ? address
      : {
          id: '',
          name: '',
          public_place: '',
          zip_code: '',
          number: '',
          neighborhood: '',
          city_id: '',
          complement: '',
          reference: ''
        }
  );

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar Endereços"
      style={styles}
    >
      <ModalContent>
        <ContainerTitleClose>
          <TitleModal>Adicionar Endereços</TitleModal>

          <ButtonClose onClick={closeModal}>
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
            onSubmit(newAddress);
          }}
        >
          Adicionar
        </Button>
      </ModalContent>
    </Modal>
  );
};
