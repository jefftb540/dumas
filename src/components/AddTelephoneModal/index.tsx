import { FiPhone, FiXCircle } from 'react-icons/fi';
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
import { customStyles } from '../../consts/modalStyles';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (values: string) => Promise<void>;
}

export const AddTelephoneModal = ({
  closeModal,
  isOpen,
  onSubmit
}: EditUserModalProps) => {
  const [newPhone, setNewPhone] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Adicionar"
      style={customStyles}
    >
      <ModalContent>
        <ContainerTitleClose>
          <TitleModal>Adicionar Telefones</TitleModal>

          <ButtonClose onClick={closeModal}>
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
          onClick={() => onSubmit(newPhone)}
        >
          Adicionar
        </Button>
      </ModalContent>
    </Modal>
  );
};
