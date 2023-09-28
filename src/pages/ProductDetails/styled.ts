import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  width: 350px;
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.main};
`;
