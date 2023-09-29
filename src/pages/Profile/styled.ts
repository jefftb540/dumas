import { styled } from 'styled-components';

export const Title3 = styled.h3`
  width: 233px;
  height: 54px;
  color: ${({ theme }) => theme.colors.secondary.main};

  top: -18px;
  position: absolute;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  font-size: ${({ theme }) => theme.fonts.header.small};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

export const ContainerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 49px;
  padding: 38px;
`;

export const WrapperModal = styled.div`
  color: ${({ theme }) => theme.colors.text.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 2px solid #8c0b0b;
  min-width: 100%;
  height: 164px;
  padding: 0 27px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`;
