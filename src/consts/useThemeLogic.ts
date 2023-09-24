import { useTheme } from '../contexts/themeContext';
import { dark, light } from '../themes';

export function useThemeLogic() {
  const { theme, toggle } = useTheme();

  const colors = theme === 'dark' ? dark.colors : light.colors;
  const logoSrc = theme === 'dark' ? dark.logoSrc : light.logoSrc;
  const centeredImageSrc =
    theme === 'dark' ? dark.centeredImageSrc : light.centeredImageSrc;
  const background =
    theme === 'dark'
      ? dark.colors.secondary.main
      : light.colors.background.main;

  return {
    theme,
    toggle,
    colors,
    logoSrc,
    centeredImageSrc,
    background
  };
}
