import { NearDishesMap } from '../../components/NearDishesMap';
import { Dish } from '../../types/Dish';
import {
  getAllDishes,
  getFavouriteDishes,
  getNearDishes
} from '../../service/api/dishes';
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
import { useAuth } from '../../contexts/authContext';

type DisplayingOptions = 'default' | 'favorites' | 'near' | 'all';

const insertDistances = (
  dishes: Dish[],
  center: { lat: number; lng: number }
) => {
  return dishes.map(dish =>
    dish.chef.address &&
    dish.chef.address.latitude &&
    dish.chef.address.longitude
      ? {
          ...dish,
          distance: google.maps.geometry.spherical.computeDistanceBetween(
            center,
            {
              lat: dish.chef.address.latitude,
              lng: dish.chef.address.longitude
            }
          )
        }
      : dish
  );

  // setDistance(distanceInMeters / 1000);
};

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [displaying, setDisplaying] = useState<DisplayingOptions>('default');

  const { userLocation } = useAuth();

  const favRef = useRef(null);

  const {
    data: allDishesData,
    fetchNextPage: fetchNextAllDishesPage,
    hasNextPage: hasNextAllDishesPage
  } = useInfiniteQuery(
    ['allDishes'],
    ({ pageParam = 1 }) => getAllDishes(pageParam, 10),
    {
      getNextPageParam: currentPage =>
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  const {
    data: nearDishesData,
    fetchNextPage: fetchNextNearDishesPage,
    hasNextPage: hasNextNearDishesPage
  } = useInfiniteQuery(
    ['nearDishes'],
    ({ pageParam = 1 }) =>
      getNearDishes(
        { latitude: userLocation.lat, longitude: userLocation.lng },
        pageParam,
        10
      ),
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
        insertDistances(
          allDishesData?.pages.flatMap(page => (page.data ? page.data : [])),
          userLocation
        )
      );
    console.log(allDishes);
  }, [allDishesData]);

  useEffect(() => {
    if (nearDishesData)
      setNearDishes(
        insertDistances(
          nearDishesData?.pages.flatMap(page => (page.data ? page.data : [])),
          userLocation
        )
      );
    console.log(nearDishes);
  }, [nearDishesData]);

  useEffect(() => {
    console.log(userLocation);
    if (favoritesData)
      setFavouriteDishes(
        favoritesData?.pages.flatMap(page => (page.data ? page.data : []))
      );
  }, [favoritesData]);

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
                  type="near"
                  onScroll={
                    hasNextNearDishesPage ? fetchNextNearDishesPage : null
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
                type="all"
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
                type="favorites"
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
