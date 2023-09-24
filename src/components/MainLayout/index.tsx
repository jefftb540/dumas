import { Outlet } from 'react-router-dom';
import {
  MainLayoutContainer,
  HalfScreen,
  Logo,
  CenteredImage,
  Wrapper,
  RightContent
} from './styled';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IconButton } from '../IconButton';
import { ThemeProviderContext } from '../../contexts/themeContext';
import { useThemeLogic } from '../../consts/useThemeLogic';

export const MainLayout = () => {
  const { theme, toggle, colors, logoSrc, centeredImageSrc, background } =
    useThemeLogic();

  return (
    <ThemeProviderContext>
      <Wrapper>
        <IconButton
          icon={
            theme === 'dark' ? (
              <FaSun color={colors.text.main} />
            ) : (
              <FaMoon color={colors.primary.main} />
            )
          }
          onClick={toggle}
        />
        <MainLayoutContainer>
          <HalfScreen background={background}>
            <Logo src={logoSrc} alt="Logo Dumas" />
            <CenteredImage src={centeredImageSrc} alt="Imagem de decoração" />
          </HalfScreen>
          <RightContent>
            <Outlet />
          </RightContent>
        </MainLayoutContainer>
      </Wrapper>
    </ThemeProviderContext>
  );
};
