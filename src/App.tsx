import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './contexts/authContext';

function App() {
  console.log(import.meta.env.VITE_BASE_URL_API);
  return (
    <ThemeProviderContext>
      <BrowserRouter>
        <AuthProvider>
          <GlobalStyle />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProviderContext>
  );
}

export default App;
