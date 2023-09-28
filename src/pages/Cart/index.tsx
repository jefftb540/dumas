import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { useCart } from '../../contexts/cartContex';
import {
  CartContainer,
  CartInfoContainer,
  CartInfoText,
  CartInfoTitle,
  ItensContainer
} from './styled';

export const Cart = () => {
  const { chefsInCart, cartItems, getItensPerChef } = useCart();
  return (
    <CartContainer>
      <Title color="accent">Carrinho</Title>
      <ItensContainer>
        {chefsInCart.length ? (
          chefsInCart.map(chef => (
            <>
              <Title>{chef.name}</Title>
              {getItensPerChef(chef.id).map(item => (
                <div>{item.item.name}</div>
              ))}
            </>
          ))
        ) : (
          <CartInfoContainer>
            <CartInfoTitle>O seu carrinho está vazio</CartInfoTitle>
            <CartInfoText>
              Que tal conferir alguns pratos saborosos preparados pelos nossos
              chefes e fazer o seu pedido?
            </CartInfoText>
            <Button size="large" variant="primary">
              Conferir pratos
            </Button>
          </CartInfoContainer>
        )}
      </ItensContainer>
    </CartContainer>
  );
};
