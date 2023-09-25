import { useRef } from 'react';
import { Dish } from '../../types/Dish';
import { Card } from '../Card/Index';
import { List } from './styled';
import { handleScroll } from '../../utils/handleScroll';

interface CardListProps {
  dishes: Dish[];
  direction: 'row' | 'column';
  $fullWidth: boolean;
  onScroll: (() => unknown) | ((...arg: unknown[]) => unknown) | null;
}
const CardList = ({
  dishes,
  direction,
  $fullWidth,

  onScroll
}: CardListProps) => {
  const ref = useRef(null);
  return (
    <List
      ref={ref}
      onScroll={() => handleScroll(ref, onScroll)}
      direction={direction}
      fullWidth={$fullWidth}
    >
      {dishes.length > 0 &&
        dishes.map((dish, _, arr) => (
          <Card key={`dishes_${arr.length}_${dish.id}`} dish={dish}></Card>
        ))}
    </List>
  );
};

export default CardList;
