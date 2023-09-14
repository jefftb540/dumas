import { createContext, useState } from 'react';
import { ThemeProvider, Theme } from 'styled-components';
import { dark, light } from '../themes';
// import { Theme } from '../types/theme';

export type ThemeVariations = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeVariations;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProviderContext = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeVariations>('light');
  const [activeTheme, setActiveTheme] = useState<Theme>(light);

  const toggle = () => {
    setActiveTheme(prev => (prev === light ? dark : light));
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
