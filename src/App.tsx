import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './contexts/authContext';
import { CartProviderContext } from './contexts/cartContex';
import { QueryClientProvider } from 'react-query';
import queryClient from './service/reactQuery/queryClient';

function App() {
  return (
    <ThemeProviderContext>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <CartProviderContext>
              <GlobalStyle />
              <AppRoutes />
            </CartProviderContext>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProviderContext>
  );
}

export default App;
