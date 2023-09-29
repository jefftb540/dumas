export const routes = {
  login: '/entrar',
  signUp: {
    profile: '/cadastrar',
    address: '/cadastrar/endereco'
  },

  profile: '/perfil',
  recoverPassword: '/recuperarsenha',
  dish: (id = ':id') => `dish/${id}`,
  home: '/',
  cart: '/carrinho',
  checkout: '/carrinho/checkout'

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
    states: '/states',
    cities: (state: string) => `/states/${state}/cities`
  }
};
