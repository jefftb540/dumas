import { ReactNode } from 'react'; // Importe o tipo ReactNode
import { StyledIconButton } from './styled';

interface IconButtonProps {
  icon: ReactNode; // Atribua o tipo ReactNode à prop icon
  onClick: () => void; // Suponho que o onClick seja uma função sem argumentos
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return <StyledIconButton onClick={onClick}>{icon}</StyledIconButton>;
};
