import React, { useState } from 'react';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { Address } from '../../types/Address';
import { Title3 } from '../../pages/Profile/styled';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  ContainerAddressProfile,
  InputAddress,
  WrapperEditDelete
} from './styled';

interface AddressProfileProps {
  address: Address;
}
//TODO resolver bug enviar nulos no put
export const AddressProfile: React.FC<AddressProfileProps> = ({
  address
}: AddressProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enviar dados', editedAddress);
      await api.put(`/clients/addresses/${address.id}`, {
        address: editedAddress
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    }
  };

  const handleActionClick = (action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setIsEditing(true);
    } else if (action === 'delete') {
      deleteAddress(address.id);
    }
  };

  const deleteAddress = async (address_id: string) => {
    try {
      await api.delete(`/clients/addresses/${address_id}`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerAddressProfile>
      <Title3>Endereços</Title3>
      {isEditing ? (
        <div>
          <InputAddress
            type="text"
            value={editedAddress.name}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                name: e.target.value
              })
            }
          />

          <InputAddress
            type="text"
            value={editedAddress.public_place}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                public_place: e.target.value
              })
            }
          />

          <InputAddress
            type="text"
            value={editedAddress.number}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                number: e.target.value
              })
            }
          />

          <InputAddress
            type="text"
            onKeyUp={handlePressEnter}
            value={editedAddress.zip_code}
            onChange={e =>
              setEditedAddress({
                ...editedAddress,
                zip_code: e.target.value
              })
            }
          />
        </div>
      ) : (
        <>
          <strong>{address.name}:</strong>
          {address.public_place}, {address.number}
          <WrapperEditDelete>
            <span onClick={() => handleActionClick('edit')}>
              <FiEdit />
            </span>
            <span onClick={() => handleActionClick('delete')}>
              <FiTrash2 />
            </span>
          </WrapperEditDelete>
        </>
      )}
    </ContainerAddressProfile>
  );
};
