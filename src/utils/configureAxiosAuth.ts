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
      console.log(tokenExpDate);
      console.log(now);
      console.log(expDate);
      if (expDate < now) {
        secureLocalStorage.removeItem('tokenExpDate');
        const data = await refreshToken(refresh);
        console.log(data);
        now.setHours(now.getHours() + 1);
        validToken = data.access_token;
        secureLocalStorage.setItem('token', validToken);
        secureLocalStorage.setItem('refreshToken', data.refresh_token);
        secureLocalStorage.setItem('tokenExpDate', JSON.stringify(now));
      }
    }
    config.headers.Authorization = `Bearer ${validToken}`;
    return config;
  });
}
