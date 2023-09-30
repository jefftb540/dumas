import React, { useState } from 'react';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { Address } from '../../types/Address';
import { Title3 } from '../../pages/Profile/styled';
import { FiDelete, FiEdit } from 'react-icons/fi';

interface AddressProfileProps {
  address: Address;
}

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
    <div>
      <h3>Addresses</h3>
      {isEditing ? (
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={editedAddress.name}
              onChange={e =>
                setEditedAddress({
                  ...editedAddress,
                  name: e.target.value
                })
              }
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              value={editedAddress.public_place}
              onChange={e =>
                setEditedAddress({
                  ...editedAddress,
                  public_place: e.target.value
                })
              }
            />
          </label>
          <label>
            Número:
            <input
              type="text"
              value={editedAddress.number}
              onChange={e =>
                setEditedAddress({
                  ...editedAddress,
                  number: e.target.value
                })
              }
            />
          </label>
          <label>
            CEP:
            <input
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
          </label>
        </div>
      ) : (
        <>
          <Title3>Endereços</Title3>
          <div>
            <div>{address.name}</div>
            {address.public_place}, {address.number}
            <div></div>
            <span onClick={() => handleActionClick('edit')}>
              <FiEdit />
            </span>
            <span onClick={() => handleActionClick('delete')}>
              <FiDelete />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

//TODOConsertar, pq está aparendo Adresses na tela
