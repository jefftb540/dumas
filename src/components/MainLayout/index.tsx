import { MainLayoutContainer } from './styled';
import { HalfScreen } from './styled';
import { Logo } from './styled';
import { CenteredImage } from './styled';

export const MainLayout = () => {
  const logoSrc = 'ImagesMainLayout/logoDumasLaranja.png';
  const centeredImageSrc = 'ImagesMainLayout/eating a variety of foods-bro.svg';

  return (
    <MainLayoutContainer>
      <HalfScreen>
        <Logo src={logoSrc} alt="Logo Dumas" />
        <CenteredImage src={centeredImageSrc} alt="Imagem de decoração" />
      </HalfScreen>
    </MainLayoutContainer>
  );
};

export default MainLayout;
