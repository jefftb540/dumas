import styled from 'styled-components';

interface ContainerProps {
  variant: 'primary' | 'secondary';
}

export const Container = styled.span<ContainerProps>`
  ${({ variant, theme }) =>
    variant === 'primary'
      ? `

      color: ${theme.colors.secondary.main};
      font-size: ${theme.fonts.text.medium};
      font-weight: ${theme.fonts.weight.bold};

      a{
        &:visited {
          color: ${theme.colors.secondary.main}
      }
      `
      : `
      color: ${theme.colors.text.light};
      font-size: ${theme.fonts.text.small};
      font-weight: ${theme.fonts.weight.regular};
      opacity

      a{
        &:visited {
          color: ${theme.colors.text.main}
      }
      `}
`;
