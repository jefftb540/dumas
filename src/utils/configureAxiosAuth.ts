import secureLocalStorage from 'react-secure-storage';
import { api } from '../service/api';
import { refreshToken } from '../service/api/auth';

export function configureAxiosToken(accessToken: string, refresh: string) {
  api.interceptors.request.use(async function (config) {
    let validToken = accessToken;
    const tokenExpDate = secureLocalStorage.getItem('tokenExpDate');
    console.log(tokenExpDate);
    if (tokenExpDate) {
      const now = new Date();
      const expDate = new Date(JSON.parse(tokenExpDate as string));
      console.log({ expDate, now });
      if (expDate < now) {
        console.log('Sending refresh token request');
        secureLocalStorage.removeItem('tokenExpDate');
        const data = await refreshToken(refresh);
        console.log(data);
        if (data.response.status === 401) {
          secureLocalStorage.removeItem('refreshToken');
          secureLocalStorage.removeItem('token');
          secureLocalStorage.removeItem('user');
        }
        if (data.response.status === 200) {
          now.setHours(now.getHours() + 1);
          validToken = data.access_token;
          secureLocalStorage.setItem('token', validToken);
          secureLocalStorage.setItem('refreshToken', data.refresh_token);
          secureLocalStorage.setItem('tokenExpDate', JSON.stringify(now));
        }
      }
    }
    // else {
    //   secureLocalStorage.removeItem('refreshToken');
    //   secureLocalStorage.removeItem('token');
    //   secureLocalStorage.removeItem('user');
    // }
    config.headers.Authorization = `Bearer ${validToken}`;
    return config;
  });
}
