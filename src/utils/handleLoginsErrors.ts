import { AxiosError } from 'axios';

export const handleLoginErrors = (e: AxiosError) => {
  if (e.response?.status === 401) {
    return 'O nome de usuário ou a senha fornecidos estão incorretos.';
  }

  return 'Erro desconhecido';
};
