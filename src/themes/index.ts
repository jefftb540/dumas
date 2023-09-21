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
    text: {
      main: '#333333',
      primaryAccent: '#FF5600',
      secondaryAccent: '#8C0B0B'
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
  }
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
  }
};
