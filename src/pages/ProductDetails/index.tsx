import { Container, Title } from './styled';
import { Button } from '../../components/Button';

export const ProductDetails = () => {
  return (
    <Container>
      <Title> Pão com ovo</Title>

      <Button variant="primary" size="medium">
        Comprar
      </Button>
    </Container>
  );
};
