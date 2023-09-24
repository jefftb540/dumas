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
import { ThemeProviderContext, useTheme } from '../../contexts/themeContext';
import { dark, light } from '../../themes';

export const MainLayout = () => {
  const { theme, toggle } = useTheme();

  const colors = theme === 'dark' ? dark.colors : light.colors;
  const logoSrc = theme === 'dark' ? dark.logoSrc : light.logoSrc;
  const centeredImageSrc =
    theme === 'dark' ? dark.centeredImageSrc : light.centeredImageSrc;
  const background =
    theme === 'dark'
      ? dark.colors.secondary.main
      : light.colors.background.main;

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
