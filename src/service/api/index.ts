import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU0NjYxMjcsImlhdCI6MTY5NTQ2MjUyNywianRpIjoiZDRiMWEzYjg2ODdkZjBjMDQ4NGQxZTU5Mjc5MDczMWMiLCJzdWIiOiIzY2YxMzdiNy04ZGE5LTRhODgtYjU0YS1kMjRjZmExZTRlOTEiLCJ0eXBlIjoiYWNjZXNzIn0.YLzx-QuRwXeN2BhwsBf5LE5Qq8tO6J7hkatGXAocgWk'
  }
});
