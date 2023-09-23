import { useState } from 'react';
import {
  AddressContainer,
  AddressDescription,
  AddressTitle,
  NavIcon,
  NavContainer,
  SearchContainer,
  UserMenuToggle,
  IconContainer,
  NavLeft,
  NavRight,
  TotalCartItensNumber
} from './styled';

import { BsSearch } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/cartContex';

export const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { getItemsCount } = useCart();
  const cartItensNumber = getItemsCount();

  return (
    <NavContainer>
      <NavLeft>
        <NavIcon src="/images/logo.svg" />
        <AddressContainer>
          <AddressTitle>Home</AddressTitle>
          <AddressDescription>Rua da amargura, 730</AddressDescription>
        </AddressContainer>
      </NavLeft>
      <NavRight>
        <SearchContainer
          open={openSearch}
          onClick={() => setOpenSearch(prev => !prev)}
        >
          <BsSearch />
        </SearchContainer>
        <UserMenuToggle>
          João da Silva
          <MdOutlineKeyboardArrowDown />
        </UserMenuToggle>
        <IconContainer>
          {cartItensNumber ? (
            <TotalCartItensNumber>{cartItensNumber}</TotalCartItensNumber>
          ) : null}
          <FaShoppingCart />
        </IconContainer>
      </NavRight>
    </NavContainer>
  );
};
