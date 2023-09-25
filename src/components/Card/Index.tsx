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
  DistanceContainer,
  FavouriteIconContainer,
  PriceAndRatingContainer,
  TitleAndIconContainer
} from './styled';
import { Dish } from '../../types/Dish';
import { formatCurrency } from '../../utils/formatCurrency';
import { dislikeDish, likeDish } from '../../service/api/dishes';
import { useState } from 'react';
import { useCart } from '../../contexts/cartContex';

interface CardProps {
  dish: Dish;
}

export const Card = ({ dish }: CardProps) => {
  const [liked, setLiked] = useState(dish.liked_by_me);
  const { addToCart } = useCart();

  const toogleLiked = (dish: Dish) => {
    if (dish.liked_by_me) {
      dislikeDish(dish.id!);
    } else {
      likeDish(dish.id!);
    }
    setLiked(prev => !prev);
  };

  const distance = 0;
  const rating =
    dish.ratings.length > 0
      ? dish.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
        dish.ratings.length
      : 0;

  return (
    <CardContainer>
      <CardImage src={dish.images[0] || 'images/image_placeholder.png'} />
      <FavouriteIconContainer onClick={() => toogleLiked(dish)}>
        {liked ? <BsHeartFill /> : <BsHeart />}
      </FavouriteIconContainer>
      <DishContainer>
        <TitleAndIconContainer>
          <DishTitle>{dish.name}</DishTitle>
          <CartIconContainer onClick={() => addToCart(dish)}>
            <BsCartPlus />
          </CartIconContainer>
        </TitleAndIconContainer>

        <DishInfoContainer>
          <PriceAndRatingContainer>
            <DishInfo>{formatCurrency(dish.unit_price)}</DishInfo>
            <DishInfo>
              {rating.toFixed(0)}
              <BsFillStarFill />
            </DishInfo>
          </PriceAndRatingContainer>
          <DistanceContainer>
            <DishInfo>{distance} km</DishInfo>
          </DistanceContainer>
        </DishInfoContainer>
      </DishContainer>
    </CardContainer>
  );
};
