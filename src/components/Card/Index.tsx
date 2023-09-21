import {
  BsCartPlus,
  BsFillStarFill,
  BsHeart,
  BsHeartFill
} from 'react-icons/bs';
import {
  CardContainer,
  CardImage,
  CartIconContainer,
  DishContainer,
  DishInfo,
  DishInfoContainer,
  DishTitle,
  FavouriteIconContainer,
  TitleAndIconContainer
} from './styled';
import { Dish } from '../../types/Dish';
import { formatCurrency } from '../../utils/formatCurrency';

interface CardProps {
  dish: Dish;
  isFavourite: boolean;
  rating: number;
  distance: number;
}

export const Card = ({ dish, isFavourite, rating, distance }: CardProps) => {
  return (
    <CardContainer>
      <CardImage src="https://img.cybercook.com.br/publicidades/receita-de-buchada-de-bode-840x480.jpeg?q=75" />
      <FavouriteIconContainer>
        {isFavourite ? <BsHeartFill /> : <BsHeart />}
      </FavouriteIconContainer>
      <DishContainer>
        <TitleAndIconContainer>
          <DishTitle>{dish.name}</DishTitle>
          <CartIconContainer>
            <BsCartPlus />
          </CartIconContainer>
        </TitleAndIconContainer>

        <DishInfoContainer>
          <DishInfo>{formatCurrency(dish.unit_price)}</DishInfo>
          <DishInfo>
            {rating}
            <BsFillStarFill />
          </DishInfo>
          <DishInfo>{distance} km</DishInfo>
        </DishInfoContainer>
      </DishContainer>
    </CardContainer>
  );
};
