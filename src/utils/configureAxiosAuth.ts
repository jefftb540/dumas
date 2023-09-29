import secureLocalStorage from 'react-secure-storage';
import { api } from '../service/api';
import { refreshToken } from '../service/api/auth';
import { configureLocalStorage } from './configureLocalStorage';

export function configureAxiosToken(accessToken: string, refresh: string) {
  api.interceptors.request.use(async function (config) {
    const tokenExpDate = secureLocalStorage.getItem('tokenExpDate');
    if (tokenExpDate) {
      const now = new Date();
      const expDate = new Date(JSON.parse(tokenExpDate as string));
      if (expDate < now) {
        secureLocalStorage.removeItem('tokenExpDate');
        try {
          console.log('Sending refresh token request');
          const data = await refreshToken(refresh);
          configureLocalStorage(data.access_token, data.refresh_token);

          config.headers.Authorization = `Bearer ${data.access_token}`;
          console.log(config);
          return api(config);
        } catch (error) {
          secureLocalStorage.removeItem('refreshToken');
          secureLocalStorage.removeItem('token');
          secureLocalStorage.removeItem('user');
          return Promise.reject(error);
        }
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log('no fim da função', config);
    return Promise.resolve(config);
  });
}
