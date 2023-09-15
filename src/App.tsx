import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <ThemeProviderContext>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProviderContext>
  );
}

export default App;
