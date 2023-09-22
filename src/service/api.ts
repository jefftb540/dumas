import axios from 'axios';
// import secureLocalStorage from 'react-secure-storage';
// import { configureAxiosToken } from '../utils/configureAxiosAuth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API
});

// api.interceptors.response.use(
//   resp => resp,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = secureLocalStorage.getItem('refreshToken');

//       if (!originalRequest.headers.Authorization) {
//         console.log('Não há authorization');
//         return Promise.reject(error);
//       }

//       if (!refreshToken) {
//         console.log('Não há refresh token');
//         api.interceptors.request.clear();
//         return Promise.reject(error);
//       }
//       console.log('Refresh token', refreshToken);
//       api.interceptors.request.clear();
//       const response = await api.post('/sessions/refresh', {
//         auth: { refresh_token: refreshToken }
//       });

//       if (response.status === 200) {
//         secureLocalStorage.setItem('token', response.data.access_token);
//         secureLocalStorage.setItem('refreshToken', response.data.refresh_token);
//         configureAxiosToken(response.data.access_token);

//         return api(originalRequest);
//       }

//       return Promise.reject(error);
//     }
//     api.interceptors.request.clear();
//     return Promise.reject(error);
//   }
// );

// import axios, { AxiosError } from 'axios';
// import secureLocalStorage from 'react-secure-storage';
// import { configureAxiosToken } from '../utils/configureAxiosAuth';

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL_API
// });

// api.interceptors.response.use(
//   resp => resp,
//   async (error: AxiosError) => {
//     const originalRequest = error.config;
//     console.log('error', error);
//     if (
//       error.response?.status === 401 &&
//       originalRequest?.headers.Authorization
//     ) {
//       delete originalRequest.headers.Authorization;
//       const refreshToken = secureLocalStorage.getItem('refreshToken');
//       if (!refreshToken) {
//         console.log('Não há refresh token');
//         api.interceptors.request.clear();
//         return Promise.reject(error);
//       }
//       console.log('Refresh token', refreshToken);
//       try {
//         const response = await api.post('/sessions/refresh', {
//           refresh_token: refreshToken
//         });

//         if (response.status === 200) {
//           console.log('salvando tokens novos');
//           console.log(response);
//           secureLocalStorage.setItem('token', response.data.access_token);
//           secureLocalStorage.setItem(
//             'refreshToken',
//             response.data.refresh_token
//           );
//           configureAxiosToken(response.data.access_token);

//           return api(originalRequest);
//         } else {
//           console.log('Limpando localstorage');
//           api.interceptors.request.clear();
//           secureLocalStorage.clear();
//         }
//       } catch (error) {
//         console.log('Limpando localstorage');
//         api.interceptors.request.clear();
//         secureLocalStorage.clear();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
