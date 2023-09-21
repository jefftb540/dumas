export const routes = {
  login: '/entrar',
  signUp: {
    profile: '/cadastrar',
    address: '/cadastrar/endereco'
  },
  recoverPassword: '/recuperarsenha',

  home: '/'

  // TODO: Adicionar rotas da area logada
};

export const apiRoutes = {
  dishes: '/dishes',
  dish: {
    like: (id: string) => `/dishes/${id}/like`,
    dislike: (id: string) => `/dishes/${id}/dislike`
  },
  chef: {
    dishes: (id: string) => `chefs/${id}/dishes`
  }
};
