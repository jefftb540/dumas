import {
  DishDescription,
  DishImage,
  DishName,
  InfoContainer,
  Result,
  ResultsContainer,
  SpinnerContainer
} from './styled';

// import { Chef } from '../../types/Chef';
import { Dish } from '../../types/Dish';
import { useEffect, useRef } from 'react';
import { routes } from '../../routes';
import { Link } from 'react-router-dom';
import { CircularSpinner } from '../CircularSpinner';
import { handleScroll } from '../../utils/handleScroll';
interface SearchResultsProps {
  dishes: Dish[];
  fetchNextPage: () => void;
  closeResults: () => void;
  isFetching: boolean;
}

export const SearchResults = ({
  dishes,
  fetchNextPage,
  closeResults,
  isFetching
}: SearchResultsProps) => {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultRef.current && !resultRef.current.contains(e.target as Node)) {
        closeResults && closeResults();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [closeResults]);

  return (
    <>
      <ResultsContainer
        onScroll={() => handleScroll(resultRef, fetchNextPage)}
        ref={resultRef}
      >
        {dishes.length &&
          dishes.map(dish => (
            <Link key={`result_${dish.id}`} to={routes.dish(dish.id)}>
              <Result key={dish.id}>
                <DishImage src={dish.images[0]} />
                <InfoContainer>
                  <DishName>{dish.name}</DishName>
                  <DishDescription>{dish.description}</DishDescription>
                </InfoContainer>
              </Result>
            </Link>
          ))}
        {isFetching && (
          <SpinnerContainer>
            <CircularSpinner />
          </SpinnerContainer>
        )}
      </ResultsContainer>
      {/* <div>{chefs.length && chefs.map(chef => <div>{chef.name}</div>)}</div> */}
    </>
  );
};
