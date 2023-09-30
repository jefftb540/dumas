import React, { useState } from 'react';
import { Title3 } from '../../pages/Profile/styled';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { Address } from '../../types/Address';

interface AddressProfileProps {
  address: Address;
}

export const AddressProfile: React.FC<AddressProfileProps> = ({
  address
}: AddressProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(address.id);

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Sending the data', newAddress);
      await api.put(`/clients/addresses/${address.id}`, {
        address: { address: newAddress }
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      await api.delete(`/clients/addresses/${addressId}`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title3>Addresses</Title3>
      {isEditing ? (
        <input
          type="text"
          onKeyUp={handlePressEnter}
          value={newAddress}
          onChange={e => setNewAddress(e.target.value)}
        />
      ) : (
        <>
          {address.id} <span onClick={() => setIsEditing(true)}>Edit</span>
          <span onClick={() => deleteAddress(address.id)}>Delete</span>
        </>
      )}
    </div>
  );
};
