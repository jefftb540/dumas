import { useState } from 'react';
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

export const MainLayout = () => {
  const logoSrc = 'ImagesMainLayout/logoDumasLaranja.png';
  const centeredImageSrc = 'ImagesMainLayout/eating a variety of foods-bro.svg';

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Wrapper>
      <IconButton
        icon={darkMode ? <FaSun /> : <FaMoon />}
        onClick={toggleDarkMode}
      />
      <MainLayoutContainer>
        <HalfScreen>
          <Logo src={logoSrc} alt="Logo Dumas" />
          <CenteredImage src={centeredImageSrc} alt="Imagem de decoração" />
        </HalfScreen>
        <RightContent>
          <Outlet />
        </RightContent>
      </MainLayoutContainer>
    </Wrapper>
  );
};
