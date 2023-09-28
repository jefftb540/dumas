import { Container, Title } from './styled';
import { Button } from '../../components/Button';
import { CardContainer } from '../../components/Card/styled';

export const ProductDetails = () => {
  return (
    <Container>
      <Title color="accent">Pratos próximos</Title>
      <Title> Pão com ovo</Title>
      <CardContainer></CardContainer>

      <Button variant="primary" size="medium">
        Comprar
      </Button>
    </Container>
  );
};
