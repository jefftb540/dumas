import { Dish } from '../../types/Dish';
import { Card } from '../Card/Index';
import { List } from './styled';

interface CardListProps {
  dishes: Dish[];
  direction: 'row' | 'column';
  fullWidth: boolean;
  hide: boolean;
}
const CardList = ({ dishes, direction, fullWidth, hide }: CardListProps) => {
  return (
    <List direction={direction} fullWidth={fullWidth} hide={hide}>
      {dishes.length > 0 &&
        dishes.map((dish, _, arr) => (
          <Card key={`dishes_${arr.length}_${dish.id}`} dish={dish}></Card>
        ))}
    </List>
  );
};

export default CardList;
