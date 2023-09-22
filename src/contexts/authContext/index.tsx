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
import { api } from '../../service/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user?: User;
  setUser: (user: User) => void;
  signIn: (credentials: LoginProps) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  function configureAxiosToken(token: string) {
    api.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }

  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });
      console.log('teste', response);
      if (response.access_token) {
        navigate('/home');
        secureLocalStorage.setItem('token', response.access_token);
        secureLocalStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);

        configureAxiosToken(response.access_token);
      }
    } catch (error) {
      throw new Error(error as string);
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

    if (!token) {
      setIsAuthenticated(false);
      configureAxiosToken(token as string);

      return;
    }

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
        setUser
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
