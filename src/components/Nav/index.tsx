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
  SearchInput
} from './styled';

import { BsSearch } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/cartContex';
import useDebounce from '../../hooks/useDebounce';
// import { Chef } from '../../types/Chef';
import { Dish } from '../../types/Dish';
import { searchDishes } from '../../service/api/dishes';
import { SearchResults } from '../SearchResults';
import { useInfiniteQuery } from 'react-query';

export const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { getItemsCount } = useCart();
  const cartItensNumber = getItemsCount();
  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');
  // const [searchResultChefs, setSearchResultChefs] = useState<Chef[]>();
  const [searchResultDishes, setSearchResultDishes] = useState<Dish[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { debounce } = useDebounce(400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  useEffect(() => {
    debounce(() => setSearchText(inputText));
  }, [inputText]);

  const closeSearchResults = () => {
    console.log('closeSearchResults');
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
      enabled: searchText.length > 0
    }
  );

  useEffect(() => {
    if (data) {
      setSearchResultDishes(data?.pages.flatMap(p => p.data));
    }
  }, [data]);

  return (
    <>
      <NavContainer>
        <NavLeft>
          <NavIcon src="/images/logo.svg" />
          <AddressContainer>
            <AddressTitle>Home</AddressTitle>
            <AddressDescription>Rua da amargura, 730</AddressDescription>
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
    </>
  );
};
