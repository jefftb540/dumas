import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin, LoginProps } from '../../service/auth';
import { User } from '../../types/Users';
import secureLocalStorage from 'react-secure-storage';
import { handleLoginErrors } from '../../utils/handleLoginsErrors';
import { AxiosError } from 'axios';
import { configureAxiosToken } from '../../utils/configureAxiosAuth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user?: User;
  setUser: (user: User) => void;
  signIn: (credentials: LoginProps) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  error: string;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });
      console.log('teste', response);
      if (response && response.access_token) {
        navigate('/home');
        const expDate = new Date();
        expDate.setMinutes(expDate.getHours() + 1);
        secureLocalStorage.setItem('token', response.access_token);
        secureLocalStorage.setItem('refreshToken', response.refresh_token);
        secureLocalStorage.setItem('user', JSON.stringify(response.user));
        secureLocalStorage.setItem('tokenExpDate', JSON.stringify(expDate));
        setIsAuthenticated(true);
        setIsLoading(true);

        configureAxiosToken(response.access_token, response.refresh_token);
      }
    } catch (error) {
      console.log(error);
      const messageError = handleLoginErrors(error as AxiosError);
      setError(messageError);
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    secureLocalStorage.clear();

    navigate('/');

    setIsAuthenticated(false);
  }

  useEffect(() => {
    const authUser = secureLocalStorage.getItem('user');
    const token = secureLocalStorage.getItem('token');
    const refreshToken = secureLocalStorage.getItem('refreshToken');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    configureAxiosToken(token as string, refreshToken as string);

    if (authUser) {
      setUser(JSON.parse(authUser as string));
    }
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
        setUser,
        error,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Você somente pode usar este hook debaixo de um <AuthContextProvider>'
    );
  }

  return context;
};
