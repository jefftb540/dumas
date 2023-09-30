import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 72px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  text-align: right;
`;

export const IntermediateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
`;

export const TextContainer = styled.div`
  width: 550px;
  height: 300px;
  padding-top: 4%;
`;

export const Text = styled.h2`
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  padding-bottom: 3%;
  color: ${({ theme }) => theme.colors.text.main};

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    position: absolute;
    margin-top: 2px;
    margin-left: 4px;
  }
`;

export const RightContainer = styled.div`
  float: right;
`;

export const MapContainer = styled.div`
  width: 550px;
  height: 300px;
  border: 2px solid ${({ theme }) => theme.colors.secondary.main};
  border-radius: 12px;
  box-sizing: border-box;
`;

export const QuantityPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 4%;
`;

export const DistanceDetails = styled.div`
  /* text-align: right; */
`;

export const ButtonContainer = styled.div`
  text-align: right;
  padding-top: 4%;
`;

export const ProductImage = styled.img`
  border-radius: 12px;
  width: 550px;
  height: 300px;
`;

export const ChefContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
