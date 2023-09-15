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
      main: '#8C0B0B',
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
    text: {
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
  }
};

export const dark: Theme = {
  ...light,
  colors: {
    ...light.colors,
    background: {
      main: '#262626',
      light: '#FF5600'
    },
    primary: {
      main: '#D45513',
      dark: '#D95829'
    },
    black: '#333333',
    white: '#EEEEEE',
    text: {
      main: '#FDFDFD'
    }
  }
};
