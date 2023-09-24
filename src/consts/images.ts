interface ImageUrls {
  logo: string;
  centeredImage: string;
}

export const getImageUrls = (darkMode: boolean): ImageUrls => {
  const logo = darkMode
    ? 'ImagesMainLayout/dark/logo.png'
    : 'ImagesMainLayout/light/logo.png';

  const centeredImage = darkMode
    ? 'ImagesMainLayout/dark/eating a variety of foods-bro.svg'
    : 'ImagesMainLayout/light/eating a variety of foods-bro.svg';

  return {
    logo,
    centeredImage
  };
};
