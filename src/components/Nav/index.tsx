import { useEffect, useRef, useState } from 'react';
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
  TotalCartItensNumber,
  SearchInput,
  MobileIconToggle
} from './styled';

import { BsSearch } from 'react-icons/bs';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCart } from '../../contexts/cartContex';
import useDebounce from '../../hooks/useDebounce';
import { Dish } from '../../types/Dish';
import { searchDishes } from '../../service/api/dishes';
import { SearchResults } from '../SearchResults';
import { useInfiniteQuery } from 'react-query';
import { useAuth } from '../../contexts/authContext';
import { UserMenu } from '../UserMenu';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/themeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TabletBreakpoint } from '../../consts/breakpoint';

export const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { getItemsCount } = useCart();
  const cartItensNumber = getItemsCount();
  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [searchResultDishes, setSearchResultDishes] = useState<Dish[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { debounce } = useDebounce(400);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const toggleMenu = () => setShowMenu(prev => !prev);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    debounce(() => setSearchText(inputText));
  }, [inputText]);

  const closeSearchResults = () => {
    setSearchResultDishes([]);
    setSearchText('');
  };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['searchDishes', searchText],
    ({ pageParam = 1 }) => searchDishes(searchText, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage && lastPage.meta.current_page < lastPage.meta.total_pages
          ? lastPage.meta.next_page
          : null,
      enabled: searchText.length > 0,
      staleTime: 5 * 60 * 1000
    }
  );

  useEffect(() => {
    if (data) {
      setSearchResultDishes(data?.pages.flatMap(p => p.data));
    }
  }, [data]);

  const isTablet = useMediaQuery(`(max-width: ${TabletBreakpoint})`);

  return (
    <>
      <NavContainer>
        <NavLeft>
          {isTablet ? (
            <MobileIconToggle>
              <GiHamburgerMenu onClick={toggleMenu} />
            </MobileIconToggle>
          ) : theme === 'light' ? (
            <NavIcon
              onClick={() => navigate(routes.home)}
              src="/images/logo.svg"
            />
          ) : (
            <NavIcon
              onClick={() => navigate(routes.home)}
              src="/images/logo_dark.svg"
            />
          )}
          <AddressContainer>
            {user?.addresses?.length ? (
              <>
                <AddressTitle>{user.addresses[0].name}</AddressTitle>
                <AddressDescription>{`${user.addresses[0].public_place}, ${user.addresses[0].number}`}</AddressDescription>
              </>
            ) : (
              <AddressTitle>Cadastre um endereço</AddressTitle>
            )}
          </AddressContainer>
        </NavLeft>
        <NavRight>
          <SearchContainer open={openSearch}>
            {openSearch && (
              <SearchInput
                type="text"
                ref={inputRef}
                onChange={handleSearchChange}
                value={inputText}
              />
            )}
            <BsSearch
              onClick={() => {
                setOpenSearch(prev => !prev);
              }}
            />
            {searchResultDishes?.length ? (
              <>
                <SearchResults
                  closeResults={closeSearchResults}
                  dishes={searchResultDishes}
                  fetchNextPage={() => {
                    hasNextPage && fetchNextPage();
                  }}
                  isFetching={isFetching}
                />
              </>
            ) : (
              ''
            )}
          </SearchContainer>

          <UserMenuToggle onClick={toggleMenu}>
            {user?.name}
            {showMenu ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </UserMenuToggle>
          {showMenu && <UserMenu closeMenu={closeMenu} />}
          <IconContainer onClick={() => navigate(routes.cart)}>
            {cartItensNumber ? (
              <TotalCartItensNumber>{cartItensNumber}</TotalCartItensNumber>
            ) : null}
            <FaShoppingCart />
          </IconContainer>
        </NavRight>
      </NavContainer>
    </>
  );
};
