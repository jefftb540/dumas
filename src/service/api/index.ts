import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU0MzIwNjUsImlhdCI6MTY5NTQyODQ2NSwianRpIjoiZGVkZmE5MzY5NTczYjk0YTQ5MDhhNGViYzc5ZTM4NGUiLCJzdWIiOiIzY2YxMzdiNy04ZGE5LTRhODgtYjU0YS1kMjRjZmExZTRlOTEiLCJ0eXBlIjoiYWNjZXNzIn0._WvoBj4wKuT67Y77afW4ZzfksWSqwMfCbw274YEn_m4'
  }
});
