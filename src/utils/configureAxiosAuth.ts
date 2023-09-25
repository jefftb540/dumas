import secureLocalStorage from 'react-secure-storage';
import { api } from '../service/api';
import { refreshToken } from '../service/api/auth';

export function configureAxiosToken(accessToken: string, refresh: string) {
  api.interceptors.request.use(async function (config) {
    let validToken = accessToken;
    const tokenExpDate = secureLocalStorage.getItem('tokenExpDate');
    if (tokenExpDate) {
      const now = new Date();
      const expDate = new Date(JSON.parse(tokenExpDate as string));
      if (expDate < now) {
        secureLocalStorage.removeItem('tokenExpDate');
        try {
          console.log('Sending refresh token request');
          const data = await refreshToken(refresh);
          now.setHours(now.getHours() + 1);
          validToken = data.access_token;
          secureLocalStorage.setItem('token', validToken);
          secureLocalStorage.setItem('refreshToken', data.refresh_token);
          secureLocalStorage.setItem('tokenExpDate', JSON.stringify(now));
          config.headers.Authorization = `Bearer ${validToken}`;
        } catch (error) {
          secureLocalStorage.removeItem('refreshToken');
          secureLocalStorage.removeItem('token');
          secureLocalStorage.removeItem('user');
          return Promise.reject(error);
        }
      }
    }

    config.headers.Authorization = `Bearer ${validToken}`;
    return Promise.resolve(config);
  });
}
