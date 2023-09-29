import { useEffect, useState } from 'react';
import { Container } from './styled';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { Dish } from '../../types/Dish';
import { getDishId } from '../../service/api/dishes';
import { useParams } from 'react-router-dom';

export const ProductDetails = ({ dishes, type }: ProductDetailsProps) => {
  const [dishDetail, setDishDetail] = useState<Dish>();
  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const dishDetailData = await getDishId(id);
      setDishDetail(dishDetailData);
    };
    getData();
  }, []);


  return (
    <Container>
      <Title color="accent">{dishDetail?.name}</Title>

      <Title color="accent">{dishDetail?.chef.name}</Title>
      <Title color="accent">{dishDetail?.available}</Title>
      <Title color="accent">{dishDetail?.description}</Title>
      <Title color="accent">{dishDetail?.unit_price}</Title>
      <Title color="accent">{dishDetail?.distance}</Title>
      <img src={dishDetail.images[0]} />


      <Button variant="primary" size="medium">
        Comprar
      </Button>
    </Container>
  );
};
