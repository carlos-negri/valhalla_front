// src/mocks/caixa.ts
export const caixaMock = [
  {
    id: '1',
    tipo: 'entrada',
    descricao: 'Pagamento cliente A',
    valor: 120,
    data: new Date().toISOString(),
  },
  {
    id: '2',
    tipo: 'saida',
    descricao: 'Compra materiais',
    valor: 30,
    data: new Date().toISOString(),
  },
];
