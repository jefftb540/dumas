import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';
import { handleLogin, LoginProps } from '../../service/Auth/HandleLogin';
import { User } from '../../types/Users';

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

  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });

      if (response.token) {
        navigate('/home');
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  function signOut() {
    localStorage.clear();

    navigate('/');

    setIsAuthenticated(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authUser = localStorage.getItem('user');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    if (authUser) {
      setUser(JSON.parse(authUser));
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
