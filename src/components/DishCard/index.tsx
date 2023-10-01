import { formatCurrency } from '../../utils/formatCurrency';
import {
  CardContainer,
  DishImage,
  DishTitle,
  DishPrice,
  CardsContainer
} from './styled';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { Dish } from '../../types/Dish';

interface DishCardProps {
  chefDish: Dish;
}

export const DishCard = ({ chefDish }: DishCardProps) => {
  const navigate = useNavigate();
  return (
    <CardsContainer>
      <CardContainer>
        <DishImage
          src={chefDish.images || 'images/image_placeholder.png'}
          alt={chefDish.chef.name}
        />
        <DishTitle onClick={() => navigate(routes.dish(chefDish.id))}>
          {chefDish.name}
        </DishTitle>
        <DishPrice>{formatCurrency(chefDish.unit_price)}</DishPrice>
      </CardContainer>
    </CardsContainer>
  );
};
