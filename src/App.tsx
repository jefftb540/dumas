import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';

function App() {
  console.log(import.meta.env.VITE_BASE_URL_API);
  return (
    <ThemeProviderContext>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProviderContext>
  );
}

export default App;
