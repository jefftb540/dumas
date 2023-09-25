import { NearDishesMap } from '../../components/NearDishesMap';
import { Dish } from '../../types/Dish';
import {
  getAllDishes,
  getFavouriteDishes,
  getNearDishes
} from '../../service/api/dishes';
import { useEffect, useState } from 'react';
import CardList from '../../components/CardList';
import {
  FavoritesContainer,
  LeftContainer,
  MainContainer,
  TitleContainer
} from './styled';
import { Title } from '../../components/Title';
import { InfoText } from '../../components/InfoText';
import { Chef } from '../../types/Chef';
import { getAllChefs } from '../../service/api/chefs';

type DisplayingOptions = 'default' | 'favorites' | 'near' | 'all';

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [displaying, setDisplaying] = useState<DisplayingOptions>('all');

  useEffect(() => {
    const getData = async () => {
      const favouriteDishesData = await getFavouriteDishes();
      setFavouriteDishes(favouriteDishesData.data);
      const nearDishesData = await getNearDishes({
        latitude: -3.73883335224498,
        longitude: -3.85402670488225e15
      });
      setNearDishes(nearDishesData.data);

      const allDishesData = await getAllDishes();
      console.log(allDishesData);
      setAllDishes(allDishesData.data);

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
          <TitleContainer>
            <Title color="accent">Pratos próximos</Title>
            <span> ver mais</span>
          </TitleContainer>
          {nearDishes.length ? (
            <CardList
              dishes={nearDishes}
              direction="row"
              fullWidth={displaying === 'near'}
              hide={displaying !== 'favorites' && displaying !== 'default'}
            />
          ) : (
            <InfoText> Não existem pratos próximos</InfoText>
          )}
          <Title color="accent">Pratos</Title>
          <CardList
            dishes={allDishes}
            direction="row"
            fullWidth={displaying === 'all'}
            hide={displaying !== 'all' && displaying !== 'default'}
          />
        </LeftContainer>
        <FavoritesContainer>
          <Title>Favoritos</Title>
          {favouriteDishes.length ? (
            <CardList
              dishes={favouriteDishes}
              direction="column"
              fullWidth={displaying === 'favorites'}
              hide={displaying !== 'favorites' && displaying !== 'default'}
            />
          ) : (
            <InfoText> Adicione pratos à sua lista de favoritos</InfoText>
          )}
        </FavoritesContainer>
      </MainContainer>
    </>
  );
};
