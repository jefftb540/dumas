import { Banner } from '../../components/Banner';
import { Dish } from '../../types/Dish';
import {
  getAllDishes,
  getFavouriteDishes,
  getNearDishes
} from '../../service/api/dishes';
import { useEffect, useState } from 'react';
import CardList from '../../components/CardList';
import { FavoritesContainer, LeftContainer, MainContainer } from './styled';
import { Title } from '../../components/Title';
import { InfoText } from '../../components/InfoText';

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);

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
      setAllDishes(allDishesData.data);
    };

    getData();
  }, []);
  return (
    <>
      <Banner />
      <MainContainer>
        <LeftContainer>
          <Title color="accent">Pratos próximos</Title>
          {nearDishes.length ? (
            <CardList dishes={nearDishes} direction="row" />
          ) : (
            <InfoText> Não existem pratos próximos</InfoText>
          )}
          <Title color="accent">Pratos</Title>
          <CardList dishes={allDishes} direction="row" />
        </LeftContainer>
        <FavoritesContainer>
          <Title>Favoritos</Title>
          {favouriteDishes.length ? (
            <CardList dishes={favouriteDishes} direction="column" />
          ) : (
            <InfoText> Adicione pratos à sua lista de favoritos</InfoText>
          )}
        </FavoritesContainer>
      </MainContainer>
    </>
  );
};
