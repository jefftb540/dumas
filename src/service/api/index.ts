import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTUzMzAxNDQsImlhdCI6MTY5NTMyNjU0NCwianRpIjoiMzU4NjU0ZWI5MjlhMmE5ZjEwYWE5ODE3YzEzOTBhYWQiLCJzdWIiOiIzY2YxMzdiNy04ZGE5LTRhODgtYjU0YS1kMjRjZmExZTRlOTEiLCJ0eXBlIjoiYWNjZXNzIn0.aUPfCWTVTiACadBuJICJWwsUQYk5SARdJDIvKxrYezs'
  }
});
