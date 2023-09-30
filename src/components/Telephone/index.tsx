import { useState } from 'react';
import { Title3 } from '../../pages/Profile/styled';
import { Telephone } from '../../types/Telephone';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { FiEdit, FiDelete } from 'react-icons/fi';
import {
  ContainerTelephoneProfile,
  InputPhone,
  WrapperEditDelete
} from './styled';

interface TelephoneProfileProps {
  telephone: Telephone;
}

export const TelephoneProfile = ({ telephone }: TelephoneProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTelephone, setNewTelephone] = useState(telephone.number);
  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enviar os dados', newTelephone);
      await api.put(`clients/telephones/${telephone.id}`, {
        telephone: { number: newTelephone }
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    }
  };

  const deletePhoneNumber = async (telephone_id: string) => {
    try {
      await api.delete(`/clients/telephones/${telephone_id}`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerTelephoneProfile>
      <Title3>Telefones</Title3>
      <strong>Número:</strong>:
      {isEditing ? (
        <InputPhone
          type="phone"
          onKeyUp={handlePressEnter}
          value={newTelephone}
          onChange={e => setNewTelephone(e.target.value)}
        />
      ) : (
        <>
          {telephone.number}{' '}
          <WrapperEditDelete>
            <span onClick={() => setIsEditing(true)}>
              <FiEdit />
            </span>
            <span onClick={() => deletePhoneNumber(telephone.id)}>
              <FiDelete />
            </span>
          </WrapperEditDelete>
        </>
      )}
    </ContainerTelephoneProfile>
  );
};
