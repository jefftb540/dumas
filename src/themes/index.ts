import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  colors: {
    background: {
      main: '#FFEDE4',
      light: '#FDFDFD'
    },
    primary: {
      main: '#FF5600',
      dark: '#D95829'
    },
    secondary: {
      main: '#8C0B0B',
      light: '#CA1E1E'
    },
    black: '#333333',
    white: '#EEEEEE',
    button: {
      disabled: '#6f6464'
    },

    text: {
      main: '#333333',
      primaryAccent: '#FF5600',
      secondaryAccent: '#8C0B0B',
      light: '#ffffff'
    },
    error: {
      main: '#FF0000'
    },
    border: {
      main: '#FF5600'
    }
  },
  fonts: {
    family: {
      primary: 'Poppins'
    },
    text: {
      errorSize: '10px',
      extraSmall: '14px',
      small: '16px',
      medium: '18px',
      large: '20px'
    },
    header: {
      small: '24px',
      medium: '28px',
      large: '32px'
    },

    weight: {
      light: 400,
      regular: 500,
      semiBold: 600,
      bold: 700
    }
  },
  logoSrc: 'public/ImagesMainLayout/light/logo.png',
  centeredImageSrc:
    'public/ImagesMainLayout/light/eating a variety of foods-bro.svg',
  iconColor: '#000'
};

export const dark: DefaultTheme = {
  ...light,
  colors: {
    ...light.colors,
    background: {
      main: '#8C0B0B',
      light: '#262626'
    },
    primary: {
      main: '#D45513',
      dark: '#D95829'
    },
    secondary: {
      main: '#FF5600'
    },
    black: '#333333',
    white: '#EEEEEE',
    text: {
      main: '#FDFDFD',
      primaryAccent: '#FFF',
      secondaryAccent: '#FFF'
    },
    border: {
      main: '#FFF'
    }
  },
  logoSrc: 'public/ImagesMainLayout/dark/logo.png',
  centeredImageSrc:
    'public/ImagesMainLayout/dark/eating a variety of foods-bro.svg',

  iconColor: '#fff'
};
