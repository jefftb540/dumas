import styled from 'styled-components';

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 80px;
  gap: 18px;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.main};
`;

export const ItensContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.background.dark};
  padding: 12px;
  border-radius: 12px;
`;

export const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: 80px 0;
`;
export const CartInfoTitle = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
`;
export const CartInfoText = styled.div``;
