import styled from 'styled-components';

export const MenuContainer = styled.div`
  position: absolute;
  width: 300px;
  top: 60px;
  z-index: 2;
  right: 0;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px inset;
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

export const MenuItem = styled.div`
  padding: 18px 28px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.dark};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.text.medium};
  z-index: 3;
  border-top: 2px solid ${({ theme }) => theme.colors.white};

  svg {
    /* position: absolute; */
    margin-top: 4px;
  }
`;
