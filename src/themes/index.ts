import { Theme } from 'styled-components';

export const light: Theme = {
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
      main: '#8C0B0Bh',
      light: '#CA1E1E'
    },
    black: '#333333',
    white: '#EEEEEE',
    text: {
      main: '#333333'
    },
    error: {
      main: '#FF0000'
    }
  },
  fonts: {
    family: {
      primary: 'Poppins'
    },
    size: {
      extraSmall: '16px',
      small: '20px',
      medium: '24px',
      large: '28px'
    },
    weight: {
      bold: 700,
      light: 400,
      regular: 600
    }
  }
};

export const dark: Theme = { ...light };
