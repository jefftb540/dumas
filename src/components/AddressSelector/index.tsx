import React, { useEffect, useRef } from 'react';
import { useCart } from '../../contexts/cartContex';
import { AddressDescription, AddressTitle } from '../Nav/styled';
import { AddressInfo, SelectorContainer } from './styled';
import { useAuth } from '../../contexts/authContext';
import { closeOnClickOutside } from '../../utils/closeOnClickOutside';

interface AddressSelectorProps {
  closeSelector: () => void;
}
export const AddressSelector = ({ closeSelector }: AddressSelectorProps) => {
  const { user } = useAuth();
  const { setActiveAddress } = useCart();
  const selectorRef = useRef(null);

  useEffect(() => {
    const listener = (e: MouseEvent) =>
      closeOnClickOutside(e, selectorRef, closeSelector);
    document.addEventListener('click', listener, true);
    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, []);

  return (
    <SelectorContainer ref={selectorRef}>
      {user?.addresses?.length
        ? user.addresses.map(address => (
            <AddressInfo
              key={address.id}
              onClick={() => {
                setActiveAddress(address);
                closeSelector();
              }}
            >
              <>
                <AddressTitle>{address.name}</AddressTitle>
                <AddressDescription>{`${address.public_place}, ${address.number}`}</AddressDescription>
              </>
            </AddressInfo>
          ))
        : ''}
    </SelectorContainer>
  );
};
