import { useState } from 'react';
import { Telephone } from '../../types/Telephone';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  ContainerTelephoneProfile,
  InputPhone,
  WrapperEditDelete,
  WrapperInputsPhones
} from './styled';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';
import { MessageErrorsContainer } from '../../pages/Login/styled';
import { updateTelephone } from '../../service/api/telephone';

interface TelephoneProfileProps {
  telephone: Telephone;
}

export const TelephoneProfile = ({ telephone }: TelephoneProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTelephone, setNewTelephone] = useState(telephone.number);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validation = Yup.object().shape({
    number: Yup.string()
      .matches(
        /^[0-9]{10,11}$/,
        messageErrors.telephones_attributes.number.invalid
      )
      .required(messageErrors.telephones_attributes.number.required)
  });

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await validation.validate(
          { number: newTelephone },
          { abortEarly: false }
        );
        setValidationError(null);

        console.log('enviar os dados', newTelephone);
        await updateTelephone(telephone.id, newTelephone);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        setIsEditing(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidationError(error.message);
        }
      }
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
      <strong>Número:</strong>
      {isEditing ? (
        <WrapperInputsPhones>
          <InputPhone
            type="tel"
            onKeyUp={handlePressEnter}
            value={newTelephone}
            onChange={e => setNewTelephone(e.target.value)}
          />
          {validationError && (
            <MessageErrorsContainer>{validationError}</MessageErrorsContainer>
          )}
        </WrapperInputsPhones>
      ) : (
        <>
          {telephone.number}{' '}
          <WrapperEditDelete>
            <span onClick={() => setIsEditing(true)}>
              <FiEdit />
            </span>
            <span onClick={() => deletePhoneNumber(telephone.id)}>
              <FiTrash2 />
            </span>
          </WrapperEditDelete>
        </>
      )}
    </ContainerTelephoneProfile>
  );
};
