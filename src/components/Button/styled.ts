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

  ${({ $variant, theme, size }) =>
    $variant === 'primary'
      ? `
        background:${theme.colors.secondary.main};
        padding: ${size === 'medium' ? '12px 26px' : '18px 26px'};
       
      `
      : `
        width:${size === 'medium' ? '150px' : '380px'};
        background:${theme.colors.primary.main};
        padding: ${size === 'medium' ? '12px 26px' : '18px 26px'};

      `}

  &:hover {
    opacity: 0.7;
  }
`;
