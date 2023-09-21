import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'medium' | 'large';
}
export const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  return (
    <ButtonContainer $variant={variant} size={size} {...props}>
      {children}
    </ButtonContainer>
  );
};
