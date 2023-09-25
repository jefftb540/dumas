import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './contexts/authContext';
import { CartProviderContext } from './contexts/cartContex';
import { QueryClientProvider } from 'react-query';
import queryClient from './service/reactQuery/queryClient';

import '@fontsource/poppins';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/500-italic.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/600-italic.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/700-italic.css';

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
