import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin, LoginProps } from '../../service/api/auth';
import { User } from '../../types/Users';
import secureLocalStorage from 'react-secure-storage';
import { handleLoginErrors } from '../../utils/handleLoginsErrors';
import { AxiosError } from 'axios';
import { configureAxiosToken } from '../../utils/configureAxiosAuth';
import { getLocationWithIPAddress } from '../../service/api/location';

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
  userLocation: { lat: number; lng: number };
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();

  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });
      if (response && response.access_token) {
        const expDate = new Date();
        expDate.setHours(expDate.getHours() + 1);
        secureLocalStorage.setItem('tokenExpDate', JSON.stringify(expDate));
        secureLocalStorage.setItem('token', response.access_token);
        secureLocalStorage.setItem('refreshToken', response.refresh_token);
        secureLocalStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
        setIsLoading(true);
        setUser(response.user);
        configureAxiosToken(response.access_token, response.refresh_token);
        if (
          user?.addresses &&
          user.addresses[0].latitude &&
          user.addresses[0].longitude
        ) {
          setUserLocation({
            lat: user.addresses[0].latitude,
            lng: user.addresses[0].longitude
          });
        } else {
          const getLocation = async () => {
            const data = await getLocationWithIPAddress();
            if (data) {
              console.log(data);
              setUserLocation({ lat: Number(data.lat), lng: Number(data.lng) });
            }
          };
          getLocation();
        }
        navigate('/home');
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
      setIsLoading(false);
      return;
    }
    configureAxiosToken(token as string, refreshToken as string);

    if (authUser) {
      setUser(JSON.parse(authUser as string));
      if (
        user?.addresses &&
        user.addresses[0].latitude &&
        user.addresses[0].longitude
      ) {
        setUserLocation({
          lat: user.addresses[0].latitude,
          lng: user.addresses[0].longitude
        });
      } else {
        const getLocation = async () => {
          const data = await getLocationWithIPAddress();
          if (data) {
            console.log(data);
            setUserLocation({ lat: Number(data.lat), lng: Number(data.lng) });
          }
        };
        getLocation();
      }
    }
    setIsAuthenticated(true);
    setIsLoading(false);
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
        loading,
        userLocation
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
