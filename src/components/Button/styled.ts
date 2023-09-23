import { styled } from 'styled-components';

interface ButtonContainerProps {
  $variant: 'primary' | 'secondary';
  size: 'medium' | 'large';
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  border-radius: 30px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.text.small};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ size }) => (size === 'medium' ? '12px 26px' : '18px 26px')};
  width: ${({ size }) => (size === 'medium' ? '150px' : '380px')};
  transition: 0.3s ease-in-out;
  margin: 15px 0;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background:${theme.colors.secondary.main};
      `
      : `
        background:${theme.colors.primary.main};
      `}

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: ${({ size }) => (size === 'medium' ? '138px' : '249px')};
    padding: 12px 26px;
    //TODO tentar implementar logica da carol depois.
  }
`;
