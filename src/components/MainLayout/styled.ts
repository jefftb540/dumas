import { styled } from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Wrapper = styled.div`
  display: flex;

  ${media.mobile`
    flex-direction: column;
    width: 100%;
  `}

  ${media.tablet`
    flex-direction: column;
    width: 100%;
  `}
`;

export const MainLayoutContainer = styled.div`
  display: flex;
  width: 100%;

  ${media.mobile`
    flex-direction: column;
    width: 100%;
    align-items: center; /* Centralizar verticalmente */
    justify-content: center; /* Centralizar horizontalmente */
  `}

  ${media.tablet`
    flex-direction: column;
    width: 100%;
    align-items: center; /* Centralizar verticalmente */
    justify-content: center; /* Centralizar horizontalmente */
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const HalfScreen = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 107px;

  ${media.desktop`
    flex: 1;
    height: 100vh;
  `}
`;

export const Logo = styled.img`
  width: 12%;
  position: absolute;
  top: 20px;
  left: 20px;

  ${media.mobile`
    position: absolute; 
    top: 20px;
    right: 20px;
    padding-top: 24px;
  `}

  ${media.tablet`
    width: 16%;
    position: absolute;
    top: 20px;
    right: 20px;
  `}
`;

export const CenteredImage = styled.img`
  padding-top: 180px;
  width: 65%;
  margin: auto;

  ${media.mobile`
    display: none;
  `}

  ${media.tablet`
    display: none;
  `}
`;
