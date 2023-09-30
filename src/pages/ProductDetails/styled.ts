import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Container = styled.div`
  padding: 30px 72px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  /* ${media.mobile`
    display: flex;
    flex-direction: center;
    align-items: center;
    justify-content: center; 


  `}

  ${media.tablet`
    padding: 30px 16px;

    align-items: flex-start;
    
  `}

  ${media.desktop`
    flex: 1; 
  `} */
`;

export const TopContainer = styled.div`
  text-align: right;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const IntermediateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  flex-basis: calc(50% - 10px);

  ${media.mobile`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;

  ${media.mobile`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.tablet`
    width: 70%;
    display: flex;
    flex-direction: center;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const TextContainer = styled.div`
  width: 550px;
  height: auto;
  padding-top: 4%;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const Text = styled.h2`
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  padding-bottom: 3%;
  color: ${({ theme }) => theme.colors.text.main};
`;

export const RightContainer = styled.div`
  float: right;

  ${media.mobile`
    width: 80%;
    padding-top: 4%;
  `}

  ${media.tablet`
    width: 80%;
    padding-top: 4%;
  `}
`;

export const MapContainer = styled.div`
  width: 550px;
  height: 300px;
  border: 2px solid ${({ theme }) => theme.colors.secondary.main};
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  padding: 12px 0;

  ${media.mobile`
    width: 100%;
  `}

  ${media.tablet`
    width: 100%;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const QuantityPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 4%;
`;

export const DistanceDetails = styled.div`
  padding: 10px;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  text-align: right;
  padding-top: 4%;
`;

export const ProductImage = styled.img`
  border-radius: 12px;
  width: 550px;
  height: 300px;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const ChefContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.mobile`
    width: 100%;
  `}

  ${media.tablet`
    width: 100%;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const ChefAvaliation = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-top: 2px;
    margin-left: 4px;
  }
`;
