export const routes = {
  login: '/entrar',
  signUp: {
    profile: '/cadastrar',
    address: '/cadastrar/endereco'
  },
  recoverPassword: '/recuperarsenha',
  dish: (id = ':id') => `dish/${id}`,
  home: '/'

  // TODO: Adicionar rotas da area logada
};

export const apiRoutes = {
  dishes: '/dishes',
  dish: {
    like: (id: string) => `/dishes/${id}/like`,
    dislike: (id: string) => `/dishes/${id}/dislike`,
    detail: (id: string) => `/dishes/${id}`
  },
  chef: {
    dishes: (id: string) => `chefs/${id}/dishes`
  },
  chefs: '/chefs',
  state: {
    cities: (state: string) => `/states/${state}/cities`
  }
};
