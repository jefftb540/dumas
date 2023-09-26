import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin, handleSignup, LoginProps } from '../../service/api/auth';
import { User } from '../../types/Users';
import secureLocalStorage from 'react-secure-storage';
import { handleLoginErrors } from '../../utils/handleLoginsErrors';
import { AxiosError } from 'axios';
import { configureAxiosToken } from '../../utils/configureAxiosAuth';
import { routes } from '../../routes';
import { handleSignupErrors } from '../../utils/handleSignupErrors';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user?: User;
  setUser: (user: User) => void;
  signIn: (credentials: LoginProps) => Promise<void>;
  signUp: (user: User) => Promise<void>;
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
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });
      if (response && response.access_token) {
        configureLocalStorage(
          response.access_token,
          response.refresh_token,
          response.user
        );
        setIsAuthenticated(true);
        setIsLoading(true);
        configureAxiosToken(response.access_token, response.refresh_token);
        navigate(routes.home);
      }
    } catch (error) {
      console.log(error);
      const messageError = handleLoginErrors(error as AxiosError);
      setError(messageError);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(values: User) {
    try {
      const response = await handleSignup(values);
      if (response && response.access_token) {
        configureLocalStorage(
          response.access_token,
          response.refresh_token,
          response.user
        );
        setIsAuthenticated(true);
        setIsLoading(true);
        configureAxiosToken(response.access_token, response.refresh_token);
        navigate(routes.home);
      }
    } catch (error) {
      const messageError = handleSignupErrors(error as AxiosError);
      setError(messageError);
    }
  }

  const configureLocalStorage = (
    token: string,
    refreshToken: string,
    user: User
  ) => {
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    secureLocalStorage.setItem('tokenExpDate', JSON.stringify(expDate));
    secureLocalStorage.setItem('token', token);
    secureLocalStorage.setItem('refreshToken', refreshToken);
    secureLocalStorage.setItem('user', JSON.stringify(user));
  };

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
      setIsLoading(false);
      return;
    }
    configureAxiosToken(token as string, refreshToken as string);

    if (authUser) {
      setUser(JSON.parse(authUser as string));
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
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
