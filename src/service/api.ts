import axios, { AxiosError } from 'axios';
import secureLocalStorage from 'react-secure-storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API
});

api.interceptors.response.use(
  resp => resp,
  async error => {
    const originalRequest = error.config;
    console.log('error', error);
    if (
      error.response.status === 401 &&
      error.request.headers.isRetry !== 'true'
    ) {
      const response = await api.post(
        '/sessions/refresh',
        {
          auth: { refresh_token: secureLocalStorage.getItem('refreshToken') }
        },
        {
          headers: {
            isRetry: 'true'
          }
        }
      );

      if (response.status === 200) {
        secureLocalStorage.setItem('token', response.data.access_token);
        secureLocalStorage.setItem('refreshToken', response.data.refresh_token);
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;

        return api(originalRequest);
      }

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
