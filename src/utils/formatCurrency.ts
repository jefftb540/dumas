export const formatCurrency = (n: number) =>
  n.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
