import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API
});

api.interceptors.response.use(
  resp => resp,
  async error => {
    if (error.response.status === 401) {
      const response = await axios.post('/sessions/refresh', {
        withCredentials: true
      });

      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;
      }

      return axios(error.config);
    }
  }
);
