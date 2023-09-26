import { NearDishesMap } from '../../components/NearDishesMap';
import { Dish } from '../../types/Dish';
import { getAllDishes, getFavouriteDishes } from '../../service/api/dishes';
import { useEffect, useRef, useState } from 'react';
import CardList from '../../components/CardList';
import {
  FavoritesContainer,
  LeftContainer,
  MainContainer,
  SeeMoreToggle,
  TitleContainer
} from './styled';
import { Title } from '../../components/Title';
import { InfoText } from '../../components/InfoText';
import { Chef } from '../../types/Chef';
import { useInfiniteQuery } from 'react-query';
import { getAllChefs } from '../../service/api/chefs';

type DisplayingOptions = 'default' | 'favorites' | 'near' | 'all';

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [displaying, setDisplaying] = useState<DisplayingOptions>('default');

  const favRef = useRef(null);

  const {
    data: allDishesData,
    fetchNextPage: fetchNextAllDishesPage,
    hasNextPage: hasNextAllDishesPage
  } = useInfiniteQuery(
    ['allDishes'],
    ({ pageParam = 1 }) => getAllDishes(pageParam),
    {
      getNextPageParam: currentPage =>
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  const {
    data: favoritesData,
    fetchNextPage: fetchNextFavoritesPage,
    hasNextPage: hasNextFavoritesPage
  } = useInfiniteQuery(
    ['favoriteDishes'],
    ({ pageParam = 1 }) => getFavouriteDishes(pageParam),
    {
      getNextPageParam: currentPage =>
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  useEffect(() => {
    if (allDishesData)
      setAllDishes(
        allDishesData?.pages.flatMap(page => (page.data ? page.data : []))
      );
  }, [allDishesData]);

  useEffect(() => {
    if (favoritesData)
      setFavouriteDishes(
        favoritesData?.pages.flatMap(page => (page.data ? page.data : []))
      );
  }, [favoritesData]);

  //     const favouriteDishesData = await getFavouriteDishes();
  //     setFavouriteDishes(favouriteDishesData.data);
  //     const nearDishesData = await getNearDishes({
  //       latitude: -3.73883335224498,
  //       longitude: -3.85402670488225e15
  //     });
  //     setNearDishes(nearDishesData.data);

  //     const allDishesData = await getAllDishes();
  //     console.log(allDishesData);
  //     setAllDishes(allDishesData.data);

  useEffect(() => {
    const getData = async () => {
      const chefsData = await getAllChefs();
      setChefs(chefsData.data);
    };

    getData();
  }, []);
  return (
    <>
      <NearDishesMap chefs={chefs} />
      <MainContainer>
        <LeftContainer>
          {(displaying === 'default' || displaying === 'near') && (
            <>
              <TitleContainer>
                <Title color="accent">Pratos próximos</Title>
                {displaying === 'near' ? (
                  <SeeMoreToggle onClick={() => setDisplaying('default')}>
                    {' '}
                    Voltar
                  </SeeMoreToggle>
                ) : (
                  <SeeMoreToggle onClick={() => setDisplaying('near')}>
                    {' '}
                    Ver mais
                  </SeeMoreToggle>
                )}
              </TitleContainer>
              {nearDishes.length ? (
                <CardList
                  onScroll={
                    hasNextAllDishesPage ? fetchNextAllDishesPage : null
                  }
                  dishes={nearDishes}
                  direction="row"
                  $fullWidth={displaying === 'near'}
                />
              ) : (
                <InfoText> Não existem pratos próximos</InfoText>
              )}
            </>
          )}
          {(displaying === 'default' || displaying === 'all') && (
            <>
              <TitleContainer>
                <Title color="accent">Pratos</Title>
                {displaying === 'all' ? (
                  <SeeMoreToggle onClick={() => setDisplaying('default')}>
                    {' '}
                    Voltar
                  </SeeMoreToggle>
                ) : (
                  <SeeMoreToggle onClick={() => setDisplaying('all')}>
                    {' '}
                    Ver mais
                  </SeeMoreToggle>
                )}
              </TitleContainer>
              <CardList
                onScroll={hasNextAllDishesPage ? fetchNextAllDishesPage : null}
                dishes={allDishes}
                direction="row"
                $fullWidth={displaying === 'all'}
              />
            </>
          )}
        </LeftContainer>
        {(displaying === 'default' || displaying === 'favorites') && (
          <FavoritesContainer ref={favRef}>
            <TitleContainer>
              <Title>Favoritos</Title>
              {displaying === 'favorites' ? (
                <SeeMoreToggle
                  accent={true}
                  onClick={() => setDisplaying('default')}
                >
                  Voltar
                </SeeMoreToggle>
              ) : (
                <SeeMoreToggle
                  accent={true}
                  onClick={() => setDisplaying('favorites')}
                >
                  {' '}
                  Ver mais
                </SeeMoreToggle>
              )}
            </TitleContainer>
            {favouriteDishes.length ? (
              <CardList
                onScroll={hasNextFavoritesPage ? fetchNextFavoritesPage : null}
                dishes={favouriteDishes}
                direction={displaying === 'favorites' ? 'row' : 'column'}
                $fullWidth={displaying === 'favorites'}
              />
            ) : (
              <InfoText> Adicione pratos à sua lista de favoritos</InfoText>
            )}
          </FavoritesContainer>
        )}
      </MainContainer>
    </>
  );
};
